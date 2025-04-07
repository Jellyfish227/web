"use client";

import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { useState } from "react";
import { generateUniqueId } from "@/data/initial-threads";
import { Thread } from "@/types/thread";

// Default user info
const currentUser = {
  username: "yourusername",
  userImage: "/images/user-avatar.jpg", // This will point to the uploaded image
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [threads, setThreads] = useState<Thread[]>([]);

  const handleCreateThread = (content: string) => {
    // Simulate API delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newThread: Thread = {
          id: generateUniqueId(),
          username: currentUser.username,
          userImage: currentUser.userImage,
          content,
          createdAt: "now",
          likes: 0,
          replies: 0,
          reposts: 0,
        };
        
        setThreads([newThread, ...threads]);
        
        // Dispatch a custom event that the page component can listen for
        const event = new CustomEvent("thread:created", { detail: newThread });
        window.dispatchEvent(event);
        
        resolve();
      }, 500); // 500ms delay to simulate API call
    });
  };

  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <div className="flex">
          <Sidebar 
            username={currentUser.username} 
            userImage={currentUser.userImage}
            onCreateThread={handleCreateThread}
          />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
