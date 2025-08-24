'use client';
import { useState, useRef } from 'react';

export default function MemeGenerator() {
    const [inputs, setInputs] = useState({
        stockName: '',
        initialPrice: '',
        initialShares: '',
        initialDate: '',
        additionalPrice: '',
        additionalShares: '',
        additionalDate: '',
    });
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [showAmount, setShowAmount] = useState(true); // 금액 표시 체크박스 상태
    const memeTemplateRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const generateMeme = async () => {
        // html2canvas는 브라우저에서만 동작하므로, 동적으로 import 합니다.
        const html2canvas = (await import('html2canvas')).default;
        
        const { stockName, initialPrice, initialShares, additionalPrice, additionalShares } = inputs;
        if (!stockName || !initialPrice || !initialShares || !additionalPrice || !additionalShares) {
            alert('모든 값을 입력해주세요!');
            return;
        }

        if (memeTemplateRef.current) {
            html2canvas(memeTemplateRef.current).then(canvas => {
                setImageUrl(canvas.toDataURL('image/png'));
            });
        }
    };
    
    // 실시간 계산을 위한 변수들
    const initialPriceNum = Number(inputs.initialPrice);
    const initialSharesNum = Number(inputs.initialShares);
    const initialAmount = initialPriceNum * initialSharesNum;

    const additionalPriceNum = Number(inputs.additionalPrice);
    const additionalSharesNum = Number(inputs.additionalShares);
    const additionalAmount = additionalPriceNum * additionalSharesNum;

    const totalShares = initialSharesNum + additionalSharesNum;
    const totalInvestment = initialAmount + additionalAmount;
    const finalPrice = totalShares > 0 ? Math.round(totalInvestment / totalShares) : 0;

    return (
        <>
            <div className="tool-card">
                <h2>😭 내가 만약 그때... 물타기 짤 생성기</h2>
                <div className="form-group">
                    <label htmlFor="stockName">종목명</label>
                    <input type="text" id="stockName" placeholder="삼성전자" value={inputs.stockName} onChange={handleChange} />
                </div>
                <hr style={{ margin: '25px 0', borderTop: '1px solid #eee', borderBottom: 'none' }} />
                <h4>최초 매수 정보</h4>
                <div className="input-grid">
                    <div className="form-group">
                        <label htmlFor="initialPrice">매수 단가</label>
                        <input type="number" id="initialPrice" placeholder="80000" value={inputs.initialPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="initialShares">매수 수량</label>
                        <input type="number" id="initialShares" placeholder="10" value={inputs.initialShares} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>매수금액 (자동 계산)</label>
                    <div className="calculated-amount">{initialAmount.toLocaleString()}원</div>
                </div>
                 <div className="form-group">
                    <label htmlFor="initialDate">매수 일자</label>
                    <input type="date" id="initialDate" value={inputs.initialDate} onChange={handleChange} />
                </div>
                <hr style={{ margin: '25px 0', borderTop: '1px solid #eee', borderBottom: 'none' }} />
                <h4>놓쳐버린 물타기 정보</h4>
                 <div className="input-grid">
                    <div className="form-group">
                        <label htmlFor="additionalPrice">물타기 가격</label>
                        <input type="number" id="additionalPrice" placeholder="60000" value={inputs.additionalPrice} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="additionalShares">물타기 수량</label>
                        <input type="number" id="additionalShares" placeholder="10" value={inputs.additionalShares} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label>물타기 금액 (자동 계산)</label>
                    <div className="calculated-amount">{additionalAmount.toLocaleString()}원</div>
                </div>
                <div className="form-group">
                    <label htmlFor="additionalDate">물타기 일자</label>
                    <input type="date" id="additionalDate" value={inputs.additionalDate} onChange={handleChange} />
                </div>
                <div className="generate-controls">
                    <button className="calc-button secondary" onClick={generateMeme}>짤 만들기!</button>
                    <div className="checkbox-group">
                        <input type="checkbox" id="showAmount" checked={showAmount} onChange={(e) => setShowAmount(e.target.checked)} />
                        <label htmlFor="showAmount">금액 표시</label>
                    </div>
                </div>
                
                {imageUrl && (
                    <div id="image-preview-container">
                        <h3>생성된 이미지</h3>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img id="image-preview" src={imageUrl} alt="생성된 물타기 짤" />
                        <a id="download-btn" href={imageUrl} download="my_stock_story.png" className="calc-button primary">이미지 다운로드</a>
                    </div>
                )}
            </div>

            {/* 화면 밖 숨겨진 짤 템플릿 */}
            <div id="meme-template" ref={memeTemplateRef}>
                <div className="meme-header">
                    <h3>내가 만약 그때 물을 탔더라면...?</h3>
                </div>
                <div className="meme-section">
                    <h4>😭 나의 원래 계획</h4>
                    <p><span>종목명</span><strong>{inputs.stockName}</strong></p>
                    <p><span>매수일</span><span>{inputs.initialDate || 'N/A'}</span></p>
                    <p><span>평단가</span><strong>{initialPriceNum.toLocaleString()}원</strong></p>
                    <p><span>수량</span><span>{initialSharesNum.toLocaleString()}주</span></p>
                    {showAmount && <p><span>매수금액</span><strong>{initialAmount.toLocaleString()}원</strong></p>}
                </div>
                <div className="meme-section">
                    <h4>🤔 놓쳐버린 물타기 기회</h4>
                    <p><span>매수일</span><span>{inputs.additionalDate || 'N/A'}</span></p>
                    <p><span>매수가</span><strong>{additionalPriceNum.toLocaleString()}원</strong></p>
                    <p><span>수량</span><span>{additionalSharesNum.toLocaleString()}주</span></p>
                    {showAmount && <p><span>물타기 금액</span><strong>{additionalAmount.toLocaleString()}원</strong></p>}
                </div>
                <div className="meme-result">
                    <p>내 평단가는 <span className="highlight">{initialPriceNum.toLocaleString()}</span>원 인데...<br />
                    <span className="highlight">{finalPrice.toLocaleString()}</span>원이 될 수 있었다...</p>
                </div>
                <div className="meme-footer">- 주린이 툴박스에서 생성됨 -</div>
            </div>
        </>
    );
}

