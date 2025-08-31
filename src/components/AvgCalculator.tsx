'use client';
import { useState } from 'react';

export default function AvgCalculator() {
    const [inputs, setInputs] = useState({
        currentShares: '',
        currentPrice: '',
        additionalShares: '',
        additionalPrice: '',
    });
    const [result, setResult] = useState<{totalShares: number, totalInvestment: number, finalPrice: number} | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({...prev, [id]: value}));
    };

    const calculate = () => {
        const currentShares = parseInt(inputs.currentShares);
        const currentPrice = parseInt(inputs.currentPrice);
        const additionalShares = parseInt(inputs.additionalShares);
        const additionalPrice = parseInt(inputs.additionalPrice);

        if (isNaN(currentShares) || isNaN(currentPrice) || isNaN(additionalShares) || isNaN(additionalPrice)) {
            alert("모든 칸에 숫자를 입력해주세요!");
            return;
        }

        const totalInvestment = (currentShares * currentPrice) + (additionalShares * additionalPrice);
        const totalShares = currentShares + additionalShares;
        const finalPrice = Math.round(totalInvestment / totalShares);

        setResult({
            totalShares: totalShares,
            totalInvestment: totalInvestment,
            finalPrice: finalPrice,
        });
    };

    return (
        <div className="tool-card">
            <h2>💧 물타기 계산기</h2>
            <div className="form-group">
                <label htmlFor="currentShares">현재 보유 주식 수</label>
                <input type="number" id="currentShares" value={inputs.currentShares} onChange={handleInputChange} placeholder="예: 10" />
            </div>
            <div className="form-group">
                <label htmlFor="currentPrice">나의 평균 단가 (원)</label>
                <input type="number" id="currentPrice" value={inputs.currentPrice} onChange={handleInputChange} placeholder="예: 50000" />
            </div>
            <div className="form-group">
                <label htmlFor="additionalShares">추가 매수할 주식 수</label>
                <input type="number" id="additionalShares" value={inputs.additionalShares} onChange={handleInputChange} placeholder="예: 5" />
            </div>
            <div className="form-group">
                <label htmlFor="additionalPrice">추가 매수 단가 (원)</label>
                <input type="number" id="additionalPrice" value={inputs.additionalPrice} onChange={handleInputChange} placeholder="예: 30000" />
            </div>
            <button onClick={calculate}>최종 평단가 계산</button>
            
            {result && (
                <div className="result-section">
                    <h3>계산 결과</h3>
                    <p>총 보유 수량: <span>{result.totalShares.toLocaleString()}주</span></p>
                    <p>총 투자 금액: <span>{result.totalInvestment.toLocaleString()}원</span></p>
                    <p>최종 평균 단가: <span>{result.finalPrice.toLocaleString()}원</span></p>
                </div>
            )}

            <div className="instruction-box">
                <h4>💡 간단 사용법</h4>
                <p>내가 가진 주식의 정보(현재 보유 수량, 평단가)와 추가로 사려는 주식의 정보(추가 매수 수량, 가격)를 입력하고 &apos;계산&apos; 버튼을 누르면, 물타기 후 내 최종 평단가가 얼마가 되는지 자동으로 계산해줘요!</p>
            </div>
        </div>
    );
}