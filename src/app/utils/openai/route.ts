import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { COMMENT_PROMPT } from '@/constants/openai/commentConfig';
import { AIError } from '@/constants/error/aiErrorKeys';

const openai = new OpenAI();
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    //JSON.stringify(body)로 입력 보내기
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: COMMENT_PROMPT
        },
        {
          role: 'user',
          content: body.content
        }
      ]
    });
    return NextResponse.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.log(error);
    throw new AIError('GPT_GENERATION_FAIL');
  }
};

//route 사용함수는 사용하는 곳에서 정의한 뒤 사용하기기
