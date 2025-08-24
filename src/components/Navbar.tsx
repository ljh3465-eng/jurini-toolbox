'use client';

// 컴포넌트가 받아올 props의 타입을 정의합니다.
interface NavbarProps {
    activePage: string;
    showPage: (pageId: string, isDropdown?: boolean) => void;
}

export default function Navbar({ activePage, showPage }: NavbarProps) {
    // 드롭다운 메뉴 항목들을 배열로 관리합니다.
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
                            <button key={item.id} onClick={() => showPage(item.id, true)}>{item.name}</button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}
