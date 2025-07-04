import { Post } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'らーめん太郎 | 公式サイト兼ブログ',
    description: 'HamCupコミュニティを中心に活動するイラストレーター兼音声配信者、らーめん太郎の公式サイト',
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: 'らーめん太郎',
      description: 'HamCupコミュニティで活動するイラストレーター兼音声配信者',
      url: SITE_URL,
      sameAs: [
        // SNSリンクがあれば追加
      ]
    },
    publisher: {
      '@type': 'Person',
      name: 'らーめん太郎'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?search={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generatePersonStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'らーめん太郎',
    description: 'HamCupコミュニティを中心に活動するイラストレーター兼音声配信者。デジタルアート、キャラクターデザイン、音声配信で多くのファンと交流している。',
    url: SITE_URL,
    jobTitle: 'イラストレーター・音声配信者',
    worksFor: {
      '@type': 'Organization',
      name: 'HamCupコミュニティ'
    },
    knowsAbout: [
      'デジタルアート',
      'キャラクターデザイン',
      '音声配信',
      'イラスト制作',
      'コミュニティ運営'
    ],
    sameAs: [
      // SNSリンクがあれば追加
    ]
  }
}

export function generateBlogStructuredData(posts: Post[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'らーめん太郎ブログ',
    description: 'らーめん太郎の創作活動や日々の出来事をお届けするブログ',
    url: `${SITE_URL}/blog`,
    author: {
      '@type': 'Person',
      name: 'らーめん太郎'
    },
    publisher: {
      '@type': 'Person',
      name: 'らーめん太郎'
    },
    blogPost: posts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug.current}`,
      datePublished: post.publishedAt,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'らーめん太郎'
      }
    }))
  }
}

export function generateArticleStructuredData(post: Post) {
  const imageUrl = post.mainImage?.asset._ref
    ? `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&image=${encodeURIComponent(post.mainImage.asset._ref)}`
    : `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    url: `${SITE_URL}/blog/${post.slug.current}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'らーめん太郎',
      description: 'HamCupコミュニティで活動するイラストレーター兼音声配信者'
    },
    publisher: {
      '@type': 'Person',
      name: post.author?.name || 'らーめん太郎'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug.current}`
    },
    articleSection: post.categories?.map(cat => cat.title).join(', '),
    keywords: [
      ...(post.categories?.map(cat => cat.title) || []),
      ...(post.tags?.map(tag => tag.title) || [])
    ].join(', '),
    about: post.categories?.map(cat => ({
      '@type': 'Thing',
      name: cat.title,
      description: cat.description
    }))
  }
}

export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateCollectionPageStructuredData(
  title: string,
  description: string,
  url: string,
  posts: Post[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug.current}`,
        name: post.title,
        description: post.excerpt
      }))
    }
  }
}