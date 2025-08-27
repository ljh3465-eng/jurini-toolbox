'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvgCalculator from '../components/AvgCalculator';
import MemeGenerator from '../components/MemeGenerator';
import ImaginaryRichMemeGenerator from '../components/ImaginaryRichMemeGenerator';
import DividendCalculator from '../components/DividendCalculator';
import Dictionary from '../components/Dictionary';
import UsefulSites from '../components/UsefulSites';
import Guide from '../components/Guide';
import About from '../components/About';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Contact from '../components/Contact';

export default function Home() {
  // ↓↓↓ 1. 첫 페이지를 '주린이 가이드'로 변경합니다. ↓↓↓
  const [activePage, setActivePage] = useState('guide');

  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'avg-calculator': return <AvgCalculator />;
      case 'meme-generator': return <MemeGenerator />;
      case 'imaginary-rich': return <ImaginaryRichMemeGenerator />;
      case 'dividend-calculator': return <DividendCalculator />;
      case 'dictionary': return <Dictionary />;
      case 'useful-sites': return <UsefulSites />;
      case 'guide': return <Guide showPage={showPage} />; // Guide 컴포넌트에 showPage 함수 전달
      case 'about': return <About />;
      case 'privacy-policy': return <PrivacyPolicy />;
      case 'contact': return <Contact />;
      default: return <Guide showPage={showPage} />; // 기본값도 가이드로 변경
    }
  };

  return (
    <>
      <Navbar activePage={activePage} showPage={showPage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer showPage={showPage} />
    </>
  );
}

