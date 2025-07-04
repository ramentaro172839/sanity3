import { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/blog',
          '/blog/*',
          '/gallery',
          '/profile',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Google-Extended',
        allow: [
          '/',
          '/blog',
          '/blog/*',
          '/gallery',
          '/profile',
        ],
      },
      {
        userAgent: 'CCBot',
        allow: [
          '/',
          '/blog',
          '/blog/*',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}