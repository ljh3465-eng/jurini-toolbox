'use client';

interface NavbarProps {
    activePage: string;
    showPage: (pageId: string, isDropdown?: boolean) => void;
}

export default function Navbar({ activePage, showPage }: NavbarProps) {
    const dropdownItems = [
        { id: 'dictionary', name: '주식 용어 사전' },
        { id: 'useful-sites', name: '유용한 사이트' },
    ];

    return (
        <nav className="navbar">
            <div 
                className="logo" 
                onClick={() => showPage('avg-calculator')} 
                style={{ cursor: 'pointer' }}
            >
                🐣 주린이 툴박스
            </div>
            <div className="nav-links">
                <button className={`nav-button ${activePage === 'avg-calculator' ? 'active' : ''}`} onClick={() => showPage('avg-calculator')}>물타기 계산기</button>
                <button className={`nav-button ${activePage === 'meme-generator' ? 'active' : ''}`} onClick={() => showPage('meme-generator')}>물타기 짤</button>
                <button className={`nav-button ${activePage === 'imaginary-rich' ? 'active' : ''}`} onClick={() => showPage('imaginary-rich')}>상상부자 짤</button>
                <button className={`nav-button ${activePage === 'guide' ? 'active' : ''}`} onClick={() => showPage('guide')}>주린이 가이드</button>
                <div className="dropdown">
                    <button className={`nav-button dropdown-btn ${dropdownItems.some(item => item.id === activePage) ? 'active' : ''}`}>더보기 ▼</button>
                    <div className="dropdown-content">
                        <button onClick={() => showPage('dividend-calculator', true)}>배당금 계산기</button>
                        {dropdownItems.map(item => (
                            <button key={item.id} onClick={() => showPage(item.id, true)}>{item.name}</button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}