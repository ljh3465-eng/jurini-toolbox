'use client';
import { useState } from 'react';

export default function AvgCalculator() {
    const [inputs, setInputs] = useState({
        currentShares: '',
        currentPrice: '',
        additionalShares: '',
        additionalPrice: '',
    });
    const [result, setResult] = useState<{ totalShares: number; totalInvestment: number; finalPrice: number } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const calculateAvg = () => {
        const currentShares = Number(inputs.currentShares);
        const currentPrice = Number(inputs.currentPrice);
        const additionalShares = Number(inputs.additionalShares);
        const additionalPrice = Number(inputs.additionalPrice);

        if (!currentShares || !currentPrice) {
            alert('현재 보유 정보를 입력해주세요.');
            return;
        }

        const totalShares = currentShares + additionalShares;
        const totalInvestment = (currentShares * currentPrice) + (additionalShares * additionalPrice);
        const finalPrice = totalShares > 0 ? Math.round(totalInvestment / totalShares) : 0;

        setResult({ totalShares, totalInvestment, finalPrice });
    };

    return (
        <div className="tool-card">
            <h2>💧 물타기 계산기</h2>
            <div className="form-group">
                <label htmlFor="currentShares">현재 보유 수량</label>
                <input type="number" id="currentShares" placeholder="10" value={inputs.currentShares} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="currentPrice">현재 평단가 (원)</label>
                <input type="number" id="currentPrice" placeholder="50000" value={inputs.currentPrice} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="additionalShares">추가 매수 수량</label>
                <input type="number" id="additionalShares" placeholder="5" value={inputs.additionalShares} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="additionalPrice">추가 매수 가격 (원)</label>
                <input type="number" id="additionalPrice" placeholder="30000" value={inputs.additionalPrice} onChange={handleChange} />
            </div>
            <button className="calc-button primary" onClick={calculateAvg}>최종 평단가 계산</button>
            
            {result && (
                <div className="result-area">
                    <p><span>총 보유 수량</span> <span className="value">{result.totalShares.toLocaleString()}주</span></p>
                    <p><span>총 투자 금액</span> <span className="value">{result.totalInvestment.toLocaleString()}원</span></p>
                    <p><span>최종 평균 단가</span> <span className="value">{result.finalPrice.toLocaleString()}원</span></p>
                </div>
            )}

            <div className="usage-guide">
                <h4>💡 간단 사용법</h4>
                <p>
                    내가 가진 주식의 정보 (현재 보유 수량, 평단가)와
                    추가로 사려는 주식의 정보 (추가 매수 수량, 가격)를 입력하고 &apos;계산&apos; 버튼을 누르면,
                    물타기 후 내 최종 평단가가 얼마가 되는지 자동으로 계산해줘요!
                </p>
            </div>
        </div>
    );
}