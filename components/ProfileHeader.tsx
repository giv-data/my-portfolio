import React from 'react';
import { Translation, Language } from '../types';

// =====================================================================
// راهنمای تغییر عکس پروفایل و لوگو (IMAGE CONFIGURATION)
// =====================================================================

/**
 * راهنمای قرار دادن عکس لوکال:
 * 1. عکس پروفایل و لوگوی خود را در پوشه 'public' پروژه قرار دهید (یا ایمپورت کنید).
 * 2. نام فایل را در متغیرهای زیر جایگزین کنید.
 */

// 1. عکس پروفایل (Profile Picture)
// مثال: اگر عکس شما در پوشه public با نام 'me.jpg' است، بنویسید: "/me.jpg"
// یا اگر از ایمپورت استفاده میکنید: import Me from './me.jpg'; و اینجا بنویسید: Me
const PROFILE_IMAGE_SRC = "https://picsum.photos/400/400?grayscale";

// 2. عکس لوگو (Brand Logo)
// اگر میخواهید جای حرف "G" لوگوی خودتان باشد، آدرس آن را در متغیر زیر بنویسید.
// اگر این متغیر خالی باشد ("")، همان حرف G رنگی نمایش داده میشود.
// مثال: "/logo.png"
const BRAND_LOGO_SRC = ""; 

// =====================================================================

interface HeaderProps {
  t: Translation;
  lang: Language;
}

// Updated Hero Design for Profile Header
export const ProfileHeader: React.FC<HeaderProps> = ({ t, lang }) => {
  return (
    // mt-16: Increased from mt-12 to avoid overlap with language button
    // flex-row: In LTR -> Text Left, Image Right. In RTL -> Text Right, Image Left (Standard RTL flow).
    <div className="flex flex-row items-center justify-center w-full px-4 gap-4 md:gap-8 animate-fade-in mt-16 md:mt-20 transition-all duration-700 ease-in-out">
      
      {/* Name and Role */}
      <div className="flex flex-col flex-1 space-y-2 items-center text-center transition-all duration-700 ease-in-out order-1">
         {/* Increased Text Size: text-3xl mobile, up to 7xl desktop */}
         <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap">
          {t.name}
        </h1>
        <div className="h-1 w-16 md:w-32 bg-purple-500 rounded-full my-1"></div>
        {/* Increased Role Text Size */}
        <p className="text-purple-200 text-xs xs:text-sm sm:text-base md:text-xl font-bold tracking-[0.15em] uppercase opacity-90 whitespace-nowrap">
          {t.role}
        </p>
      </div>

      {/* Profile Image with dual rings */}
      <div className="relative group shrink-0 transition-all duration-700 ease-in-out order-2">
          <div className="absolute -inset-2 md:-inset-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse"></div>
          
          {/* Increased Image Size: w-36 mobile */}
          <div className="relative w-36 h-36 xs:w-40 xs:h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-1 bg-gradient-to-tr from-[#360E46] to-pink-500 shadow-2xl">
             <div className="w-full h-full rounded-full bg-black overflow-hidden border-2 md:border-4 border-[#0f0214]">
                 <img 
                   src={PROFILE_IMAGE_SRC} 
                   alt={t.name} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
             </div>
          </div>
      </div>
      
    </div>
  );
};

// Updated Brand Header - Single Line & Centered - Larger Text
export const BrandHeader: React.FC = () => {
  return (
    <div className="flex flex-row items-center justify-center w-full gap-3 opacity-90 hover:opacity-100 transition-opacity">
        {/* Logo Box or Custom Image */}
        {BRAND_LOGO_SRC ? (
            // اگر عکس لوگو تنظیم شده باشد
            <img 
                src={BRAND_LOGO_SRC} 
                alt="Brand Logo" 
                className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
            />
        ) : (
            // اگر عکس لوگو تنظیم نشده باشد (حالت پیش فرض)
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#360E46] to-purple-800 flex items-center justify-center border border-white/10 shadow-lg">
               <span className="font-black text-white text-sm md:text-base">G</span>
            </div>
        )}
        
        {/* Text Content */}
        <div className="flex items-baseline gap-2">
             {/* Increased Brand Font Size */}
             <h2 className="text-xl md:text-2xl font-bold text-gray-200 tracking-widest">
                Giv<span className="text-purple-500">Data</span>
             </h2>
             <span className="text-gray-500 text-xs md:text-sm">|</span>
             <p className="text-[10px] md:text-xs text-gray-400 font-mono tracking-wide">EST. 2025</p>
        </div>
    </div>
  );
};

export default ProfileHeader;