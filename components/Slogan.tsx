import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const Slogan: React.FC = () => {
  const [charCount, setCharCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Multi-line token definitions
  const tokens = [
    // Line 1
    { text: "if", color: "text-pink-500 font-bold" },
    { text: " ", color: "text-gray-300" },
    { text: "UR Data", color: "text-blue-300" },
    { text: " ", color: "text-gray-300" },
    { text: ">", color: "text-pink-500 font-bold" },
    { text: " ", color: "text-gray-300" },
    { text: "UR Money", color: "text-blue-300" },
    { text: ":", color: "text-yellow-500" },
    
    // Line 2 (Indent 4 spaces)
    { text: "\n    ", color: "text-gray-300" }, 
    { text: "print", color: "text-yellow-400 font-bold" },
    { text: "(", color: "text-purple-400" },
    { text: "\"\"\"", color: "text-green-400" },

    // Line 3 (Indent 4 spaces)
    { text: "\n    ", color: "text-gray-300" },
    { text: "You control the future.", color: "text-green-400 font-bold tracking-wider" },

    // Line 4 (Indent 4 spaces)
    { text: "\n    ", color: "text-gray-300" },
    { text: "\"\"\"", color: "text-green-400" },
    { text: ")", color: "text-purple-400" }
  ];

  const totalLength = tokens.reduce((acc, t) => acc + t.text.length, 0);

  // Start typing animation on mount
  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setStarted(true);
    }, 500);
    return () => clearTimeout(startTimeout);
  }, []);

  // Typing logic
  useEffect(() => {
    if (!started) return;

    if (charCount < totalLength) {
      const timeout = setTimeout(() => {
        setCharCount(prev => prev + 1);
      }, 40); // Typing speed
      return () => clearTimeout(timeout);
    }
  }, [started, charCount, totalLength]);
  
  // Helper to render tokens
  const renderTokens = () => {
    let current = 0;
    return tokens.map((token, idx) => {
        if (current >= charCount) return null;
        
        const remainingForToken = charCount - current;
        // Don't slice if remaining is greater than token length
        const textToRender = token.text.slice(0, remainingForToken);
        
        current += token.text.length;
        
        return <span key={idx} className={token.color}>{textToRender}</span>;
    });
  };

  const isTyping = started && charCount < totalLength;

  const Cursor = () => (
    <span className="inline-block w-2 md:w-3 h-5 md:h-8 bg-purple-500 ml-0.5 align-middle animate-pulse shadow-[0_0_8px_#a855f7]"></span>
  );

  return (
    // Always force LTR for code block
    // max-w-[98%]: Wider container
    <div dir="ltr" className={`w-full max-w-5xl max-w-[98%] mx-auto px-1 mt-6 relative group perspective-1000 ${isTyping ? 'animate-typing-shake' : ''}`}>
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-gradient-xy"></div>
      
      {/* Main Terminal Container */}
      <div className="relative bg-[#0d0211] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
         
         {/* Window Header */}
         <div className="bg-[#1a0524] px-3 py-2 md:px-4 md:py-3 flex items-center justify-between border-b border-white/5 select-none sticky top-0 z-20">
            <div className="flex items-center gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_#eab308]"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"></div>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-gray-500 opacity-60">
                <Terminal size={12} className="md:w-3 md:h-3" />
                <span>main.py</span>
            </div>

            <div className="w-10"></div> {/* Spacer */}
         </div>

         {/* Progress Bar */}
         <div className="w-full h-[2px] bg-gray-800 relative z-20">
             <div 
               className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-100 ease-out"
               style={{ width: `${Math.min(100, (charCount / totalLength) * 100)}%` }}
             />
         </div>

        {/* Content Body */}
        <div className="p-4 md:p-10 relative flex items-center overflow-hidden bg-[#0d0211] min-h-[140px] md:min-h-[250px]">
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] opacity-20"></div>

            <div className="relative z-20 flex w-full overflow-x-auto no-scrollbar justify-center">
                {/* Line Numbers */}
                <div className="flex flex-col text-right text-gray-700 font-mono text-sm md:text-3xl leading-relaxed select-none pr-3 border-r border-gray-800 mr-3">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                </div>

                {/* Python Code */}
                {/* Text size: text-sm for mobile (bigger) */}
                <div className="font-mono text-sm xs:text-base md:text-3xl leading-relaxed whitespace-pre font-bold text-left tracking-wide">
                    {renderTokens()}
                    {started && <Cursor />}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Slogan;