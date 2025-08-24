// src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "주린이 필수 툴박스",
  description: "주린이를 위한 물타기 계산기, 배당금 계산기, 투자 용어 사전 등 유용한 주식 투자 도구 모음.",
  verification: {
    // google 인증 코드는 이제 사용하지 않으므로 제거합니다.
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
        {/* ↓↓↓ 이 부분을 애드센스 코드 스니펫으로 교체합니다. ↓↓↓ */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
        ></script>
        {/* ↑↑↑ 여기까지 수정하세요! ↑↑↑ */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### **다음 단계**

1.  **`ca-pub-xxxxxxxxxxxxxxxx`** 부분을 **본인의 애드센스 게시자 ID가 포함된 전체 `src` 주소**로 정확하게 교체해주세요.
2.  수정한 코드를 `git push`하여 Vercel에 배포합니다.
3.  배포가 완료된 후 **최소 1시간 이상** 기다렸다가, 애드센스 사이트에서 다시 확인 버튼을 누르면 됩