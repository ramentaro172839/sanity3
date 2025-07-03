import Link from 'next/link'
import Image from 'next/image'
import { getPosts, urlFor } from '@/lib/sanity'
import { Post } from '@/types'

// ヒーローセクション
function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              らーめん太郎
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              HamCupコミュニティを中心に活動する、イラストと音声配信が大好きなクリエイター
            </p>
            <Link 
              href="/gallery" 
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              作品を見る
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-6xl">🎨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 自己紹介セクション
function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            らーめん太郎について
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-gray-700 leading-relaxed text-lg space-y-4">
              <p>
                らーめん太郎は、HamCupのコミュニティーを中心に活動しています。
              </p>
              <p>
                コミュニティーでは、楽しくイラストを描いたり、音声配信をしたりと、日々創作活動を行っています。
              </p>
              <p>
                名前は「らーめん太郎」ですが、実はパンが大好物です。
                （もちろん、らーめんも大好きです！）
              </p>
              <p>
                このサイトでは、僕がこれまでに描いてきたたくさんの作品をご紹介しています。
                僕のユニークで楽しい世界観をぜひお楽しみください！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 作品ギャラリーセクション
function GallerySection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          作品ギャラリー
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          僕がこれまでに描いてきた作品の数々を年代別にご覧いただけます。<br />
          らーめん太郎の世界をどうぞお楽しみください。
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* プレースホルダー作品カード */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  作品 #{item}
                </h3>
                <p className="text-gray-600 mb-4">
                  素敵なイラスト作品です。HamCupコミュニティで制作しました。
                </p>
                <span className="text-sm text-orange-600 font-medium">
                  2024年
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/gallery" 
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            すべての作品を見る
          </Link>
        </div>
      </div>
    </section>
  )
}

// 活動紹介セクション
function ActivitiesSection() {
  const activities = [
    {
      title: "イラスト制作",
      description: "HamCupコミュニティで様々なイラスト作品を制作しています",
      icon: "🎨"
    },
    {
      title: "音声配信",
      description: "楽しい音声配信で皆さんとコミュニケーションを取っています",
      icon: "🎙️"
    },
    {
      title: "コミュニティ活動",
      description: "HamCupコミュニティでの交流や創作活動を行っています",
      icon: "👥"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          活動内容
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-6xl mb-4">{activity.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">{activity.title}</h3>
              <p className="text-gray-600 leading-relaxed">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// コミュニティ・SNSセクション
function CommunitySection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
          コミュニティ・SNS
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          HamCupコミュニティでの活動や、SNSでの発信もチェックしてみてください！
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            HamCupコミュニティ
          </a>
          <a
            href="#"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Twitter
          </a>
          <a
            href="#"
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            音声配信
          </a>
        </div>
      </div>
    </section>
  )
}

// 最新ブログ記事セクション
async function LatestBlogSection() {
  try {
    const posts = await getPosts()
    const latestPosts = posts.slice(0, 3) // 最新3件を取得

    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            最新のブログ記事
          </h2>
          
          {latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post: Post) => (
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
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      <Link 
                        href={`/blog/${post.slug.current}`} 
                        className="hover:text-orange-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
                      </time>
                      {post.author && (
                        <span>by {post.author.name}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                まだブログ記事がありません。
              </p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              すべての記事を見る
            </Link>
          </div>
        </div>
      </section>
    )
  } catch {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            最新のブログ記事
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              記事の読み込み中にエラーが発生しました。
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ActivitiesSection />
      <LatestBlogSection />
      <CommunitySection />
    </div>
  )
}