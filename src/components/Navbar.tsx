'use client';
import { useState } from 'react';

// GuidePost 타입을 정의합니다.
interface GuidePost {
  title: string;
  summary: string;
  content: string;
}

// Navbar 컴포넌트가 받을 props의 타입을 정의합니다.
interface NavbarProps {
    showPage: string;
    setShowPage: (page: string) => void;
    setSelectedGuidePost: (post: GuidePost | null) => void;
}

export default function Navbar({ showPage, setShowPage, setSelectedGuidePost }: NavbarProps) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleNavClick = (page: string) => {
        setShowPage(page);
        setDropdownOpen(false);
        if (page !== 'guide') {
            setSelectedGuidePost(null);
        }
    };

    const handleLogoClick = () => {
        setShowPage('guide'); 
        setDropdownOpen(false);
        setSelectedGuidePost(null); 
    };
    
    return (
        <header>
            <nav className="navbar">
                <div className="logo" onClick={handleLogoClick} style={{cursor: 'pointer'}}>
                    <h1>🐣 주린이 툴박스</h1>
                </div>
                <div className="nav-links">
                    <button className={showPage === 'guide' ? 'active' : ''} onClick={() => handleNavClick('guide')}>주린이 가이드</button>
                    <button className={showPage === 'avg' ? 'active' : ''} onClick={() => handleNavClick('avg')}>물타기 계산기</button>
                    <button className={showPage === 'meme' ? 'active' : ''} onClick={() => handleNavClick('meme')}>물타기 짤 생성기</button>
                    <div className="dropdown">
                        <button className="dropdown-toggle" onClick={() => setDropdownOpen(!isDropdownOpen)}>
                            더보기 ▼
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <button className={showPage === 'imagine' ? 'active' : ''} onClick={() => handleNavClick('imagine')}>상상부자 짤 생성기</button>
                                <button className={showPage === 'dividend' ? 'active' : ''} onClick={() => handleNavClick('dividend')}>배당금 계산기</button>
                                <button className={showPage === 'dictionary' ? 'active' : ''} onClick={() => handleNavClick('dictionary')}>주식 용어 사전</button>
                                <button className={showPage === 'sites' ? 'active' : ''} onClick={() => handleNavClick('sites')}>유용한 사이트</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}