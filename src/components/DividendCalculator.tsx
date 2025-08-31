'use client';
import { useState } from 'react';

export default function DividendCalculator() {
    const [inputs, setInputs] = useState({
        stockPrice: '',
        dividendPerShare: '',
        sharesOwned: '',
    });
    const [result, setResult] = useState<{dividendYield: string, totalDividend: number, totalDividendAfterTax: number} | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({...prev, [id]: value}));
    };

    const calculate = () => {
        const stockPrice = parseInt(inputs.stockPrice);
        const dividendPerShare = parseInt(inputs.dividendPerShare);
        const sharesOwned = parseInt(inputs.sharesOwned);

        if (isNaN(stockPrice) || isNaN(dividendPerShare) || isNaN(sharesOwned) || stockPrice <= 0) {
            alert("모든 칸에 올바른 숫자를 입력해주세요!");
            return;
        }

        const dividendYield = (dividendPerShare / stockPrice) * 100;
        const totalDividend = dividendPerShare * sharesOwned;
        const totalDividendAfterTax = totalDividend * (1 - 0.154);

        setResult({
            dividendYield: dividendYield.toFixed(2),
            totalDividend: totalDividend,
            totalDividendAfterTax: Math.floor(totalDividendAfterTax),
        });
    };

    return (
        <div className="tool-card">
            <h2>💰 배당금 계산기</h2>
            <div className="form-group">
                <label htmlFor="stockPrice">1주당 가격 (원)</label>
                <input type="number" id="stockPrice" value={inputs.stockPrice} onChange={handleInputChange} placeholder="예: 50000" />
            </div>
            <div className="form-group">
                <label htmlFor="dividendPerShare">1주당 배당금 (원)</label>
                <input type="number" id="dividendPerShare" value={inputs.dividendPerShare} onChange={handleInputChange} placeholder="예: 1500" />
            </div>
            <div className="form-group">
                <label htmlFor="sharesOwned">보유 주식 수</label>
                <input type="number" id="sharesOwned" value={inputs.sharesOwned} onChange={handleInputChange} placeholder="예: 100" />
            </div>
            <button onClick={calculate}>내 배당금 계산</button>

            {result && (
                 <div className="result-section">
                    <h3>계산 결과</h3>
                    <p>시가배당률: <span>{result.dividendYield}%</span></p>
                    <p>세전 예상 배당금 (15.4% 미적용): <span>{result.totalDividend.toLocaleString()}원</span></p>
                    <p>세후 예상 배당금: <span>{result.totalDividendAfterTax.toLocaleString()}원</span></p>
                </div>
            )}

            <div className="instruction-box">
                <h4>💡 간단 사용법</h4>
                <ul>
                    <li><strong>1주당 가격</strong>에는 현재 주식 가격을,</li>
                    <li><strong>1주당 배당금</strong>에는 회사가 1주에 지급하는 배당금을 입력하세요. (DART나 증권사 앱에서 확인 가능해요!)</li>
                    <li>마지막으로 내가 가진 <strong>보유 주식 수</strong>를 넣고 계산하면, 세금을 뗀 실제 내 통장에 들어올 예상 배당금이 얼마인지 알 수 있어요.</li>
                </ul>
            </div>
        </div>
    );
}