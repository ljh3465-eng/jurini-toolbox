'use client';
import { useState, useRef } from 'react';

export default function ImaginaryRichMemeGenerator() {
    const [inputs, setInputs] = useState({
        stockName: '',
        purchasePrice: '',
        purchaseShares: '',
        purchaseDate: '',
        currentPrice: '',
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const memeTemplateRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const generateMeme = async () => {
        const html2canvas = (await import('html2canvas')).default;
        
        const { stockName, purchasePrice, purchaseShares, currentPrice } = inputs;
        if (!stockName || !purchasePrice || !purchaseShares || !currentPrice) {
            alert('모든 값을 입력해주세요!');
            return;
        }

        if (memeTemplateRef.current) {
            html2canvas(memeTemplateRef.current).then(canvas => {
                setImageUrl(canvas.toDataURL('image/png'));
            });
        }
    };
    
    const purchasePriceNum = Number(inputs.purchasePrice);
    const purchaseSharesNum = Number(inputs.purchaseShares);
    const currentPriceNum = Number(inputs.currentPrice);

    const purchaseAmount = purchasePriceNum * purchaseSharesNum;
    const currentValue = currentPriceNum * purchaseSharesNum;
    const profit = currentValue - purchaseAmount;
    const returnRate = purchaseAmount > 0 ? ((profit / purchaseAmount) * 100).toFixed(2) : '0.00';

    return (
        <>
            <div className="tool-card">
                <h2>🤑 상상부자 짤 생성기</h2>
                <div className="form-group">
                    <label htmlFor="stockName">종목명</label>
                    <input type="text" id="stockName" placeholder="엔비디아" value={inputs.stockName} onChange={handleChange} />
                </div>
                <hr style={{ margin: '25px 0', borderTop: '1px solid #eee', borderBottom: 'none' }} />
                <h4>만약 내가...</h4>
                <div className="input-grid">
                    <div className="form-group">
                        <label htmlFor="purchasePrice">얼마에</label>
                        <input type="number" id="purchasePrice" placeholder="150000" value={inputs.purchasePrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="purchaseShares">몇 주를</label>
                        <input type="number" id="purchaseShares" placeholder="10" value={inputs.purchaseShares} onChange={handleChange} />
                    </div>
                </div>
                 <div className="form-group">
                    <label htmlFor="purchaseDate">언제 샀더라면</label>
                    <input type="date" id="purchaseDate" value={inputs.purchaseDate} onChange={handleChange} />
                </div>
                <hr style={{ margin: '25px 0', borderTop: '1px solid #eee', borderBottom: 'none' }} />
                <h4>현재 가격</h4>
                <div className="form-group">
                    <label htmlFor="currentPrice">현재 주식 가격 (직접 입력)</label>
                    <input type="number" id="currentPrice" placeholder="1800000" value={inputs.currentPrice} onChange={handleChange} />
                </div>
                <button className="calc-button secondary" onClick={generateMeme}>상상 시작!</button>
                
                {imageUrl && (
                    <div id="image-preview-container">
                        <h3>생성된 이미지</h3>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img id="image-preview" src={imageUrl} alt="생성된 상상부자 짤" />
                        <a id="download-btn" href={imageUrl} download="my_rich_story.png" className="calc-button primary">이미지 다운로드</a>
                    </div>
                )}
            </div>

            {/* 화면 밖 숨겨진 짤 템플릿 */}
            <div id="meme-template" ref={memeTemplateRef}>
                <div className="meme-header">
                    <h3>만약 내가 그때 샀더라면... 🤑</h3>
                </div>
                <div className="meme-section">
                    <h4>📈 나의 상상 매수</h4>
                    <p><span>종목명</span><strong>{inputs.stockName}</strong></p>
                    <p><span>매수일</span><span>{inputs.purchaseDate || 'N/A'}</span></p>
                    <p><span>매수가</span><strong>{purchasePriceNum.toLocaleString()}원</strong></p>
                    <p><span>수량</span><span>{purchaseSharesNum.toLocaleString()}주</span></p>
                </div>
                <div className="meme-section">
                    <h4>💰 현재 가치</h4>
                    <p><span>현재가</span><strong>{currentPriceNum.toLocaleString()}원</strong></p>
                    <p><span>평가금액</span><strong>{currentValue.toLocaleString()}원</strong></p>
                </div>
                <div className="meme-result">
                    <p>내 수익률은... <br />
                    <span className="highlight" style={{ color: profit >= 0 ? '#2E7D32' : '#D32F2F' }}>
                        {profit >= 0 ? '+' : ''}{returnRate}% ({profit.toLocaleString()}원)
                    </span>
                    </p>
                </div>
                <div className="meme-footer">- 주린이 툴박스에서 생성됨 -</div>
            </div>
        </>
    );
}