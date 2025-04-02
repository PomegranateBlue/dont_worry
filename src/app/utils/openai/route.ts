import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function POST(req: Request) {
  const formData = await req.formData();
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: formData.get('content') as string
      }
    ]
  });
  console.log(completion.choices[0].message);
  return NextResponse.json(completion.choices[0].message);
}
