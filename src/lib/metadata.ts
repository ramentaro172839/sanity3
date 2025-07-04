import { Metadata } from 'next'
import { Post, Category, Tag } from '@/types'

const SITE_NAME = 'らーめん太郎 | 公式サイト兼ブログ'
const SITE_DESCRIPTION = 'HamCupコミュニティを中心に活動するイラストレーター兼音声配信者、らーめん太郎の公式サイト。デジタルアート、キャラクターデザイン、音声配信の魅力をお届けします。'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const TWITTER_HANDLE = '@ramen_taro'

export function generateSiteMetadata(): Metadata {
  return {
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`
    },
    description: SITE_DESCRIPTION,
    keywords: [
      'らーめん太郎',
      'HamCup',
      'コミュニティ',
      'イラスト',
      'デジタルアート',
      'キャラクターデザイン',
      '音声配信',
      'クリエイター',
      'ブログ'
    ],
    authors: [{ name: 'らーめん太郎' }],
    creator: 'らーめん太郎',
    publisher: 'らーめん太郎',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}

export function generatePostMetadata(post: Post): Metadata {
  const title = post.title
  const description = post.excerpt || `${post.title}についてのブログ記事です。らーめん太郎の創作活動や日々の出来事をお届けします。`
  const url = `${SITE_URL}/blog/${post.slug.current}`
  const imageUrl = post.mainImage 
    ? `${SITE_URL}/api/og?title=${encodeURIComponent(title)}&image=${encodeURIComponent(post.mainImage.asset._ref)}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`

  const keywords = [
    'らーめん太郎',
    'ブログ',
    ...(post.categories?.map(cat => cat.title) || []),
    ...(post.tags?.map(tag => tag.title) || [])
  ]

  return {
    title,
    description,
    keywords,
    authors: [{ name: post.author?.name || 'らーめん太郎' }],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'article',
      locale: 'ja_JP',
      url,
      title,
      description,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      authors: [post.author?.name || 'らーめん太郎'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateCategoryMetadata(category: Category, postCount: number): Metadata {
  const title = `${category.title}の記事一覧`
  const description = category.description || `${category.title}に関する記事一覧です。らーめん太郎の${category.title}についてのブログ記事を${postCount}件掲載しています。`
  const url = `${SITE_URL}/blog/category/${category.slug.current}`

  return {
    title,
    description,
    keywords: ['らーめん太郎', 'ブログ', 'カテゴリー', category.title],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(title)}`],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateTagMetadata(tag: Tag, postCount: number): Metadata {
  const title = `#${tag.title}の記事一覧`
  const description = tag.description || `#${tag.title}タグの記事一覧です。らーめん太郎の${tag.title}に関するブログ記事を${postCount}件掲載しています。`
  const url = `${SITE_URL}/blog/tag/${tag.slug.current}`

  return {
    title,
    description,
    keywords: ['らーめん太郎', 'ブログ', 'タグ', tag.title],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'ja_JP',
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      title,
      description,
      images: [`${SITE_URL}/api/og?title=${encodeURIComponent(title)}`],
    },
    alternates: {
      canonical: url,
    },
  }
}