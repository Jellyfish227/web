import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/ui/notification";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ComposeThreadProps {
  username: string;
  userImage?: string;
  onSubmit: (content: string) => void | Promise<void>;
}

export function ComposeThread({ username, userImage, onSubmit }: ComposeThreadProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Reset state when component mounts or remounts (important for dialog reuse)
  useEffect(() => {
    setContent("");
    setIsSubmitting(false);
    setShowNotification(false);
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
    } catch (error) {
      console.error("Failed to create thread:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation(); // Prevent event bubbling
    setContent(e.target.value);
  };

  return (
    <div className="border-b border-gray-700 p-4 bg-gray-800">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <UserAvatar username={username} />
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              className="w-full bg-gray-800 border-none resize-none outline-none text-sm placeholder-gray-400 text-white focus:ring-0 p-0"
              placeholder="Start a thread..."
              rows={3}
              value={content}
              onChange={handleChange}
              disabled={isSubmitting}
              onClick={(e) => e.stopPropagation()} // Prevent dialog close
            />
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