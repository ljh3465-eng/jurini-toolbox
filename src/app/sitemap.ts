// src/app/sitemap.ts

import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jurinitools.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // 나중에 '주린이 가이드' 글들이 별도의 페이지로 만들어지면,
    // 여기에 각 글의 주소를 추가할 수 있습니다.
    // 예: { url: 'https://jurinitools.com/guide/warren-buffet', ... }
  ]
}
