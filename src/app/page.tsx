"use client";

import { useState, useEffect } from "react";
import { ThreadPost } from "@/components/thread/thread-post";

// Helper function to generate unique IDs
const generateUniqueId = () => `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Mock data for initial threads
const initialThreads = [
  {
    id: generateUniqueId(),
    username: "janedoe",
    userImage: "https://i.pravatar.cc/150?img=1",
    content: "Just launched my new website! Check it out and let me know what you think. #webdev #design",
    createdAt: "2h",
    likes: 24,
    replies: 5,
    reposts: 2,
  },
  {
    id: generateUniqueId(),
    username: "johnsmith",
    userImage: "https://i.pravatar.cc/150?img=2",
    content: "I've been working on a new project using React and TypeScript. The type safety is amazing, but there's definitely a learning curve. Anyone else have experience with TypeScript?",
    createdAt: "4h",
    likes: 56,
    replies: 12,
    reposts: 4,
  },
  {
    id: generateUniqueId(),
    username: "sarahparker",
    userImage: "https://i.pravatar.cc/150?img=3",
    content: "Just got back from an amazing hike in the mountains. Nature is the best remedy for burnout. 🏔️",
    createdAt: "6h",
    likes: 102,
    replies: 8,
    reposts: 15,
  },
];

export default function Home() {
  const [threads, setThreads] = useState(initialThreads);
  const currentUser = {
    username: "yourusername",
    userImage: "/images/user-avatar.jpg",
  };

  // Listen for thread created events from the layout
  useEffect(() => {
    const handleThreadCreated = (event: CustomEvent) => {
      const newThread = event.detail;
      // Check if thread with this ID already exists to prevent duplicates
      setThreads(prevThreads => {
        if (prevThreads.some(thread => thread.id === newThread.id)) {
          return prevThreads; // Thread already exists, don't add it
        }
        return [newThread, ...prevThreads];
      });
    };

    window.addEventListener("thread:created", handleThreadCreated as EventListener);

    return () => {
      window.removeEventListener("thread:created", handleThreadCreated as EventListener);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <header className="sticky top-0 z-10 border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm p-4">
        <h1 className="text-xl font-bold text-white">Home</h1>
      </header>

      <div>
        {threads.map((thread) => (
          <ThreadPost key={thread.id} {...thread} />
        ))}
      </div>
    </div>
  );
}
