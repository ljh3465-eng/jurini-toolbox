'use client';
import { useState, useEffect, useMemo } from 'react';

// GuidePost 타입을 정의합니다.
interface Term {
  term: string;
  definition: string;
}

const dictionaryData: Term[] = [
    { term: 'PER', definition: "회사의 가성비를 알려주는 지표예요. 붕어빵 가게가 1년에 100만원 버는데 가게를 1,000만원에 판다면 PER은 10배! 이 숫자가 낮을수록 회사가 버는 돈에 비해 주가가 싸다는 뜻이라 '저평가'되었다고 말해요." },
    { term: 'PBR', definition: '회사의 청산가치예요. 만약 회사가 지금 당장 망해서 모든 자산을 팔았을 때, 내 주머니에 얼마가 들어올지 알려줘요. PBR이 1보다 낮다면? 회사의 자산 가치보다도 주가가 싸다는 아주 매력적인 신호일 수 있어요!' },
    { term: 'ROE', definition: "'내 돈으로 얼마나 잘 벌었나?'를 보여주는 회사의 성적표예요. ROE가 20%라면, 회사가 자기 돈 1억으로 1년에 2,000만원을 벌었다는 뜻! 이 숫자가 높을수록 돈 버는 능력이 뛰어난 '일 잘하는 회사'라고 할 수 있죠." },
    { term: 'EPS', definition: "내가 가진 주식 1주가 1년 동안 얼마를 벌었는지 알려주는 값이에요. 예를 들어 EPS가 1,000원이면, 내 주식 한 장이 1년에 1,000원씩 벌어오고 있다는 뜻! EPS가 꾸준히 오르는 회사는 성장하고 있다는 좋은 신호예요." },
    { term: 'EV/EBITDA', definition: "회사를 통째로 샀을 때, 몇 년이면 투자금을 회수할 수 있는지 알려주는 지표예요. 예를 들어 이 값이 5배라면, 이 회사가 지금처럼 돈을 번다면 5년 만에 내가 투자한 돈을 전부 회수할 수 있다는 뜻! PER이랑 비슷한데, 세금이나 감가상각 같은 복잡한 걸 빼고 순수하게 '영업 활동'으로 돈 버는 능력을 보는 거라 더 정확하다고도 해요." },
    { term: '영업이익률', definition: "장사를 얼마나 잘했는지 보여주는 '순수익률'이에요. 붕어빵 1,000원어치를 팔았는데 재료비, 월세 다 빼고 200원이 남았다면 영업이익률은 20%! 이 비율이 높을수록 '남는 장사'를 잘하는 알짜 회사라는 뜻이죠." },
    { term: '당기순이익', definition: "회사가 1년 동안 장사해서 번 돈에서 세금, 이자 등등 정말 낼 거 다 내고 최종적으로 회사 통장에 남은 '진짜 내 돈'이에요. 이 돈이 꾸준히 늘어나는 회사가 좋은 회사겠죠?" },
    { term: '부채비율', definition: "회사의 '빚'이 얼마나 되는지 알려주는 건강진단서예요. 내 돈(자본)이 1억인데 빚(부채)도 1억이라면 부채비율은 100%. 보통 100% 이하면 건강하다고 봐요. 너무 높으면 회사가 휘청거릴 수 있으니 조심해야 해요!" },
    { term: '유보율', definition: "회사가 돈을 벌어서 주주들에게 배당금으로 나눠주고, 남은 돈을 얼마나 차곡차곡 쌓아두었는지 보여주는 '비상금 통장'이에요. 유보율이 높다는 건 그만큼 회사가 튼튼하고, 위기 상황에 잘 버틸 수 있거나 미래에 투자할 돈이 많다는 좋은 신호예요." },
    { term: '예수금', definition: "주식을 사기 위해 내 증권계좌에 넣어둔 총알(현금)이에요. 주식을 사면 예수금이 줄고, 팔면 다시 늘어나죠. 주식 주문을 넣기 전에 예수금이 충분한지 꼭 확인해야 해요!" },
    { term: '시가총액', definition: "회사의 덩치, 즉 회사의 전체 가격이에요. (현재 주가 X 총 주식 수)로 계산하죠. 시가총액이 크다는 건 그만큼 규모가 크고 안정적인 회사라는 뜻. 삼성전자의 시가총액이 가장 큰 것처럼요!" },
    { 
        term: '캔들', 
        definition: `
            <h3>하루 동안의 주가 전쟁, 그 기록!</h3>
            <p>캔들은 하루 동안 주가가 어떻게 움직였는지를 보여주는 그림이에요. 마치 그날 하루 동안 '사려는 사람'과 '팔려는 사람'이 얼마나 치열하게 싸웠는지 보여주는 전쟁 기록 같죠! 캔들 하나에는 4가지 중요한 정보가 모두 담겨있어요.</p>
            <h4>📈 캔들의 4가지 기본 정보</h4>
            <p><strong>시가:</strong> 아침 9시, 주식 시장이 열렸을 때의 '시작 가격'</p>
            <p><strong>종가:</strong> 오후 3시 30분, 시장이 닫혔을 때의 '마지막 가격'</p>
            <p><strong>고가:</strong> 하루 중 가장 높게 올라갔던 '최고 가격'</p>
            <p><strong>저가:</strong> 하루 중 가장 낮게 내려갔던 '최저 가격'</p>

            <h4>🔴 양봉 vs 🔵 음봉</h4>
            <p><strong>양봉 (빨간색):</strong> 종가가 시가보다 높게 끝났다는 뜻! 즉, '사려는 힘'이 이겨서 주가가 오른 날이에요.</p>
            <p><strong>음봉 (파란색):</strong> 종가가 시가보다 낮게 끝났다는 뜻! 즉, '팔려는 힘'이 이겨서 주가가 내린 날이에요.</p>

            <h4>📏 몸통과 꼬리</h4>
            <p><strong>몸통:</strong> 시가와 종가 사이의 가격 범위를 보여줘요. 몸통이 길수록 그날의 주가 변동이 컸다는 뜻!</p>
            <p><strong>꼬리:</strong> 몸통 위아래로 삐죽 나온 선이에요. 위꼬리는 그날의 '고가'를, 아래꼬리는 '저가'를 나타내죠. 꼬리가 길다는 건, 장중에 주가가 엄청나게 오르거나 내렸었다는 흔적이에요.</p>
        `
    }
];

export default function Dictionary() {
    // 기본 선택을 첫 번째 항목이 아닌 null로 시작하여, 검색 결과에 따라 유동적으로 표시
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

    const filteredTerms = useMemo(() => 
        [...dictionaryData]
            .sort((a, b) => a.term.localeCompare(b.term)) // 가나다순 정렬
            .filter(item => item.term.toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm]
    );

    // selectedTerm을 filteredTerms의 첫 번째 항목으로 초기화/업데이트
    useEffect(() => {
        if (filteredTerms.length > 0) {
            setSelectedTerm(filteredTerms[0]);
        } else {
            setSelectedTerm(null); // 검색 결과가 없으면 null로 설정
        }
    }, [filteredTerms]);

    const displayTerm = selectedTerm || { term: '검색 결과 없음', definition: '입력하신 용어를 찾을 수 없습니다.'};

    return (
        <div className="tool-card">
            <h2>📖 주린이 용어 사전</h2>
            <input 
                type="text" 
                className="form-group" 
                placeholder="궁금한 용어를 검색해보세요..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="dictionary-container">
                <div className="term-list">
                    {filteredTerms.length > 0 ? filteredTerms.map((item) => (
                        <div 
                            key={item.term}
                            className={`term-list-item ${selectedTerm?.term === item.term ? 'active' : ''}`}
                            onClick={() => setSelectedTerm(item)}
                        >
                            {item.term}
                        </div>
                    )) : <div className="no-results">검색 결과가 없습니다.</div>}
                </div>
                <div className="term-definition">
                    <h3>{displayTerm.term}</h3>
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: displayTerm.definition }} />
                </div>
            </div>
        </div>
    );
}

