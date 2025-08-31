'use client';

// Footer 컴포넌트가 받을 props의 타입을 정의합니다.
interface FooterProps {
    setShowPage: (page: string) => void;
}

export default function Footer({ setShowPage }: FooterProps) {
    const handleFooterLinkClick = (page: string) => {
        setShowPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer>
            <div className="footer-content">
                <div className="footer-links">
                    <button onClick={() => handleFooterLinkClick('about')}>소개</button>
                    <span>|</span>
                    <button onClick={() => handleFooterLinkClick('privacy')}>개인정보처리방침</button>
                    <span>|</span>
                    <button onClick={() => handleFooterLinkClick('contact')}>문의하기</button>
                </div>
                <div className="footer-info">
                    <p>광고문의: (미정)</p>
                    <p>© {new Date().getFullYear()} 주린이 툴박스. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
