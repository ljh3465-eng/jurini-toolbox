// src/app/layout.tsx

import type { Metadata } from "next";
// ↓↓↓ 1. next/script에서 Script를 import 합니다. ↓↓↓
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "주린이 필수 툴박스",
  description: "주린이를 위한 물타기 계산기, 배당금 계산기, 투자 용어 사전 등 유용한 주식 투자 도구 모음.",
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
        {/* ↓↓↓ 2. head 태그 안에 애드센스 코드를 넣습니다. ↓↓↓ */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
        ></script>
        {/* ↑↑↑ 여기까지 추가하세요! ↑↑↑ */}
      </head>
      <body>{children}</body>
    </html>
  );
}
