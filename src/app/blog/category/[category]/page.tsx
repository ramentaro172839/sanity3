import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByCategory, getCategories } from '@/lib/sanity'
import { Category, Post, Tag } from '@/types'

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const { category } = await params
    const [posts, categories] = await Promise.all([
      getPostsByCategory(category),
      getCategories()
    ])

    const currentCategory = categories?.find(
      (cat: Category) => cat.slug.current === category
    )

    if (!currentCategory) {
      notFound()
    }

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* パンくずナビ */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link href="/" className="hover:text-orange-600">ホーム</Link></li>
            <li>/</li>
            <li><Link href="/blog" className="hover:text-orange-600">ブログ</Link></li>
            <li>/</li>
            <li className="text-gray-700">カテゴリー: {currentCategory.title}</li>
          </ol>
        </nav>

        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {currentCategory.title}
          </h1>
          {currentCategory.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentCategory.description}
            </p>
          )}
        </div>

        {/* カテゴリーフィルター */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              すべて
            </Link>
            {categories?.map((cat: Category) => (
              <Link
                key={cat._id}
                href={`/blog/category/${cat.slug.current}`}
                className={`px-4 py-2 rounded-full transition-colors ${
                  cat.slug.current === currentCategory.slug.current
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.title}
              </Link>
            ))}
          </div>
        </div>

        {/* 記事一覧 */}
        {posts && posts.length > 0 ? (
          <>
            <div className="mb-6 text-gray-600">
              {posts.length}件の記事が見つかりました
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {post.mainImage && (
                    <div className="relative h-48">
                      <Image
                        src={post.mainImage.asset._ref}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {/* カテゴリータグ */}
                    <div className="flex items-center mb-2">
                      {post.categories?.map((category: Category) => (
                        <span
                          key={category._id}
                          className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded mr-2"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>

                    {/* タイトル */}
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">
                      <Link 
                        href={`/blog/${post.slug.current}`} 
                        className="hover:text-orange-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* 抜粋 */}
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* メタ情報 */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                      {post.author && (
                        <span>by {post.author.name}</span>
                      )}
                    </div>

                    {/* タグ */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag: Tag) => (
                          <Link
                            key={tag._id}
                            href={`/blog/tag/${tag.slug.current}`}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            #{tag.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              このカテゴリーの記事はまだありません。
            </p>
            <Link 
              href="/blog"
              className="inline-block mt-4 text-orange-600 hover:text-orange-700 font-medium"
            >
              すべての記事を見る →
            </Link>
          </div>
        )}
      </div>
    )
  } catch {
    notFound()
  }
}

// 静的生成用
export async function generateStaticParams() {
  try {
    const categories = await getCategories()
    return categories.map((category: Category) => ({
      category: category.slug.current,
    }))
  } catch {
    return []
  }
}