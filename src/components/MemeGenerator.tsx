'use client';
import { useState, useRef } from 'react';

interface Inputs {
    stockName: string;
    initialPrice: string;
    initialShares: string;
    additionalPrice: string;
    additionalShares: string;
}

export default function MemeGenerator() {
    const [inputs, setInputs] = useState<Inputs>({
        stockName: '',
        initialPrice: '',
        initialShares: '',
        additionalPrice: '',
        additionalShares: '',
    });
    const [showAmount, setShowAmount] = useState(true);
    const [imageUrl, setImageUrl] = useState('');
    const memeRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputs(prev => ({ ...prev, [id]: value }));
    };

    const generateMeme = async () => {
        const html2canvas = (await import('html2canvas')).default;
        if (!inputs.stockName || !inputs.initialPrice || !inputs.initialShares || !inputs.additionalPrice || !inputs.additionalShares) {
            alert("모든 정보를 입력해주세요!");
            return;
        }
        const element = memeRef.current;
        if (element) {
            const canvas = await html2canvas(element, { useCORS: true, backgroundColor: '#FFFBEF', scale: 2 });
            setImageUrl(canvas.toDataURL('image/png'));
        }
    };

    const initialPriceNum = parseFloat(inputs.initialPrice) || 0;
    const initialSharesNum = parseInt(inputs.initialShares) || 0;
    const additionalPriceNum = parseFloat(inputs.additionalPrice) || 0;
    const additionalSharesNum = parseInt(inputs.additionalShares) || 0;

    const totalShares = initialSharesNum + additionalSharesNum;
    const finalAvgPrice = totalShares > 0 ? ((initialPriceNum * initialSharesNum) + (additionalPriceNum * additionalSharesNum)) / totalShares : 0;
    const initialAmount = initialPriceNum * initialSharesNum;
    const additionalAmount = additionalPriceNum * additionalSharesNum;

    return (
        <div className="tool-card">
            <h2>😭 물타기 짤 생성기</h2>
            <div className="form-group">
                <label htmlFor="stockName">종목명</label>
                <input type="text" id="stockName" value={inputs.stockName} onChange={handleInputChange} placeholder="예: 삼성전자" />
            </div>
            <div className="form-group">
                <label>최초 매수 정보</label>
                <input type="number" id="initialPrice" value={inputs.initialPrice} onChange={handleInputChange} placeholder="평단가 (예: 80000)" />
                <input type="number" id="initialShares" value={inputs.initialShares} onChange={handleInputChange} placeholder="수량 (예: 10)" style={{marginTop: '10px'}}/>
            </div>
             <div className="form-group">
                <label>추가 매수(물타기) 정보</label>
                <input type="number" id="additionalPrice" value={inputs.additionalPrice} onChange={handleInputChange} placeholder="물타기 가격 (예: 60000)" />
                <input type="number" id="additionalShares" value={inputs.additionalShares} onChange={handleInputChange} placeholder="물타기 수량 (예: 10)" style={{marginTop: '10px'}}/>
            </div>
            <div className="form-group checkbox-group">
                <input type="checkbox" id="showAmount" checked={showAmount} onChange={(e) => setShowAmount(e.target.checked)} />
                <label htmlFor="showAmount">금액 표시하기</label>
            </div>
            <button onClick={generateMeme}>🖼️ 내 평단가 짤 만들기!</button>
            {imageUrl && (
                <div className="meme-result">
                    <h4>👇 아래 이미지를 꾹 눌러 저장하세요!</h4>
                    <img src={imageUrl} alt="물타기 결과 짤" style={{ maxWidth: '100%', borderRadius: '8px' }} />
                    <a href={imageUrl} download="jurini_meme.png" className="download-btn">이미지 다운로드</a>
                </div>
            )}
            <div style={{ position: 'absolute', left: '-9999px', width: '300px' }}>
                <div ref={memeRef} className="meme-template water-meme">
                    <p className="meme-header">&quot;내가 만약 그때 물을 탔더라면...?&quot;</p>
                    <h2>{inputs.stockName || 'OO전자'}</h2>
                    <div className="meme-body">
                        <div className="meme-subtitle">😭 나의 원래 계획</div>
                        <div className="meme-row"><span>평단가</span><strong>{initialPriceNum.toLocaleString()}원</strong></div>
                        <div className="meme-row"><span>수량</span><strong>{initialSharesNum.toLocaleString()}주</strong></div>
                        {showAmount && <div className="meme-row"><span>매수금액</span><strong>{initialAmount.toLocaleString()}원</strong></div>}
                        <div className="meme-subtitle">😥 놓쳐버린 물타기 기회</div>
                        <div className="meme-row"><span>물타기 가격</span><strong>{additionalPriceNum.toLocaleString()}원</strong></div>
                        <div className="meme-row"><span>물타기 수량</span><strong>{additionalSharesNum.toLocaleString()}주</strong></div>
                        {showAmount && <div className="meme-row"><span>물타기 금액</span><strong>{additionalAmount.toLocaleString()}원</strong></div>}
                    </div>
                    <div className="meme-footer">
                        <p>내 평단가는 {initialPriceNum.toLocaleString()}원 인데...</p>
                        <h3>{finalAvgPrice.toLocaleString('en-US', { maximumFractionDigits: 0 })}원이 될 수 있었다...</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}