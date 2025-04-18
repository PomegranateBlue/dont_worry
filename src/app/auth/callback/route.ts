// 'use client';
import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/app/utils/supabase/server';

export async function GET(request: Request) {
  console.log('request', request);
  const { searchParams, origin } = new URL(request.url);
  //searchParams가 없다 url에 있는거 가져와서 넣어줘야한다.
  // const searchParams = useSearchParams();
  console.log('searchParams', searchParams); // {}
  const code = searchParams.get('code');
  console.log('code', code); // null
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';
  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log('로그인에러', error);
    // if (error) {
    //   console.error('❌ exchangeCodeForSession 실패:', error);
    //   return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    // }
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  // return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
