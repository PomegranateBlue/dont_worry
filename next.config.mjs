/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pzyuqsztorznxejhknhd.supabase.co',
      'k.kakaocdn.net',
      'lh3.googleusercontent.com'
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
  }
};

export default nextConfig;
