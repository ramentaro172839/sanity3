export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* ページヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            プロフィール
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* プロフィール画像とキャッチフレーズ */}
          <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center border-4 border-white">
                  <span className="text-4xl">🎨</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">らーめん太郎</h2>
                <p className="text-xl opacity-90">
                  HamCupコミュニティを中心に活動する、イラストと音声配信が大好きなクリエイター
                </p>
              </div>
            </div>
          </div>

          {/* 詳細プロフィール */}
          <div className="p-8">
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

            {/* 活動内容 */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                主な活動
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">🎨 イラスト制作</h4>
                  <p className="text-gray-600 text-sm">
                    HamCupコミュニティで様々なイラスト作品を制作しています
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">🎙️ 音声配信</h4>
                  <p className="text-gray-600 text-sm">
                    楽しい音声配信で皆さんとコミュニケーションを取っています
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">👥 コミュニティ活動</h4>
                  <p className="text-gray-600 text-sm">
                    HamCupコミュニティでの交流や創作活動を行っています
                  </p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">🍞 パン愛好</h4>
                  <p className="text-gray-600 text-sm">
                    名前に反してパンが大好物です（らーめんも好きです！）
                  </p>
                </div>
              </div>
            </div>

            {/* SNS・コミュニティリンク */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                SNS・コミュニティ
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  HamCupコミュニティ
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  音声配信
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}