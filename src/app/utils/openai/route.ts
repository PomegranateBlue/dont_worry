import { NextResponse } from 'next/server';
import OpenAI from 'openai';
const openai = new OpenAI();

export async function POST(req: Request) {
  const body = await req.json();
  //JSON.stringify(body)로 입력 보내기
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content:
          '너는 사용자가 선택한 주제와 감정, 그리고 작성한 내용을 바탕으로 사용자의 고민을 들어주고 해결방안의 실마리를 제공할 수 있도록 해줘'
      },
      {
        role: 'user',
        content: body.content
      }
    ]
  });
  // console.log(completion.choices[0].message);
  return NextResponse.json({ content: completion.choices[0].message.content });
}
