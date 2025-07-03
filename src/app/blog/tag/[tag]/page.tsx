import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByTag, getTags, urlFor } from '@/lib/sanity'
import { Post, Category, Tag } from '@/types'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export default async function TagPage({ params }: TagPageProps) {
  try {
    const { tag } = await params
    const [posts, tags] = await Promise.all([
      getPostsByTag(tag),
      getTags()
    ])

    const currentTag = tags?.find(
      (t: Tag) => t.slug.current === tag
    )

    if (!currentTag) {
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
            <li className="text-gray-700">タグ: #{currentTag.title}</li>
          </ol>
        </nav>

        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            #{currentTag.title}
          </h1>
          {currentTag.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {currentTag.description}
            </p>
          )}
        </div>

        {/* タグ一覧 */}
        {tags && tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">その他のタグ</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {tags.map((t: Tag) => (
                <Link
                  key={t._id}
                  href={`/blog/tag/${t.slug.current}`}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    t.slug.current === currentTag.slug.current
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  #{t.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 記事一覧 */}
        {posts && posts.length > 0 ? (
          <>
            <div className="mb-6 text-gray-600 text-center">
              {posts.length}件の記事が見つかりました
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: Post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  {post.mainImage && (
                    <div className="relative h-48">
                      <Image
                        src={urlFor(post.mainImage).width(800).height(400).url()}
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
                        <Link
                          key={category._id}
                          href={`/blog/category/${category.slug.current}`}
                          className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded mr-2 hover:bg-orange-200 transition-colors"
                        >
                          {category.title}
                        </Link>
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
                        {post.tags.map((postTag: Tag) => (
                          <Link
                            key={postTag._id}
                            href={`/blog/tag/${postTag.slug.current}`}
                            className={`text-xs px-2 py-1 rounded transition-colors ${
                              postTag.slug.current === currentTag.slug.current
                                ? 'bg-orange-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            #{postTag.title}
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
              このタグの記事はまだありません。
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
    const tags = await getTags()
    return tags.map((tag: Tag) => ({
      tag: tag.slug.current,
    }))
  } catch {
    return []
  }
}