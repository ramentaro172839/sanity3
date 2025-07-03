import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPost, getPosts, urlFor } from '@/lib/sanity'
import { Post, Category, Tag } from '@/types'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// 目次生成用の関数（簡易版）
function generateTableOfContents(body: unknown[]) {
  if (!body) return []
  
  const headings = body.filter((block): block is { _type: string; style: string; children?: { text: string }[] } => {
    if (!block || typeof block !== 'object') return false
    const blockObj = block as { _type?: string; style?: string }
    return Boolean(
      blockObj._type === 'block' && 
      blockObj.style &&
      ['h1', 'h2', 'h3', 'h4'].includes(blockObj.style)
    )
  })
  
  return headings.map((heading, index) => ({
    id: `heading-${index}`,
    level: parseInt(heading.style.substring(1)),
    text: heading.children?.map((child: { text: string }) => child.text).join('') || ''
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const { slug } = await params
    const post = await getPost(slug)
    
    if (!post) {
      notFound()
    }

    const tableOfContents = generateTableOfContents(post.body || [])

    return (
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* パンくずナビ */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-orange-600">ホーム</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-orange-600">ブログ</Link></li>
              <li>/</li>
              <li className="text-gray-700 truncate">{post.title}</li>
            </ol>
          </nav>

          {/* 記事ヘッダー */}
          <header className="mb-8">
            <div className="mb-4">
              {post.categories?.map((category: Category) => (
                <Link
                  key={category._id}
                  href={`/blog/category/${category.slug.current}`}
                  className="inline-block bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded mr-2 hover:bg-orange-200 transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
              <time dateTime={post.publishedAt}>
                公開: {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </time>
              {post.author && (
                <span>by {post.author.name}</span>
              )}
            </div>

            {post.mainImage && (
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={urlFor(post.mainImage).width(800).height(400).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-orange-500">
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* 目次 */}
            {tableOfContents.length > 0 && (
              <aside className="lg:col-span-1 mb-8 lg:mb-0">
                <div className="sticky top-24">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">目次</h3>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block text-sm text-gray-600 hover:text-orange-600 transition-colors ${
                          item.level === 2 ? 'pl-0' :
                          item.level === 3 ? 'pl-4' :
                          item.level === 4 ? 'pl-8' : 'pl-0'
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* 記事本文 */}
            <div className={tableOfContents.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}>
              <div className="prose prose-lg max-w-none">
                {post.body ? (
                  <div className="text-gray-700 leading-relaxed">
                    {/* 簡易的なリッチテキスト表示 */}
                    {post.body.map((block: { _type: string; style?: string; children?: { text: string }[] }, index: number) => {
                      if (block._type === 'block') {
                        const style = block.style || 'normal'
                        const text = block.children?.map((child: { text: string }) => child.text).join('') || ''
                        
                        switch (style) {
                          case 'h1':
                            return <h1 key={index} id={`heading-${index}`} className="text-3xl font-bold mt-8 mb-4">{text}</h1>
                          case 'h2':
                            return <h2 key={index} id={`heading-${index}`} className="text-2xl font-bold mt-6 mb-3">{text}</h2>
                          case 'h3':
                            return <h3 key={index} id={`heading-${index}`} className="text-xl font-bold mt-4 mb-2">{text}</h3>
                          case 'h4':
                            return <h4 key={index} id={`heading-${index}`} className="text-lg font-bold mt-3 mb-2">{text}</h4>
                          case 'blockquote':
                            return <blockquote key={index} className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">{text}</blockquote>
                          default:
                            return <p key={index} className="mb-4">{text}</p>
                        }
                      }
                      return null
                    })}
                  </div>
                ) : (
                  <p className="text-gray-600">記事の内容がありません。</p>
                )}
              </div>

              {/* タグ */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: Tag) => (
                      <Link
                        key={tag._id}
                        href={`/blog/tag/${tag.slug.current}`}
                        className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
                      >
                        #{tag.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* シェアボタン */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">この記事をシェア</h3>
                <div className="flex gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/blog/${post.slug.current}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    𝕏でシェア
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 関連記事 */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">関連記事</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* プレースホルダー - 実際は関連記事のロジックを実装 */}
              <div className="bg-gray-100 rounded-lg p-6 text-center">
                <p className="text-gray-600">関連記事がここに表示されます</p>
              </div>
            </div>
          </section>
        </div>
      </article>
    )
  } catch {
    notFound()
  }
}

// 静的生成用
export async function generateStaticParams() {
  try {
    const posts = await getPosts()
    return posts.map((post: Post) => ({
      slug: post.slug.current,
    }))
  } catch {
    return []
  }
}