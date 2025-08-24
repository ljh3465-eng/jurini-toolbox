'use client';

export default function Contact() {
    return (
        <div className="tool-card">
            <h2>📧 문의하기</h2>
            <div className="policy-container">
                <p>사이트 이용 중 불편한 점이나 제안하고 싶은 내용이 있으신가요?</p>
                <p>아래 버튼을 눌러 이메일을 보내주시면 빠른 시일 내에 답변드리겠습니다.</p>
                <br />
                <a href="mailto:contact@example.com?subject=[주린이 툴박스] 문의" className="calc-button primary" style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}>이메일 보내기</a>
            </div>
        </div>
    );
}
