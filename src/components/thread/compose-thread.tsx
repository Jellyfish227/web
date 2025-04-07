import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/ui/notification";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useTypewriter } from "@/lib/useTypewriter";

interface ComposeThreadProps {
  username: string;
  userImage?: string;
  onSubmit: (content: string) => void | Promise<void>;
  typePlaceholder?: boolean;
  placeholderText?: string;
}

export function ComposeThread({ 
  username, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userImage, 
  onSubmit, 
  typePlaceholder = false, 
  placeholderText = "this is a placeholder" 
}: ComposeThreadProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [userTyped, setUserTyped] = useState(false);
  const [placeholderStyle, setPlaceholderStyle] = useState({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the typewriter effect for the placeholder
  const { displayText, isTyping, isDone } = useTypewriter(
    typePlaceholder ? placeholderText : "",
    70,
    700
  );

  // Calculate the position of the placeholder to match where the real placeholder would be
  useEffect(() => {
    if (textareaRef.current && containerRef.current && typePlaceholder) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (!textareaRef.current) return;
        
        // Get textarea styles
        const styles = window.getComputedStyle(textareaRef.current);
        
        setPlaceholderStyle({
          top: styles.paddingTop,
          left: styles.paddingLeft,
          fontFamily: styles.fontFamily,
          fontSize: styles.fontSize,
          lineHeight: styles.lineHeight,
        });
      }, 100);
    }
  }, [typePlaceholder]);

  // If typePlaceholder is enabled, set the content after typing animation is done
  useEffect(() => {
    if (typePlaceholder && isDone && !userTyped) {
      setContent(displayText);
    }
  }, [typePlaceholder, displayText, isDone, userTyped]);

  // Reset state when component mounts or remounts (important for dialog reuse)
  useEffect(() => {
    setContent("");
    setIsSubmitting(false);
    setShowNotification(false);
    setUserTyped(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    
    if (!content.trim()) return;

    setIsSubmitting(true);
    
    try {
      const result = onSubmit(content);
      
      // Check if onSubmit returns a Promise
      if (result instanceof Promise) {
        await result;
      }
      
      setContent("");
      setShowNotification(true);
      setUserTyped(false);
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    setContent(e.target.value);
    setUserTyped(true);
  };

  return (
    <div className="border-b border-gray-700 p-4 bg-gray-800">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <UserAvatar username={username} />
          </div>
          <div ref={containerRef} className="flex-1 min-w-0 relative">
            <textarea
              ref={textareaRef}
              className="w-full bg-gray-800 border-none resize-none outline-none text-sm placeholder-gray-400 text-white focus:ring-0 p-0"
              placeholder=""
              rows={3}
              value={content}
              onChange={handleChange}
              disabled={isSubmitting || (typePlaceholder && isTyping)}
              onClick={(e) => e.stopPropagation()} // Prevent dialog close
              aria-label="Thread content"
            />
            {typePlaceholder && isTyping && !userTyped ? (
              <div 
                className="absolute text-sm text-gray-400 pointer-events-none"
                style={placeholderStyle}
              >
                {displayText}
                <span className="inline-block w-1 h-4 bg-gray-400 ml-0.5 animate-blink"></span>
              </div>
            ) : !content && !isTyping ? (
              <div 
                className="absolute text-sm text-gray-400 pointer-events-none"
                style={placeholderStyle}
              >
                Start a thread...
              </div>
            ) : null}
            <div className="flex justify-between items-center mt-3">
              <div className="text-sm text-gray-400">
                {280 - content.length} characters remaining
              </div>
              <Button 
                type="submit" 
                disabled={!content.trim() || isSubmitting}
                isLoading={isSubmitting}
                onClick={(e) => e.stopPropagation()} // Prevent dialog close
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      <Notification
        message="Thread posted successfully!"
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
} 