import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 80, delay = 500) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [charIndex, setCharIndex] = useState(-1); // Start at -1 to properly handle first character

  useEffect(() => {
    // let startTimer: NodeJS.Timeout;
    let typingInterval: NodeJS.Timeout;
    
    // Reset when text changes
    setDisplayText('');
    setCharIndex(-1);
    setIsDone(false);
    
    // Initial delay before typing starts
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      
      // Type each character one by one
      typingInterval = setInterval(() => {
        setCharIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          
          if (nextIndex < text.length) {
            setDisplayText(text.substring(0, nextIndex + 1));
            return nextIndex;
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setIsDone(true);
            return prevIndex;
          }
        });
      }, speed);
    }, delay);
    
    return () => {
      clearTimeout(startTimer);
      clearInterval(typingInterval);
    };
  }, [text, speed, delay]);

  return { displayText, isTyping, isDone };
} 