import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* ロゴ/サイトタイトル */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">らーめん太郎</span>
          </Link>

          {/* ナビゲーションメニュー */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">
              ホーム
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-orange-600 transition-colors">
              ブログ
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-orange-600 transition-colors">
              作品ギャラリー
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-orange-600 transition-colors">
              プロフィール
            </Link>
          </nav>

          {/* 検索アイコン */}
          <button className="p-2 text-gray-700 hover:text-orange-600 transition-colors">
            <Search size={20} />
          </button>

          {/* モバイルメニューボタン */}
          <button className="md:hidden p-2 text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}