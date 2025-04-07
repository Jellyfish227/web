import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Send } from "lucide-react";
import Link from "next/link";
import { UserAvatar } from "@/components/ui/user-avatar";

interface ThreadPostProps {
  id: string;
  username: string;
  userImage?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: number;
  reposts: number;
}

export function ThreadPost({
  id,
  username,
  userImage,
  content,
  createdAt,
  likes,
  replies,
  reposts,
}: ThreadPostProps) {
  const isCurrentUser = username === "yourusername";

  return (
    <div className="border-b border-gray-700 p-4 bg-gray-800">
      <div className="flex gap-3">
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