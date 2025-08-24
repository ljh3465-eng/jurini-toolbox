'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvgCalculator from '../components/AvgCalculator';
import MemeGenerator from '../components/MemeGenerator';
import DividendCalculator from '../components/DividendCalculator';
import Dictionary from '../components/Dictionary';
import UsefulSites from '../components/UsefulSites';
import Guide from '../components/Guide';
import About from '../components/About';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Contact from '../components/Contact';

export default function Home() {
  const [activePage, setActivePage] = useState('avg-calculator');

  // isDropdown 파라미터가 사용되지 않아 경고가 발생하므로 제거했습니다.
  const showPage = (pageId: string) => {
    setActivePage(pageId);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'avg-calculator': return <AvgCalculator />;
      case 'meme-generator': return <MemeGenerator />;
      case 'dividend-calculator': return <DividendCalculator />;
      case 'dictionary': return <Dictionary />;
      case 'useful-sites': return <UsefulSites />;
      case 'guide': return <Guide />;
      case 'about': return <About />;
      case 'privacy-policy': return <PrivacyPolicy />;
      case 'contact': return <Contact />;
      default: return <AvgCalculator />;
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