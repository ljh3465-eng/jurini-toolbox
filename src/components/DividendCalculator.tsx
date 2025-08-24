'use client';
import { useState } from 'react';

export default function DividendCalculator() {
    const [inputs, setInputs] = useState({
        divStockPrice: '',
        divPerShare: '',
        divShares: '',
    });
    const [result, setResult] = useState<{ yieldRate: string; preTax: number; afterTax: number } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const calculateDividend = () => {
        const price = Number(inputs.divStockPrice);
        const dividend = Number(inputs.divPerShare);
        const shares = Number(inputs.divShares);

        if (!price || !dividend || !shares) {
            alert('모든 값을 입력해주세요.');
            return;
        }

        const yieldRate = ((dividend / price) * 100).toFixed(2);
        const preTax = dividend * shares;
        const afterTax = Math.floor(preTax * (1 - 0.154));

        setResult({ yieldRate, preTax, afterTax });
    };

    return (
        <div className="tool-card">
            <h2>💰 배당금 계산기</h2>
            <div className="form-group">
                <label htmlFor="divStockPrice">1주당 가격 (원)</label>
                <input type="number" id="divStockPrice" placeholder="50000" value={inputs.divStockPrice} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="divPerShare">1주당 배당금 (원)</label>
                <input type="number" id="divPerShare" placeholder="1500" value={inputs.divPerShare} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="divShares">보유 주식 수</label>
                <input type="number" id="divShares" placeholder="100" value={inputs.divShares} onChange={handleChange} />
            </div>
            <button className="calc-button primary" onClick={calculateDividend}>내 배당금 계산</button>
            
            {result && (
                <div className="result-area">
                    <p><span>시가배당률</span> <span className="value">{result.yieldRate}%</span></p>
                    <p><span>세전 배당금 (15.4% 미적용)</span> <span className="value">{result.preTax.toLocaleString()}원</span></p>
                    <p><span>세후 예상 배당금</span> <span className="value">{result.afterTax.toLocaleString()}원</span></p>
                </div>
            )}

            <div className="usage-guide">
                <h4>💡 간단 사용법</h4>
                <p>
                    <strong>1주당 가격</strong>에는 현재 주식 가격을, <strong>1주당 배당금</strong>에는 회사가 1주에 지급하는 배당금을 입력하세요. (DART나 증권사 앱에서 확인 가능해요!)
                    마지막으로 내가 가진 <strong>보유 주식 수</strong>를 넣고 계산하면, 세금을 뗀 실제 내 통장에 들어올 예상 배당금이 얼마인지 알 수 있어요.
                </p>
            </div>
        </div>
    );
}
