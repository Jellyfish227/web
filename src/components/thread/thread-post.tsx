import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Thread } from "@/types/thread";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ThreadPostProps extends Thread {
  isNew?: boolean;
}

export function ThreadPost({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  username,
  userImage,
  content,
  createdAt,
  likes,
  replies,
  reposts,
  isNew = false,
}: ThreadPostProps) {
  const isCurrentUser = username === "yourusername";
  const [animate, setAnimate] = useState(isNew);
  
  // Reset animation state after it completes
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1000); // Match this to animation duration
      
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div 
      className={cn(
        "border-b border-gray-700 p-4 bg-gray-800 relative overflow-hidden transition-all duration-500",
        animate ? "animate-thread-appear" : ""
      )}
    >
      {animate && (
        <div className="absolute inset-0 bg-white/5 animate-thread-highlight" />
      )}
      <div className="flex gap-3 relative z-10">
        <div className="flex-shrink-0">
          {isCurrentUser ? (
            <UserAvatar username={username} />
          ) : (
            <Avatar>
              {userImage ? (
                <AvatarImage src={userImage} alt={username} />
              ) : (
                <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <Link href={`/profile/${username}`} className="font-semibold hover:underline text-white">
              {username}
            </Link>
            <div className="text-gray-400 text-sm">· {createdAt}</div>
          </div>
          <div className="mt-2 text-sm text-gray-200 whitespace-pre-wrap">
            {content}
          </div>
          <div className="flex mt-3 gap-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500 hover:bg-gray-700">
              <Heart className="h-4 w-4" />
              {likes > 0 && <span className="ml-1 text-xs">{likes}</span>}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-blue-500 hover:bg-gray-700">
              <MessageCircle className="h-4 w-4" />
              {replies > 0 && <span className="ml-1 text-xs">{replies}</span>}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-500 hover:bg-gray-700">
              <Repeat2 className="h-4 w-4" />
              {reposts > 0 && <span className="ml-1 text-xs">{reposts}</span>}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 