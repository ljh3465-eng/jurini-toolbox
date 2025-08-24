'use client';

interface NavbarProps {
    // isDropdown 파라미터를 제거했습니다.
    showPage: (pageId: string) => void;
    activePage: string;
}

export default function Navbar({ activePage, showPage }: NavbarProps) {
    const dropdownItems = [
        { id: 'dividend-calculator', name: '배당금 계산기' },
        { id: 'dictionary', name: '주식 용어 사전' },
        { id: 'useful-sites', name: '유용한 사이트' },
    ];

    return (
        <nav className="navbar">
            <div className="logo">🐣 주린이 툴박스</div>
            <div className="nav-links">
                <button className={`nav-button ${activePage === 'avg-calculator' ? 'active' : ''}`} onClick={() => showPage('avg-calculator')}>물타기 계산기</button>
                <button className={`nav-button ${activePage === 'meme-generator' ? 'active' : ''}`} onClick={() => showPage('meme-generator')}>물타기 짤 생성기</button>
                <button className={`nav-button ${activePage === 'guide' ? 'active' : ''}`} onClick={() => showPage('guide')}>주린이 가이드</button>
                <div className="dropdown">
                    <button className={`nav-button dropdown-btn ${dropdownItems.some(item => item.id === activePage) ? 'active' : ''}`}>더보기 ▼</button>
                    <div className="dropdown-content">
                        {dropdownItems.map(item => (
                            <button key={item.id} onClick={() => showPage(item.id)}>{item.name}</button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
