import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'らーめん太郎'
    const category = searchParams.get('category')
    const author = searchParams.get('author') || 'らーめん太郎'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
            backgroundImage: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
            fontSize: 32,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '20px',
              padding: '60px',
              margin: '40px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              maxWidth: '90%',
              textAlign: 'center' as const,
            }}
          >
            {/* アイコン */}
            <div
              style={{
                fontSize: '80px',
                marginBottom: '20px',
              }}
            >
              🎨
            </div>
            
            {/* タイトル */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '20px',
                lineHeight: 1.2,
                maxWidth: '800px',
              }}
            >
              {title}
            </div>
            
            {/* カテゴリー */}
            {category && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#ff6b35',
                  backgroundColor: '#fff5f3',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  marginBottom: '20px',
                }}
              >
                {category}
              </div>
            )}
            
            {/* 著者情報 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '20px',
                color: '#666',
              }}
            >
              <div style={{ marginRight: '10px' }}>by</div>
              <div style={{ fontWeight: 'bold', color: '#ff6b35' }}>
                {author}
              </div>
            </div>
            
            {/* サイト名 */}
            <div
              style={{
                fontSize: '18px',
                color: '#888',
                marginTop: '20px',
              }}
            >
              らーめん太郎 | 公式サイト兼ブログ
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    console.log(`Failed to generate the image: ${e instanceof Error ? e.message : 'Unknown error'}`)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}