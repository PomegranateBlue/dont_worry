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
    .eq('send_at', today) // 오늘 발송 예정인 편지만
    .eq('isSent', false); // 아직 발송되지 않은 편지만

  if (error) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // 📩 편지 하나씩 순회하며 메일 발송
  for (const letter of letters) {
    try {
      // 📧 해당 편지 작성자의 이메일 조회
      const { data, error } = await supabase
        .from('users') // 사용자 이메일 정보가 있는 테이블 (예: 'users')
        .select('email')
        .eq('id', letter.user_id)
        .single();

      if (error || !data?.email) continue;

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
