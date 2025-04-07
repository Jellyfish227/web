"use client";

import Image from "next/image";
import { Avatar, AvatarFallback } from "./avatar";

interface UserAvatarProps {
  username: string;
  className?: string;
  size?: number;
}

export function UserAvatar({ username, className, size = 40 }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <Image 
        src="/images/user-avatar.jpg" 
        alt={username} 
        width={size} 
        height={size}
        className="rounded-full object-cover"
        priority
      />
      <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
} 