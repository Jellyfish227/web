"use client";

import { useState, useEffect } from "react";
import { ThreadPost } from "@/components/thread/thread-post";
import { initialThreads, generateUniqueId } from "@/data/initial-threads";
import { Thread } from "@/types/thread";

export default function Home() {
  // Create an expanded array with all threads repeated 3 times
  const [allThreads] = useState<Thread[]>(() => {
    const repeatedThreads: Thread[] = [];
    
    // Repeat all threads 3 times
    for (let i = 0; i < 3; i++) {
      initialThreads.forEach(thread => {
        repeatedThreads.push({
          ...thread,
          id: `${thread.id}-rep-${i}` // Ensure unique IDs for each repetition
        });
      });
    }
    
    // Add placeholder thread at the end
    repeatedThreads.push({
      id: generateUniqueId(),
      username: "placeholder",
      userImage: "",
      content: "I am a fucking placeholder",
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
  
  const currentUser = {
    username: "yourusername",
    userImage: "/images/user-avatar.jpg",
  };

  // Load threads sequentially with a delay
  useEffect(() => {
    let threadIndex = 0;
    const totalThreads = allThreads.length;

    // Function to add the next thread
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
        
        // If there are more threads to show, schedule the next one
        if (threadIndex < totalThreads) {
          setTimeout(addNextThread, 700); // 700ms delay
        } else {
          setLoadingComplete(true);
        }
      }
    };

    // Start the sequence
    addNextThread();

    // Cleanup function
    return () => {
      // No specific cleanup needed
    };
  }, [allThreads]);

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
      // Check if thread with this ID already exists to prevent duplicates
      setVisibleThreads(prevThreads => {
        if (prevThreads.some(thread => thread.id === newThread.id)) {
          return prevThreads; // Thread already exists, don't add it
        }
        
        // Mark this thread as new for animation
        setNewThreadIds(prev => {
          const updated = new Set(prev);
          updated.add(newThread.id);
          return updated;
        });
        
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
        {visibleThreads.map((thread) => (
          <ThreadPost 
            key={thread.id} 
            {...thread} 
            isNew={newThreadIds.has(thread.id)}
          />
        ))}
        
        {!loadingComplete && visibleThreads.length > 0 && (
          <div className="p-4 text-center text-gray-400">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
            <p className="mt-2">Loading more threads...</p>
          </div>
        )}
      </div>
    </div>
  );
}
