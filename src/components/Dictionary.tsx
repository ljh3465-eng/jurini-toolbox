'use client';
import { useState, useMemo } from 'react';

const dictionaryData = [
    { term: 'PER', definition: "회사의 가성비를 알려주는 지표예요. 붕어빵 가게가 1년에 100만원 버는데 가게를 1,000만원에 판다면 PER은 10배! 이 숫자가 낮을수록 회사가 버는 돈에 비해 주가가 싸다는 뜻이라 '저평가'되었다고 말해요." },
    { term: 'PBR', definition: '회사의 청산가치예요. 만약 회사가 지금 당장 망해서 모든 자산을 팔았을 때, 내 주머니에 얼마가 들어올지 알려줘요. PBR이 1보다 낮다면? 회사의 자산 가치보다도 주가가 싸다는 아주 매력적인 신호일 수 있어요!' },
    { term: 'ROE', definition: "'내 돈으로 얼마나 잘 벌었나?'를 보여주는 회사의 성적표예요. ROE가 20%라면, 회사가 자기 돈 1억으로 1년에 2,000만원을 벌었다는 뜻! 이 숫자가 높을수록 돈 버는 능력이 뛰어난 '일 잘하는 회사'라고 할 수 있죠." },
    { term: 'EPS', definition: "내가 가진 주식 1주가 1년 동안 얼마를 벌었는지 알려주는 값이에요. 예를 들어 EPS가 1,000원이면, 내 주식 한 장이 1년에 1,000원씩 벌어오고 있다는 뜻! EPS가 꾸준히 오르는 회사는 성장하고 있다는 좋은 신호예요." },
    { term: '예수금', definition: "주식을 사기 위해 내 증권계좌에 넣어둔 총알(현금)이에요. 주식을 사면 예수금이 줄고, 팔면 다시 늘어나죠. 주식 주문을 넣기 전에 예수금이 충분한지 꼭 확인해야 해요!" },
    { term: '시가총액', definition: "회사의 덩치, 즉 회사의 전체 가격이에요. (현재 주가 X 총 주식 수)로 계산하죠. 시가총액이 크다는 건 그만큼 규모가 크고 안정적인 회사라는 뜻. 삼성전자의 시가총액이 가장 큰 것처럼요!" }
];

export default function Dictionary() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTerm, setSelectedTerm] = useState(dictionaryData[0]);

    const filteredTerms = useMemo(() => 
        dictionaryData.filter(item => item.term.toLowerCase().includes(searchTerm.toLowerCase())),
        [searchTerm]
    );

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
                    {filteredTerms.map((item) => (
                        <div 
                            key={item.term}
                            className={`term-list-item ${selectedTerm.term === item.term ? 'active' : ''}`}
                            onClick={() => setSelectedTerm(item)}
                        >
                            {item.term}
                        </div>
                    ))}
                </div>
                <div className="term-definition">
                    <h3>{selectedTerm.term}</h3>
                    <p>{selectedTerm.definition}</p>
                </div>
            </div>
        </div>
    );
}
