

import React from 'react';
import { Home, User, Cpu, BrainCircuit, MessageCircle, Globe } from 'lucide-react';
import { Translation } from '../types';

// نوع داده تب ها
type Tab = 'home' | 'about' | 'skills' | 'contact' | 'personality';

// ورودی های کامپوننت نوبار
interface NavbarProps {
  t: Translation; // متن ها
  lang: 'en' | 'fa'; // زبان
  onToggleLang: () => void; // تابع تغییر زبان
  activeTab: Tab; // تب فعلی
  setActiveTab: (tab: Tab) => void; // تابع تغییر تب
}

const Navbar: React.FC<NavbarProps> = ({ t, lang, onToggleLang, activeTab, setActiveTab }) => {
  
  // تابعی برای رندر کردن هر دکمه منو با استایل جدید
  const renderNavButton = (tabName: Tab, Icon: React.ElementType, label: string) => {
    const isActive = activeTab === tabName;
    
    return (
      <button 
        onClick={() => setActiveTab(tabName)} 
        // تغییر: اصلاح ارتفاع به h-20 (استاندارد) و تنظیم عرض برای موبایل
        className="relative flex flex-col items-center justify-center w-14 h-20 md:w-20 md:h-24 shrink-0"
      >
        {/* 
            افکت نورانی (Glow) در پس زمینه
            فقط وقتی فعال است نمایش داده میشود
            کادر مربعی حذف شد
        */}
        <div className={`absolute inset-0 rounded-full blur-xl transition-all duration-500 ${isActive ? 'bg-[#360E46] opacity-60' : 'opacity-0'}`} />

        {/* آیکون */}
        {/* وقتی فعال است به بالا حرکت میکند -translate-y-3. موقعیت پیش فرض کمی بالاتر است -mt-2 */}
        <div className={`relative z-10 transition-all duration-300 transform -mt-2 ${isActive ? 'text-white -translate-y-3 scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-gray-400 group-hover:text-purple-300'}`}>
            <Icon 
                size={isActive ? 28 : 24} 
                strokeWidth={isActive ? 2.5 : 2}
            />
        </div>
        
        {/* 
            متن لیبل 
            در حالت اکتیو محو میشود (opacity-0)
            در حالت غیرفعال نمایش داده میشود
            تغییر: موقعیت absolute bottom-2 برای فاصله دقیق تر از پایین
        */}
        <span className={`text-[9px] md:text-[10px] whitespace-nowrap font-bold tracking-wide transition-all duration-300 absolute bottom-3 md:bottom-4 ${isActive ? 'opacity-0 translate-y-2' : 'opacity-100 text-gray-500 hover:text-gray-300'}`}>
            {label}
        </span>

        {/* 
            خط نشانگر پایین (Bottom Indicator)
            جایگزین خط بالا شد
        */}
        {isActive && (
            <div className="absolute bottom-2 w-5 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full shadow-[0_0_10px_#a855f7] animate-fade-in"></div>
        )}

      </button>
    );
  };

  return (
    <>
      {/* 
        دکمه تغییر زبان (شناور در بالا)
        مکان آن بر اساس زبان تغییر میکند
      */}
      <div className={`fixed top-6 z-50 ${lang === 'fa' ? 'left-6' : 'right-6'}`}>
         <button
            onClick={onToggleLang}
            className="flex items-center gap-2 px-4 py-2 bg-[#360E46]/80 backdrop-blur-md hover:bg-[#58246d] text-white border border-purple-500/30 rounded-full transition-all duration-300 shadow-lg font-bold group hover:shadow-[0_0_15px_rgba(88,36,109,0.5)]"
          >
            <Globe size={18} className="group-hover:rotate-180 transition-transform duration-500"/>
            {t.changeLang}
          </button>
      </div>

      {/* 
         نوار ناوبری پایین صفحه (Bottom Navigation)
         طراحی جدید: کپسول شناور شیشه ای
      */}
      <div className="fixed bottom-4 left-0 right-0 z-50 px-2 flex justify-center pointer-events-none">
        {/* کانتینر منو */}
        <nav className="pointer-events-auto bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.9)] flex items-center justify-between px-1 py-1 gap-0 w-[96%] max-w-lg overflow-visible">
           
           {renderNavButton('home', Home, t.menu.home)}
           {renderNavButton('skills', Cpu, t.menu.skills)}
           
           {/* دکمه وسط ویژه (درباره من) */}
           {/* این دکمه کمی متفاوت است و بالاتر قرار میگیرد */}
           <div className="relative -mt-6 mx-1 group shrink-0">
              {/* افکت Glow پشت دکمه وسط */}
              <div className={`absolute inset-0 bg-[#360E46] rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-500 ${activeTab === 'about' ? 'opacity-80 animate-pulse' : ''}`}></div>
              
              <button 
                onClick={() => setActiveTab('about')} 
                className={`relative w-16 h-16 flex flex-col items-center justify-center bg-[#15051b] rounded-full border-2 shadow-2xl transition-all duration-300 ${activeTab === 'about' ? 'border-purple-400 scale-110 -translate-y-2' : 'border-[#360E46] hover:border-purple-500 hover:scale-105'}`}
              >
                  <User size={28} className={`transition-colors duration-300 ${activeTab === 'about' ? 'text-white' : 'text-gray-300'}`} />
              </button>
           </div>

           {renderNavButton('contact', MessageCircle, t.menu.contact)}
           {renderNavButton('personality', BrainCircuit, t.menu.personality)}

        </nav>
      </div>
    </>
  );
};

export default Navbar;
