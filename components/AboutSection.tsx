import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Translation } from '../types';
import { Terminal, Maximize2, Minimize2, X } from 'lucide-react';

interface AboutSectionProps {
  t: Translation;
  lang: 'en' | 'fa';
  id?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ t, lang, id }) => {
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-process text to separate lines and bold segments
  const parsedLines = useMemo(() => {
    return t.aboutText.split('\n').map(line => {
       const segments = line.split(/(\*\*.*?\*\*)/g).filter(s => s !== "").map(segment => {
         if (segment.startsWith('**') && segment.endsWith('**')) {
           return { text: segment.slice(2, -2), bold: true };
         }
         return { text: segment, bold: false };
       });
       return segments;
    });
  }, [t.aboutText]);

  // Calculate total plain characters including newlines
  const totalLength = useMemo(() => {
    return parsedLines.reduce((acc, line) => {
      const lineLen = line.reduce((lAcc, seg) => lAcc + seg.text.length, 0);
      return acc + lineLen + 1; // +1 for newline
    }, 0);
  }, [parsedLines]);

  // Reset typing when language changes
  useEffect(() => {
    setCharIndex(0);
    setIsTyping(true);
  }, [lang, t.aboutText]);

  // Typing logic
  useEffect(() => {
    if (charIndex < totalLength) {
      const timeout = setTimeout(() => {
        let delay = 20; 
        if (Math.random() > 0.9) delay += 30;
        setCharIndex((prev) => prev + 1);
      }, 20); 

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [charIndex, totalLength]);

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current && isTyping) {
       const element = containerRef.current;
       element.scrollTop = element.scrollHeight;
    }
  }, [charIndex, isTyping]);


  // Render Function
  const renderContent = () => {
    let globalCursorTracker = 0;
    
    return parsedLines.map((line, lineIdx) => {
        const lineLength = line.reduce((acc, seg) => acc + seg.text.length, 0);
        
        if (globalCursorTracker > charIndex) return null;

        let lineLocalCursor = 0;
        const renderedSegments = line.map((segment, segIdx) => {
            const segmentStartGlobal = globalCursorTracker + lineLocalCursor;
            
            // If the text hasn't reached this segment yet
            if (charIndex < segmentStartGlobal) {
                lineLocalCursor += segment.text.length;
                return null;
            }

            // Calculate how much of this segment to show
            const charsToShow = Math.min(segment.text.length, charIndex - segmentStartGlobal);
            const textToShow = segment.text.slice(0, charsToShow);
            
            lineLocalCursor += segment.text.length;

            if (segment.bold) {
                return <span key={segIdx} className="text-pink-400 font-black drop-shadow-[0_0_5px_rgba(244,114,182,0.5)]">{textToShow}</span>;
            }
            return <span key={segIdx} className="text-gray-300">{textToShow}</span>;
        });

        const isCurrentLine = charIndex >= globalCursorTracker && charIndex < globalCursorTracker + lineLength + 1; // +1 for newline consideration
        
        globalCursorTracker += lineLength + 1; // Move tracker to next line start

        return (
            <div key={lineIdx} className="mb-4 min-h-[1.5em] relative block break-words leading-relaxed">
               {renderedSegments}
               {/* 
                  Fix for RTL Cursor: 
                  Use a zero-width relative span so the absolute cursor stays exactly at the end 
                  without forcing a line break or layout shift in RTL/Mixed text.
               */}
               {isTyping && isCurrentLine && (
                 <span className="relative inline-block w-0 h-0 align-middle">
                    <span className={`absolute top-0 -mt-5 block w-2.5 h-6 bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7] ${lang === 'fa' ? 'right-0' : 'left-0'}`}></span>
                 </span>
               )}
            </div>
        );
    });
  };

  return (
    // Height Calculation: 100dvh (Total Viewport) - 80px (Top padding/Header area) - 96px (Bottom Nav + Margins) = ~176px offset
    // Using calc(100dvh - 180px) to be safe and ensure it sits nicely above the navbar.
    <div id={id} className="w-full max-w-4xl mx-auto px-2 h-full flex flex-col justify-center">
      
      <div className="relative group perspective-1000 h-[calc(100dvh-180px)]">
        
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 animate-gradient-xy"></div>
        
        {/* Terminal Window */}
        <div className="relative bg-[#0d0211] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300 h-full" dir="ltr">
          
          {/* Header - Always LTR */}
          <div className="bg-[#1a0524] px-4 py-3 flex items-center justify-between border-b border-white/5 select-none sticky top-0 z-20 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 shadow-[0_0_5px_#ef4444] transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 shadow-[0_0_5px_#eab308] transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 shadow-[0_0_5px_#22c55e] transition-colors" />
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 opacity-60">
              <Terminal size={12} />
              <span>ali_givshadi ~ about-me</span>
            </div>

            <div className="hidden md:flex gap-3 text-gray-600">
                <Minimize2 size={14}/>
                <Maximize2 size={14}/>
                <X size={14}/>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-[1px] bg-gray-800 relative z-20 shrink-0">
             <div 
               className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
               style={{ width: `${Math.min(100, (charIndex / totalLength) * 100)}%` }}
             />
          </div>

          {/* Text Body */}
          <div 
            ref={containerRef}
            className="p-6 md:p-8 font-mono text-base md:text-lg overflow-y-auto relative scroll-smooth flex-grow"
            dir={lang === 'fa' ? 'rtl' : 'ltr'}
          > 
             {/* Scanline Effect */}
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

             <div className="relative z-0 pb-10">
                <div className="flex flex-col">
                    {renderContent()}
                </div>
                
                {/* Final Prompt */}
                {!isTyping && (
                  <div className={`mt-4 flex items-center text-green-500 font-bold select-none animate-fade-in ${lang === 'fa' ? 'flex-row-reverse' : 'flex-row'}`} dir="ltr">
                     {lang === 'fa' ? (
                        <>
                           <span className="inline-block w-2.5 h-5 bg-gray-400 align-middle animate-pulse ms-2"></span>
                           <span className="text-purple-400 ms-2">~</span>
                           <span className="text-green-500">←</span>
                        </>
                     ) : (
                        <>
                            <span className="mr-2">➜</span>
                            <span className="text-purple-400 mr-2">~</span>
                            <span className="inline-block w-2.5 h-5 bg-gray-400 align-middle animate-pulse"></span>
                        </>
                     )}
                  </div>
                )}
             </div>
          </div>

          {/* Footer Status */}
          <div className="bg-[#1a0524]/50 px-4 py-1 flex justify-between items-center text-[10px] text-gray-500 font-mono border-t border-white/5 mt-auto shrink-0">
              <span>{isTyping ? 'TYPING...' : 'READY'}</span>
              <span>UTF-8</span>
              <span>CHARS: {charIndex} / {totalLength}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutSection;