export default function GalleryPage() {
  // 年代別作品データ（プレースホルダー）
  const artworksByYear = {
    "2024": [
      { id: 1, title: "春の風景", description: "HamCupコミュニティで制作した春をテーマにした作品" },
      { id: 2, title: "キャラクターデザイン", description: "オリジナルキャラクターのイラスト" },
      { id: 3, title: "音声配信用アイコン", description: "音声配信で使用するアイコンイラスト" },
      { id: 4, title: "コミュニティロゴ", description: "HamCupコミュニティ用のロゴデザイン" },
    ],
    "2023": [
      { id: 5, title: "夏祭りイラスト", description: "夏をテーマにした楽しいイラスト作品" },
      { id: 6, title: "ファンアート", description: "好きなキャラクターのファンアート" },
      { id: 7, title: "風景画", description: "美しい自然風景を描いた作品" },
    ],
    "2022": [
      { id: 8, title: "初期作品集", description: "創作活動を始めた頃の記念すべき作品たち" },
      { id: 9, title: "練習イラスト", description: "技術向上のために描いた練習作品" },
    ]
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ページヘッダー */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          作品ギャラリー
        </h1>
        <p className="text-xl text-gray-600">
          僕がこれまでに描いてきた作品の数々を年代別にご覧いただけます。<br />
          らーめん太郎の世界をどうぞお楽しみください。
        </p>
      </div>

      {/* 年代別作品表示 */}
      {Object.entries(artworksByYear).map(([year, artworks]) => (
        <section key={year} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-orange-500 pb-2">
            {year}年の作品
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {/* プレースホルダー画像 */}
                <div className="h-48 bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                  <span className="text-4xl">🎨</span>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {artwork.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {artwork.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-600 font-medium">
                      {year}年
                    </span>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">
                      詳細を見る
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* コミュニティへの誘導 */}
      <div className="bg-orange-50 rounded-lg p-8 text-center mt-16">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          一緒に創作活動しませんか？
        </h3>
        <p className="text-gray-600 mb-6">
          HamCupコミュニティでは、楽しく創作活動を行っています。<br />
          イラストを描いたり、音声配信をしたり、皆で楽しい時間を過ごしましょう！
        </p>
        <a
          href="#"
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          HamCupコミュニティに参加
        </a>
      </div>
    </div>
  )
}