import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "주린이 필수 툴박스",
  description: "주린이를 위한 물타기 계산기, 배당금 계산기, 투자 용어 사전 등 유용한 주식 투자 도구 모음.",
  verification: {
    other: {
      "naver-site-verification": "fcfee74366a02e63eea409edcc3dd7cce915673b",
    },
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {/* children이 page.tsx의 내용을 렌더링합니다. */}
        {children}
      </body>
    </html>
  );
}
