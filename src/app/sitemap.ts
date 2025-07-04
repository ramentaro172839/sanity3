import { MetadataRoute } from 'next'
import { getPosts, getCategories, getTags } from '@/lib/sanity'
import { Post, Category, Tag } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [posts, categories, tags] = await Promise.all([
      getPosts(),
      getCategories(),
      getTags()
    ])

    // 静的ページ
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${SITE_URL}/gallery`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${SITE_URL}/profile`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      },
    ]

    // ブログ記事ページ
    const postPages: MetadataRoute.Sitemap = posts.map((post: Post) => ({
      url: `${SITE_URL}/blog/${post.slug.current}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // カテゴリーページ
    const categoryPages: MetadataRoute.Sitemap = categories.map((category: Category) => ({
      url: `${SITE_URL}/blog/category/${category.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // タグページ
    const tagPages: MetadataRoute.Sitemap = tags.map((tag: Tag) => ({
      url: `${SITE_URL}/blog/tag/${tag.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...postPages, ...categoryPages, ...tagPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // エラー時は最低限の静的ページを返す
    return [
      {
        url: SITE_URL,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
      {
        url: `${SITE_URL}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]
  }
}