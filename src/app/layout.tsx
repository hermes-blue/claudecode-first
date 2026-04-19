import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BHC 치킨 창업 해석기',
  description: '프랜차이즈 창업 정보를 숫자 중심 탐색형 카드 UX로 해석',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
