import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

//resend 인스턴스 초기화
const resend = new Resend(process.env.RESEND_API_KEY);

//supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
//오늘 날짜 기준으로 발송할 편지 조회
export async function GET() {
  const today = new Date().toISOString().split('T')[0];

  const { data: letters, error } = await supabase
    .from('letter')
    .select('*')
    .gte('send_at', `${today}T00:00:00.000Z`) // 오늘 00시 00분
    .lt('send_at', `${today}T23:59:59.999Z`) // 오늘 23시 59분
    .eq('isSent', false);

  if (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  // 📩 편지 하나씩 순회하며 메일 발송
  for (const letter of letters) {
    try {
      // 📆 날짜 비교 로그 추가
      const letterDate = new Date(letter.send_at).toISOString().split('T')[0];
      console.log('📅 편지 날짜:', letterDate, 'vs 오늘 날짜:', today); // 로그 추가

      // 📧 해당 편지 작성자의 이메일 조회
      const { data, error } = await supabase
        .from('users') // 사용자 이메일 정보가 있는 테이블 (예: 'users')
        .select('email')
        .eq('user_id', letter.user_id)
        .single();

      if (error) {
        console.error('User email fetch error:', error);
        continue; // 이메일이 없으면 다음으로 넘어감
      }

      // 💌 Resend로 이메일 발송
      await resend.emails.send({
        from: 'team@dontworry.io.kr', // Resend에서 인증한 발신자 주소
        to: data.email,
        subject: '💌 미래의 나에게 온 편지',
        html: `
          <h2>미래의 나에게 보내는 편지</h2>
          <p>${letter.content}</p>
          ${
            letter.img_url
              ? `<img src="${letter.img_url}" alt="편지 이미지" width="300"/>`
              : ''
          }
          <p style="font-size: 12px; color: gray;">dontworry 서비스에서 발송됨</p>
        `
      });

      // ✅ 편지 발송 후 isSent=true로 업데이트
      await supabase
        .from('letter')
        .update({ isSent: true })
        .eq('letter_id', letter.letter_id);
    } catch (e) {
      console.error('Email send error:', e);
    }
  }

  // 🟢 모든 작업 완료 응답
  return NextResponse.json({ message: 'Emails sent if conditions met' });
}
// app/api/run-command/route.ts
// import { NextResponse } from 'next/server';
// import { exec } from 'child_process';
// import util from 'util';
// const execPromise = util.promisify(exec);
// export async function GET() {
//   try {
//     const { stdout, stderr } = await execPromise('crontab -l');
//     return NextResponse.json({ stdout, stderr });
//   } catch (error) {
//     return NextResponse.json({ error: String(error) }, { status: 500 });
//   }
// }

// import { NextRequest,NextResponse } from 'next/server';

// export const GET = async (req: NextRequest) => {
//   console.log('Cron jobs ran at:', new Date());

//   return new NextResponse('cron ran ', { status: 200 });
// };
