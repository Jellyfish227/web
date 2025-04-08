"use client";

import { useState, useEffect } from "react";
import { ThreadPost } from "@/components/thread/thread-post";
import { initialThreads, generateUniqueId } from "@/data/initial-threads";
import { Thread } from "@/types/thread";

export default function Home() {
  const [allThreads] = useState<Thread[]>(() => {
    const repeatedThreads: Thread[] = [];
    for (let i = 0; i < 2; i++) {
      initialThreads.forEach(thread => {
        repeatedThreads.push({
          ...thread,
          id: `${thread.id}-rep-${i}`
        });
      });
    }
    repeatedThreads.push({
      id: generateUniqueId(),
      username: "placeholder",
      userImage: "",
      content: (
        <span>
          I am a placeholder,{" "}
          <a 
            href="https://www.google.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'red', textDecoration: 'underline' }}
          >
            www.google.com
          </a>
        </span>
      ),
      createdAt: new Date().toLocaleDateString(),
      likes: 0,
      replies: 0,
      reposts: 0
    });
    return repeatedThreads;
  });

  const [visibleThreads, setVisibleThreads] = useState<Thread[]>([]);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [newThreadIds, setNewThreadIds] = useState<Set<string>>(new Set());
  const [startLoading, setStartLoading] = useState(false); // New state to control loading

  const currentUser = {
    username: "yourusername",
    userImage: "/images/user-avatar.jpg",
  };

  // Load threads sequentially with a delay
  useEffect(() => {
    if (!startLoading) return; // Only start loading when the flag is true

    let threadIndex = 0;
    const totalThreads = allThreads.length;

    const addNextThread = () => {
      if (threadIndex < totalThreads) {
        const threadToAdd = allThreads[threadIndex];
        setVisibleThreads(prev => [threadToAdd, ...prev]);
        setNewThreadIds(prev => {
          const updated = new Set(prev);
          updated.add(threadToAdd.id);
          return updated;
        });

        threadIndex++;

        if (threadIndex < totalThreads) {
          setTimeout(addNextThread, 700); // 700ms delay
        } else {
          setLoadingComplete(true);
        }
      }
    };

    addNextThread();
  }, [startLoading, allThreads]);

  // Clear animation flags after some time
  useEffect(() => {
    if (newThreadIds.size > 0) {
      const timer = setTimeout(() => {
        setNewThreadIds(new Set());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [newThreadIds]);

  // Listen for thread created events from the layout
  useEffect(() => {
    const handleThreadCreated = (event: CustomEvent) => {
      const newThread = event.detail;

      setVisibleThreads(prevThreads => {
        if (prevThreads.some(thread => thread.id === newThread.id)) {
          return prevThreads;
        }

        setNewThreadIds(prev => {
          const updated = new Set(prev);
          updated.add(newThread.id);
          return updated;
        });

        return [newThread, ...prevThreads];
      });

      // Start loading initial threads 3 seconds after the new thread is added
      setTimeout(() => {
        setStartLoading(true);
      }, 3000); // 3000ms delay
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
        {visibleThreads.map((thread) => (
          <ThreadPost 
            key={thread.id} 
            {...thread} 
            isNew={newThreadIds.has(thread.id)}
          />
        ))}
      </div>
    </div>
  );
}