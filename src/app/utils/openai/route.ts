import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { COMMENT_PROMPT } from '@/constants/openai/commentConfig';
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
    // console.log(completion.choices[0].message);
    return NextResponse.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API 호출 에러', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
};

//route 사용함수는 사용하는 곳에서 정의한 뒤 사용하기기
