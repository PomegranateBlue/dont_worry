import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dontworry.io.kr',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://dontworry.io.kr/note',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: 'https://dontworry.io.kr/notebox',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: 'https://dontworry.io.kr/ranking',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://dontworry.io.kr/mypage',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
    {
      url: 'https://dontworry.io.kr/letter',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    }
  ];
}
