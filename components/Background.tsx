import React from 'react';

const Background: React.FC = () => {
  return (
    // لایه پس زمینه فیکس شده کل صفحه
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#0f0214]">
      
      {/* گرادینت رنگی روی پس زمینه سیاه */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#360E46]/40 via-transparent to-black pointer-events-none" />
      
      {/* 
         توپ های رنگی متحرک (Blob)
         این ها با انیمیشن CSS در فایل index.html حرکت میکنند
      */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-brand rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      {/* پترن نویز برای ایجاد بافت */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
    </div>
  );
};

export default Background;