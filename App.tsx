import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './constants';
import { Language } from './types';
import Background from './components/Background';
import { ProfileHeader, BrandHeader } from './components/ProfileHeader';
import Slogan from './components/Slogan';
import SocialGrid from './components/SocialGrid';
import SkillsList from './components/SkillsList';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import PersonalitySection from './components/PersonalitySection';
import { ChevronDown } from 'lucide-react';

type Tab = 'home' | 'about' | 'skills' | 'contact' | 'personality';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'fa' : 'en'));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'fa';

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          // Home Tab Layout
          // pb-52: Increased bottom padding to push Brand Header up
          <div className="flex flex-col items-center justify-evenly w-full h-[100dvh] pt-4 pb-52 overflow-hidden relative">
             
             {/* Top: Profile Header */}
             <div className="w-full flex-shrink-0 z-10">
               <ProfileHeader t={t} lang={lang} />
             </div>
             
             {/* Center: Slogan (Takes available space) */}
             <div className="w-full flex items-center justify-center px-2 z-10 flex-grow">
                <Slogan />
             </div>
             
             {/* Bottom: Brand Header */}
             {/* Force LTR so it doesn't flip in Farsi */}
             <div className="w-full flex-shrink-0 z-10 mt-auto" dir="ltr">
               <BrandHeader />
             </div>
             
             {/* 
                Dive In Button
                Position: Fixed at bottom-28
             */}
             <div 
               className="fixed bottom-28 left-0 right-0 mx-auto w-fit z-40 flex flex-col items-center justify-center gap-2 cursor-pointer animate-bounce hover:scale-105 transition-transform" 
               onClick={() => setActiveTab('skills')}
             >
                <span className="text-[10px] md:text-xs font-bold text-white bg-purple-600/80 hover:bg-purple-600 px-3 py-1 md:px-4 md:py-1.5 rounded-full backdrop-blur-md shadow-[0_0_10px_#a855f7] border border-white/20 whitespace-nowrap">
                  {lang === 'en' ? "Let's dive in!" : "بزن بریم ببینیم چی داریم!"}
                </span>
                <ChevronDown className="text-purple-400 drop-shadow-[0_0_5px_#a855f7]" size={20} />
             </div>

          </div>
        );
      case 'about':
        return (
          <div className="w-full animate-fade-in pt-20 pb-24 h-[100dvh] flex flex-col">
            <AboutSection t={t} lang={lang} />
          </div>
        );
      case 'skills':
        return (
          <div className="w-full animate-fade-in pt-20 pb-24">
            <SkillsList t={t} />
          </div>
        );
      case 'contact':
        return (
          <div className="w-full animate-fade-in pt-20 pb-24">
            <SocialGrid t={t} />
          </div>
        );
      case 'personality':
        return (
          <div className="w-full animate-fade-in pt-20 pb-24">
            <PersonalitySection t={t} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`min-h-screen w-full relative transition-all duration-300 ${isRTL ? 'font-persian' : 'font-sans'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Background />

      <Navbar 
        t={t} 
        lang={lang} 
        onToggleLang={toggleLanguage} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* Main Container */}
      <main className={`w-full mx-auto ${activeTab !== 'home' ? 'px-4' : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;