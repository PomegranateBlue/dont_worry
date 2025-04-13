import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

type EmailOptions = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = async ({
  to,
  subject,
  html
}: EmailOptions): Promise<void> => {
  const { error } = await resend.emails.send({
    from: 'Dont Worry <onboarding@resend.dev>',
    to,
    subject,
    html
  });

  if (error) {
    console.error('이메일 전송 실패:', error);
  }
};

export default sendEmail;
