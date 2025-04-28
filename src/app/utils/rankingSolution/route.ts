import { AIError } from '@/constants/error/aiErrorKeys';
import { RANKING_PROPMT } from '@/constants/ranking/line';

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
export type MessageContent = { type: 'text'; text: string };

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY
});

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const { keywords } = await req.json();

  const systemPrompt = RANKING_PROPMT;

  try {
    const userMessageContent: MessageContent[] = [
      { type: 'text', text: keywords }
    ];

    const messages: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userMessageContent
      }
    ];

    const res = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: messages
    });

    return NextResponse.json(res.choices[0].message.content);
  } catch (error) {
    console.log('open ai에러 발생=>', error);
    throw new AIError('GPT_GENERATION_FAIL');
  }
};
