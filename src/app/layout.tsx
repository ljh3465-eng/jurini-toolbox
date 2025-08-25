// src/app/layout.tsx

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  // title과 description이 OG 데이터의 기본값이 됩니다.
  title: "주린이 필수 툴박스",
  description: "주린이를 위한 물타기 계산기, 배당금 계산기, 투자 용어 사전 등 유용한 주식 투자 도구 모음.",
  
  openGraph: {
    title: "주린이 필수 툴박스",
    description: "물타기 계산기부터 투자 꿀팁까지 한번에!",
    url: "https://jurinitools.com", // 여기에 본인 도메인 주소를 입력하세요.
    siteName: "주린이 툴박스",
    images: [
      {
        url: "/og-image.svg", // public 폴더의 이미지를 가리킵니다.
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  verification: {
    other: {
      "naver-site-verification": "fcfee74366a02e63eea409edcc3dd7cce915673b",
    },
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8531773061576363"
          crossOrigin="anonymous"
          // ↓↓↓ 로딩 전략을 변경하여 구글 로봇이 더 빨리 코드를 찾도록 합니다. ↓↓↓
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
