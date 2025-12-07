import React, { useState, useEffect, useRef } from 'react';
import { Translation, PersonalityCategory } from '../types';
import TypewriterText from './TypewriterText';
import { BrainCircuit } from 'lucide-react';

// Sub-component for individual card logic
const PersonalityCard: React.FC<{ 
  category: PersonalityCategory; 
  startAnimation: boolean; 
  onComplete: () => void;
}> = ({ category, startAnimation, onComplete }) => {
  const [showCard, setShowCard] = useState(false);
  const [titleDone, setTitleDone] = useState(false);
  const notifiedRef = useRef(false);

  // Trigger card appearance immediately when signaled
  useEffect(() => {
    if (startAnimation) {
      setShowCard(true);
    }
  }, [startAnimation]);

  // Handle sequence completion (Notify parent when this card is fully done)
  useEffect(() => {
    if (titleDone && !notifiedRef.current) {
      // Title is done. Traits start appearing with stagger.
      // We calculate roughly when the last trait finishes its entry animation.
      // Traits delay = index * 200ms
      // Animation duration ~ 1200ms
      // We wait for the flow to feel complete before triggering the next card.
      const traitsCount = category.traits.length;
      const totalAnimationTime = (traitsCount * 200) + 600; // Wait for most smoke to clear
      
      const timer = setTimeout(() => {
        notifiedRef.current = true;
        onComplete();
      }, totalAnimationTime);
      
      return () => clearTimeout(timer);
    }
  }, [titleDone, category.traits.length, onComplete]);

  return (
    <div 
      className={`group relative h-full transition-all duration-700 ${showCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {/* Background Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-b from-brand to-purple-800 rounded-2xl blur opacity-20 group-hover:opacity-60 transition duration-500"></div>
      
      {/* Card Body */}
      <div className="relative h-full bg-[#120518] border border-white/10 p-6 rounded-2xl hover:border-white/30 transition-colors duration-300 flex flex-col overflow-hidden">
        
        {/* Category Title */}
        <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 border-b border-white/10 pb-3 min-h-[32px]">
           {showCard && (
              <TypewriterText 
                text={category.title} 
                speed={40} 
                onComplete={() => setTitleDone(true)}
              />
           )}
        </h4>
        
        {/* Traits List - Smoke Effect */}
        <div className="space-y-4 flex-grow">
          {titleDone && category.traits.map((trait, tIdx) => (
            <div 
              key={tIdx} 
              className="flex flex-col opacity-0 animate-smoke-reveal"
              style={{ animationDelay: `${tIdx * 200}ms` }} // Staggered smoke effect inside card
            >
              <div className="flex justify-between items-baseline">
                <span className="text-gray-400 text-sm font-medium">{trait.label}</span>
                
                {trait.subValue && (
                  <span className="text-xs text-brand-light font-bold uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(88,36,109,0.3)]">
                    {trait.subValue}
                  </span>
                )}
              </div>
              <span className="text-white font-semibold text-lg mt-1">
                 {trait.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

interface PersonalitySectionProps {
  t: Translation;
  id?: string;
}

const PersonalitySection: React.FC<PersonalitySectionProps> = ({ t, id }) => {
  const [mainTitleFinished, setMainTitleFinished] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleCardComplete = (index: number) => {
      // When card `index` finishes, start card `index + 1`
      if (index === activeCardIndex) {
          setActiveCardIndex(prev => prev + 1);
      }
  };

  return (
    <div id={id} className="w-full max-w-6xl mx-auto px-4 mt-4 mb-20">
       
       {/* Main Section Title */}
       <div className="flex items-center justify-center gap-3 mb-12">
        <BrainCircuit className="text-pink-400" size={32} />
        <h3 className="text-3xl font-bold text-center text-white min-h-[40px]">
          <TypewriterText 
            text={t.personalityTitle} 
            speed={60} 
            cursor 
            onComplete={() => setMainTitleFinished(true)}
          />
        </h3>
      </div>
      
      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.personality.map((category, idx) => (
          <PersonalityCard 
            key={idx} 
            category={category} 
            // Only start if main title is done AND it's this card's turn (or passed)
            // But practically we only animate "in" when index matches activeCardIndex
            startAnimation={mainTitleFinished && idx <= activeCardIndex}
            onComplete={() => handleCardComplete(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalitySection;