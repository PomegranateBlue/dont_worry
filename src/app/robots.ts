import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/note/',
          '/letter/',
          '/ranking/',
          '/mypage/',
          '/notebox/'
        ],
        disallow: ['/auth/', '/api/', '/error/']
      }
    ],
    sitemap: 'https://dontworry.io.kr/sitemap.xml',
    host: 'https://dontworry.io.kr/'
  };
}
