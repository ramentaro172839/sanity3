import Image from 'next/image'
import Link from 'next/link'
import { getPosts, getCategories } from '@/lib/sanity'
import { Post, Category, Tag } from '@/types'

export default async function BlogPage() {
  try {
    const [posts, categories] = await Promise.all([
      getPosts(),
      getCategories()
    ])

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            ブログ
          </h1>
          <p className="text-xl text-gray-600">
            らーめん太郎の創作活動や日々の出来事をお届けします
          </p>
        </div>

        {/* 検索ボックス */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="記事を検索..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* カテゴリーフィルター */}
        {categories && categories.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors"
              >
                すべて
              </Link>
              {categories.map((category: Category) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug.current}`}
                  className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 記事一覧 */}
        {posts && posts.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              まだ記事が投稿されていません。
            </p>
          </div>
        )}
      </div>
    )
  } catch {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">ブログ</h1>
          <p className="text-gray-600">記事の読み込み中にエラーが発生しました。</p>
        </div>
      </div>
    )
  }
}