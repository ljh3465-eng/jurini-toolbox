'use client';

interface FooterProps {
    showPage: (pageId: string) => void;
}

export default function Footer({ showPage }: FooterProps) {
    return (
        <footer className="footer">
            <div>© 2025 주린이 툴박스. All Rights Reserved.</div>
            <div>
                <button onClick={() => showPage('about')}>소개</button> |
                <button onClick={() => showPage('privacy-policy')}>개인정보처리방침</button> |
                <button onClick={() => showPage('contact')}>문의하기</button>
            </div>
            <div>광고문의: (미정)</div>
        </footer>
    );
}
