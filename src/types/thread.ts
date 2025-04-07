/**
 * Thread interface represents a single thread post in the application
 */
export interface Thread {
  /** Unique identifier for the thread */
  id: string;
  
  /** Username of the thread author */
  username: string;
  
  /** URL to the user's avatar image */
  userImage?: string;
  
  /** Text content of the thread */
  content: React.ReactNode;
  
  /** Human-readable time since the thread was created */
  createdAt: string;
  
  /** Number of likes the thread has received */
  likes: number;
  
  /** Number of replies to the thread */
  replies: number;
  
  /** Number of times the thread has been reposted */
  reposts: number;
} 