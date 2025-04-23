import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/note/', '/letter/', '/ranking/', '/mypage/', '/notebox/'], //여기있는것들은 크롤링 허용
      disallow: ['/auth/', '/api/', '/error/'] //여기있는것들은 크롤링 허용 x
    },
    sitemap: 'https://dontworry.io.kr/sitemap.xml',
    host: 'https://dontworry.io.kr/'
  };
}
