import React, { useState, useEffect } from 'react';
import { Translation } from '../types';
import TypewriterText from './TypewriterText';
import { 
  Cpu, 
  Code2, 
  Database, 
  Cloud, 
  Terminal, 
  Globe, 
  Server, 
  Layout, 
  Zap,
  FileDown, // Import for Resume
  LucideIcon
} from 'lucide-react';

interface SkillsListProps {
  t: Translation;
  id?: string;
}

const getSkillIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('resume') || lowerName.includes('pdf') || lowerName.includes('رزومه')) return FileDown; // Resume Icon
  if (lowerName.includes('python') || lowerName.includes('code') || lowerName.includes('java')) return Code2;
  if (lowerName.includes('SQL') || lowerName.includes('sql') || lowerName.includes('داده')) return Database;
  // if (lowerName.includes('cloud') || lowerName.includes('aws') || lowerName.includes('ابری')) return Cloud;
  // if (lowerName.includes('react') || lowerName.includes('front') || lowerName.includes('فرانت')) return Layout;
  // if (lowerName.includes('back') || lowerName.includes('node') || lowerName.includes('بک')) return Server;
  // if (lowerName.includes('devops') || lowerName.includes('linux') || lowerName.includes('دواپس')) return Terminal;
  // if (lowerName.includes('web') || lowerName.includes('html')) return Globe;
  // if (lowerName.includes('learn') || lowerName.includes('ai') || lowerName.includes('یادگیری')) return BrainCircuitIcon;

  return Zap;
};

const BrainCircuitIcon = (props: any) => (
  <svg 
    {...props} 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 3 2.5 2.5 0 0 0-.22 3.48 2.5 2.5 0 0 0 .7 3.98 2.5 2.5 0 0 0 2.22 2.5 2.5 0 0 0 2.56 1.5 2.5 2.5 0 0 0 3 0 2.5 2.5 0 0 0 2.56-1.5 2.5 2.5 0 0 0 2.22-2.5 2.5 2.5 0 0 0 .7-3.98 2.5 2.5 0 0 0-.22-3.48 2.5 2.5 0 0 0-1.32-3 2.5 2.5 0 0 0-1.98-3 2.5 2.5 0 0 0-4.96.46Z"/>
    <path d="M12 12v.01"/>
  </svg>
);

interface SkillItemProps {
  skill: { name: string; link?: string; highlight?: boolean };
  Icon: LucideIcon | React.ElementType;
  startAnimation: boolean;
  onComplete: () => void;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill, Icon, startAnimation, onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [canType, setCanType] = useState(false);
  // Ref to ensure onComplete is called only once
  const completedRef = React.useRef(false);

  useEffect(() => {
    if (startAnimation) {
      setIsVisible(true);
      // Wait for the card fade-in/slide-up animation (approx 500ms) before typing
      const timer = setTimeout(() => {
        setCanType(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [startAnimation]);

  const handleTypeComplete = () => {
    if (!completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  };

  // Determine wrapper: <a> if link exists, otherwise <div>
  const Wrapper = skill.link ? 'a' : 'div';
  const wrapperProps = skill.link 
    ? { href: skill.link, target: '_blank', rel: 'noopener noreferrer' } 
    : {};

  return (
    <Wrapper 
      {...wrapperProps}
      className={`group relative w-full transition-all duration-700 ease-out transform block ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${skill.link ? 'cursor-pointer' : ''}`}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${skill.highlight ? 'from-yellow-400 to-green-500' : 'from-[#360E46] to-purple-500'} rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>
      
      {/* Card Body */}
      <div className={`relative flex items-center justify-between p-4 backdrop-blur-md border rounded-xl transition-all duration-300 ${
          skill.highlight 
            ? 'bg-[#1a1205]/90 border-yellow-500/40 hover:bg-[#2e2208]/90' 
            : 'bg-[#120518]/80 border-purple-500/20 hover:bg-[#360E46]/40'
      }`}>
        
        {/* Left: Icon and Name */}
        <div className="flex items-center gap-4">
          {/* Icon Box */}
          <div className={`p-2 rounded-lg shadow-inner transition-colors ${
              skill.highlight 
                ? 'bg-yellow-500/20 text-yellow-300 group-hover:text-white' 
                : 'bg-black/40 text-purple-300 group-hover:text-white'
          }`}>
            <Icon size={24} />
          </div>
          
          {/* Skill Name with Typewriter */}
          <span className={`font-bold text-lg tracking-wide min-w-[10px] ${
              skill.highlight 
                ? 'text-yellow-100 group-hover:text-white' 
                : 'text-gray-100 group-hover:text-white'
          }`}>
            {canType ? (
               <TypewriterText 
                text={skill.name} 
                speed={40} 
                onComplete={handleTypeComplete}
              />
            ) : (
              <span className="opacity-0">{skill.name}</span>
            )}
          </span>
        </div>

        {/* Right: Decorative Line or Download Icon */}
        <div className={`w-1 h-8 rounded-full transition-colors duration-300 ${
            skill.highlight 
                ? 'bg-yellow-500/50 group-hover:bg-yellow-400' 
                : 'bg-purple-500/20 group-hover:bg-purple-400'
        }`}></div>

      </div>
    </Wrapper>
  );
};

const SkillsList: React.FC<SkillsListProps> = ({ t, id }) => {
  const [titleFinished, setTitleFinished] = useState(false);
  const [activeSkillIndex, setActiveSkillIndex] = useState(-1);

  // Reset animation when language changes
  useEffect(() => {
    setTitleFinished(false);
    setActiveSkillIndex(-1);
  }, [t.skillsTitle]);

  const handleSkillComplete = (index: number) => {
      // Trigger the next skill in the list
      if (index === activeSkillIndex && index < t.skills.length - 1) {
          // Small buffer before starting next card for better pacing
          setTimeout(() => {
            setActiveSkillIndex(prev => prev + 1);
          }, 100);
      }
  };

  useEffect(() => {
    // Start first skill after title finishes
    if (titleFinished && activeSkillIndex === -1) {
        setTimeout(() => {
            setActiveSkillIndex(0);
        }, 200);
    }
  }, [titleFinished, activeSkillIndex]);

  return (
    <div id={id} className="w-full max-w-lg mx-auto px-4 mt-4 mb-20">
      
      {/* Section Title */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Cpu className="text-purple-400" size={32} />
        <h3 className="text-2xl md:text-3xl font-bold text-center text-white min-h-[40px]">
          <TypewriterText 
            text={t.skillsTitle} 
            speed={70} 
            cursor 
            onComplete={() => setTitleFinished(true)}
          />
        </h3>
      </div>

      {/* Skills List */}
      <div className="flex flex-col gap-4">
        {t.skills.map((skill, index) => {
          const Icon = getSkillIcon(skill.name);
          
          return (
            <SkillItem 
              key={`${skill.name}-${index}`}
              skill={skill}
              Icon={Icon}
              // Only start animation if title is finished and index is reached
              // Keeping previous items visible (index <= activeSkillIndex) is handled by component state once mounted true
              startAnimation={titleFinished && index <= activeSkillIndex} 
              onComplete={() => handleSkillComplete(index)}
            />
          );
        })}
      </div>

    </div>
  );
};

export default SkillsList;