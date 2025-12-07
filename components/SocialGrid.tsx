import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { Translation } from '../types';
import { Share2 } from 'lucide-react';

interface SocialGridProps {
  t: Translation;
  id?: string;
}

const SocialGrid: React.FC<SocialGridProps> = ({ t, id }) => {
  return (
    // کانتینر اصلی شبکه های اجتماعی
    // تغییر: mt-16 به mt-2 کاهش یافت تا تایتل بالاتر بیاید
    <div id={id} className="w-full max-w-5xl mx-auto px-4 mt-2 mb-16">
       
       {/* تیتر بخش */}
       <div className="flex items-center justify-center gap-3 mb-10">
        <Share2 className="text-blue-400" size={32} />
        <h3 className="text-3xl font-bold text-center text-white">
          {t.socialsTitle}
        </h3>
      </div>
      
      {/* گرید بندی کارت ها: 2 ستون در موبایل، 3 ستون در دسکتاپ */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {SOCIAL_LINKS.map((link, index) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            // added opacity-0 initially for pop-in to work from 0
            className="group relative flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl transition-all duration-500 hover:bg-white/10 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand/20 opacity-0 animate-pop-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* 
                Periodic Lightning Effect (Automatic)
                Runs every 5 seconds, staggered by index.
            */}
            <div 
                className="absolute inset-0 -translate-x-full animate-lightning bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 pointer-events-none"
                style={{ animationDelay: `${index * 500}ms` }}
            ></div>

            {/* افکت تغییر رنگ پس زمینه هنگام هاور */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
              style={{ backgroundColor: link.color }} 
            />
            
            {/* آیکون شبکه اجتماعی */}
            <div className="relative z-10 p-3 rounded-full bg-white/5 mb-3 group-hover:bg-transparent transition-colors duration-500">
                <link.icon 
                size={32} 
                className="text-gray-300 group-hover:scale-110 transition-all duration-500"
                style={{ color: link.color }} 
                />
            </div>
            
            {/* نام شبکه اجتماعی (ترجمه شده) */}
            <span className="font-bold text-lg text-gray-200 group-hover:text-white transition-colors duration-300 z-10">
              {t.socialNames[link.id]}
            </span>
            
            {/* فلش کوچک گوشه کارت برای نشان دادن لینک خارجی */}
            <svg className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-50 transition-all duration-300 rtl:right-auto rtl:left-3 rtl:-scale-x-100 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialGrid;