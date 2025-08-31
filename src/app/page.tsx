'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvgCalculator from '../components/AvgCalculator';
import MemeGenerator from '../components/MemeGenerator'; // 물타기 짤
import DividendCalculator from '../components/DividendCalculator';
import Dictionary from '../components/Dictionary';
import UsefulSites from '../components/UsefulSites';
import Guide from '../components/Guide';
import About from '../components/About';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Contact from '../components/Contact';
import ImagineMemeGenerator from '../components/ImagineMemeGenerator';

// GuidePost 타입을 정의하여 여러 컴포넌트에서 공유합니다.
export interface GuidePost {
  title: string;
  summary: string;
  content: string;
}

export default function Home() {
    const [showPage, setShowPage] = useState('guide');
    // selectedGuidePost의 타입을 명확하게 지정합니다.
    const [selectedGuidePost, setSelectedGuidePost] = useState<GuidePost | null>(null);

    // 페이지 상태에 따라 브라우저 탭의 제목을 동적으로 변경하는 로직
    useEffect(() => {
        const baseTitle = "주린이 툴박스";
        let pageTitle = baseTitle;

        if (showPage === 'guide' && selectedGuidePost) {
            pageTitle = `${selectedGuidePost.title} | ${baseTitle}`;
        } else {
            switch (showPage) {
                case 'guide':
                    pageTitle = `주린이 가이드 | ${baseTitle}`;
                    break;
                case 'avg':
                    pageTitle = `물타기 계산기 | ${baseTitle}`;
                    break;
                case 'meme':
                    pageTitle = `물타기 짤 생성기 | ${baseTitle}`;
                    break;
                case 'imagine':
                    pageTitle = `상상부자 짤 생성기 | ${baseTitle}`;
                    break;
                case 'dividend':
                    pageTitle = `배당금 계산기 | ${baseTitle}`;
                    break;
                case 'dictionary':
                    pageTitle = `주식 용어 사전 | ${baseTitle}`;
                    break;
                case 'sites':
                    pageTitle = `유용한 사이트 | ${baseTitle}`;
                    break;
                case 'about':
                    pageTitle = `소개 | ${baseTitle}`;
                    break;
                case 'privacy':
                    pageTitle = `개인정보처리방침 | ${baseTitle}`;
                    break;
                case 'contact':
                    pageTitle = `문의하기 | ${baseTitle}`;
                    break;
            }
        }
        document.title = pageTitle;
    }, [showPage, selectedGuidePost]);


      const renderPage = () => {
        switch (showPage) {
            case 'avg':
                return <AvgCalculator />;
            case 'meme':
                return <MemeGenerator />;
            case 'imagine':
                return <ImagineMemeGenerator />;
            case 'dividend':
                return <DividendCalculator />;
            case 'dictionary':
                return <Dictionary />;
            case 'sites':
                return <UsefulSites />;
            case 'guide':
                return <Guide onPostSelect={setSelectedGuidePost} />;
            case 'about':
                return <About />;
            case 'privacy':
                return <PrivacyPolicy />;
            case 'contact':
                return <Contact />;
            default:
                return <Guide onPostSelect={setSelectedGuidePost} />;
        }
    };

    return (
        <>
            <Navbar showPage={showPage} setShowPage={setShowPage} setSelectedGuidePost={setSelectedGuidePost} />
            <main>
                <div className="container">
                    {renderPage()}
                </div>
            </main>
            <Footer setShowPage={setShowPage} />
        </>
    );
}