import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursor?: boolean;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 40, 
  delay = 0, 
  className = "",
  cursor = false,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset state when text changes to re-trigger animation
    setDisplayedText('');
    setStarted(false);
    setIsTyping(false);
    
    const startTimeout = setTimeout(() => {
      setStarted(true);
      setIsTyping(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay, text]);

  useEffect(() => {
    if (!started) return;
    
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else {
        if (isTyping) {
            setIsTyping(false);
            if (onComplete) onComplete();
        }
    }
  }, [started, displayedText, text, speed, isTyping, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && isTyping && <span className="animate-pulse ml-0.5">|</span>}
    </span>
  );
};

export default TypewriterText;