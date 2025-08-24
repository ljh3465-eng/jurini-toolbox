'use client';

const sites = [
    { name: 'DART 전자공시시스템', desc: '기업의 사업보고서, 공시 등 모든 정보를 확인할 수 있는 필수 사이트', url: 'https://dart.fss.or.kr/' },
    { name: '네이버 증권 리서치', desc: '각 증권사에서 발행하는 종목 리포트를 한눈에 볼 수 있는 곳', url: 'https://finance.naver.com/research/' },
    { name: 'SEIBro (증권정보포털)', desc: '내 주식의 배당일, 배당금 정보 등을 정확하게 확인할 수 있는 곳', url: 'https://seibro.or.kr/' },
    { name: '인베스팅닷컴', desc: '해외 주식 정보, 원자재, 환율 등 글로벌 경제 지표 확인에 유용', url: 'https://kr.investing.com/' },
];

export default function UsefulSites() {
    return (
        <div className="tool-card">
            <h2>🔗 유용한 사이트 모음</h2>
            <ul className="site-list">
                {sites.map(site => (
                    <li key={site.name} className="site-item">
                        <div className="site-info">
                            <h4>{site.name}</h4>
                            <p>{site.desc}</p>
                        </div>
                        <a href={site.url} target="_blank" rel="noopener noreferrer" className="site-link">방문하기</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
