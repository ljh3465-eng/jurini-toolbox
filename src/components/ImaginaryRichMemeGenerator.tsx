'use client';
import { useState, useRef } from 'react';

// 입력값들의 타입을 정의합니다.
interface Inputs {
    stockName: string;
    purchasePrice: string;
    purchaseShares: string;
    currentPrice: string;
}

export default function ImagineMemeGenerator() {
    const [inputs, setInputs] = useState<Inputs>({
        stockName: '',
        purchasePrice: '',
        purchaseShares: '',
        currentPrice: '',
    });
    const [imageUrl, setImageUrl] = useState<string>('');
    const memeRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const generateMeme = async () => {
        // html2canvas 라이브러리를 동적으로 불러옵니다.
        const html2canvas = (await import('html2canvas')).default;
        
        const { stockName, purchasePrice, purchaseShares, currentPrice } = inputs;
        if (!stockName || !purchasePrice || !purchaseShares || !currentPrice) {
            alert("모든 정보를 입력해주세요!");
            return;
        }

        const element = memeRef.current;
        if (element) {
            const canvas = await html2canvas(element, { 
                useCORS: true, 
                backgroundColor: '#FFFBEF',
                scale: 2 // 해상도 2배로 설정
            });
            setImageUrl(canvas.toDataURL('image/png'));
        }
    };
    
    // 계산 로직
    const purchasePriceNum = parseFloat(inputs.purchasePrice) || 0;
    const purchaseSharesNum = parseInt(inputs.purchaseShares) || 0;
    const currentPriceNum = parseFloat(inputs.currentPrice) || 0;
    
    const totalPurchaseAmount = purchasePriceNum * purchaseSharesNum;
    const currentEvaluationAmount = currentPriceNum * purchaseSharesNum;
    const profitLoss = currentEvaluationAmount - totalPurchaseAmount;
    const profitRate = totalPurchaseAmount > 0 ? (profitLoss / totalPurchaseAmount) * 100 : 0;

    return (
        <div className="tool-card">
            <h2>🤑 상상부자 짤 생성기</h2>
            <div className="form-group">
                <label htmlFor="stockName">종목명</label>
                <input type="text" id="stockName" value={inputs.stockName} onChange={handleInputChange} placeholder="예: 엔비디아" />
            </div>
            <div className="form-group">
                <label htmlFor="purchasePrice">&quot;그때&quot; 매수 가격 (1주당)</label>
                <input type="number" id="purchasePrice" value={inputs.purchasePrice} onChange={handleInputChange} placeholder="예: 150" />
            </div>
            <div className="form-group">
                <label htmlFor="purchaseShares">&quot;그때&quot; 매수 수량 (주)</label>
                <input type="number" id="purchaseShares" value={inputs.purchaseShares} onChange={handleInputChange} placeholder="예: 10" />
            </div>
            <div className="form-group">
                <label htmlFor="currentPrice">&quot;현재&quot; 가격 (1주당)</label>
                <input type="number" id="currentPrice" value={inputs.currentPrice} onChange={handleInputChange} placeholder="예: 1200" />
            </div>

            <button onClick={generateMeme}>📈 내 수익률 짤 만들기!</button>

            {imageUrl && (
                <div className="meme-result">
                    <h4>👇 아래 이미지를 꾹 눌러 저장하세요!</h4>
                    <img src={imageUrl} alt="상상부자 수익률 짤" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    <a href={imageUrl} download="jurini_imagine_rich.png" className="download-btn">
                        이미지 다운로드
                    </a>
                </div>
            )}
            
            {/* 실제 이미지를 생성하기 위한 숨겨진 영역 */}
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', width: '350px' }}>
                <div ref={memeRef} className="meme-template imagine-meme">
                    <p className="meme-header">&quot;만약 내가 그때... 샀더라면?&quot;</p>
                    <h2>{inputs.stockName || 'OO전자'}</h2>
                    <div className="meme-body">
                        <div className="meme-row">
                            <span>매수 가격</span>
                            <strong>{purchasePriceNum.toLocaleString()}원</strong>
                        </div>
                        <div className="meme-row">
                            <span>현재 가격</span>
                            <strong>{currentPriceNum.toLocaleString()}원</strong>
                        </div>
                    </div>
                    <div className="meme-footer">
                        <p>내 상상 속 수익률</p>
                        <h3 className={profitLoss >= 0 ? 'profit' : 'loss'}>
                            {profitLoss.toLocaleString()}원 ({profitRate.toFixed(2)}%)
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}