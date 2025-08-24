// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "주린이 필수 툴박스",
  description: "주린이를 위한 물타기 계산기, 배당금 계산기, 투자 용어 사전 등 유용한 주식 투자 도구 모음.",
  verification: {
    // ↓↓↓ 이 부분을 수정하세요! ↓↓↓
    google: "ca-pub-8531773061576363", // 구글 서치 콘솔이나 애드센스에서 제공하는 메타 태그의 content 값을 넣습니다.
    other: {
      "naver-site-verification": "fcfee74366a02e63eea409edcc3dd7cce915673b",
    },
    // ↑↑↑ 여기까지 수정하세요! ↑↑↑
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // head 태그는 metadata 객체가 자동으로 관리하므로 비워둡니다.
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}