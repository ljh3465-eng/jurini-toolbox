import type { Metadata } from 'next';
import './globals.css'; // 이 부분이 살아있는지 확인!
import Script from 'next/script';

export const metadata: Metadata = {
  title: "주린이 필수 툴박스",
  description: "주린이를 위한 물타기 계산기, 배당금 계산기, 투자 용어 사전 등 유용한 주식 투자 도구 모음.",
  verification: {
    other: {
      "naver-site-verification": "fcfee74366a02e63eea409edcc3dd7cce915673b",
    },
  },
  openGraph: {
    title: "주린이 필수 툴박스",
    description: "물타기 계산기부터 투자 꿀팁까지 한번에!",
    url: "https://jurinitools.com",
    siteName: "주린이 툴박스",
    images: [
      {
        url: "https://jurinitools.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8531773061576363`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
      </head>
      <body>{children}</body>
    </html>
  );
}