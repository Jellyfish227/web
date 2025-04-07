import { Thread } from "@/types/thread";

// Helper function to generate unique IDs
export const generateUniqueId = () => `thread_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Mock data for initial threads
export const initialThreads: Thread[] = [
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
  // Adding 10 more threads
  {
    id: generateUniqueId(),
    username: "techguru",
    userImage: "https://i.pravatar.cc/150?img=5",
    content: "Unpopular opinion: Vim is still the best code editor in 2024. Fight me. 💻",
    createdAt: "1h",
    likes: 87,
    replies: 42,
    reposts: 12,
  },
  {
    id: generateUniqueId(),
    username: "designerlife",
    userImage: "https://i.pravatar.cc/150?img=7",
    content: "Design tip: White space isn't empty space. It's intentional breathing room that helps users process information. Don't be afraid to use it liberally!",
    createdAt: "3h",
    likes: 145,
    replies: 7,
    reposts: 28,
  },
  {
    id: generateUniqueId(),
    username: "coffeedev",
    userImage: "https://i.pravatar.cc/150?img=8",
    content: "Current status: Converting caffeine into code. ☕→💻\n\nWhat's your coding fuel of choice?",
    createdAt: "5h",
    likes: 54,
    replies: 19,
    reposts: 3,
  },
  {
    id: generateUniqueId(),
    username: "travelbug",
    userImage: "https://i.pravatar.cc/150?img=9",
    content: "Working remotely from Bali this month! The digital nomad life isn't always easy, but moments like this make it worth it. 🌴🏝️\n\n#remotework #digitalnomad",
    createdAt: "7h",
    likes: 231,
    replies: 26,
    reposts: 18,
  },
  {
    id: generateUniqueId(),
    username: "bookworm",
    userImage: "https://i.pravatar.cc/150?img=10",
    content: "Just finished 'Atomic Habits' by James Clear and it has completely changed how I think about productivity. Has anyone else read it? What did you think?",
    createdAt: "9h",
    likes: 67,
    replies: 15,
    reposts: 5,
  },
  {
    id: generateUniqueId(),
    username: "fitcoder",
    userImage: "https://i.pravatar.cc/150?img=11",
    content: "Reminder: Sitting is the new smoking. Get up and stretch every 30 minutes! Your future self will thank you.\n\n#developerhealth #ergonomics",
    createdAt: "12h",
    likes: 189,
    replies: 11,
    reposts: 42,
  },
  {
    id: generateUniqueId(),
    username: "artlover",
    userImage: "https://i.pravatar.cc/150?img=12",
    content: "Visited the new exhibition at MoMA yesterday. Contemporary art continues to challenge my perception of reality in the most unexpected ways. 🎨",
    createdAt: "14h",
    likes: 78,
    replies: 9,
    reposts: 4,
  },
  {
    id: generateUniqueId(),
    username: "musicproducer",
    userImage: "https://i.pravatar.cc/150?img=13",
    content: "After months of work, my new album is finally available on all streaming platforms! So grateful for everyone who supported this journey. 🎵 #newmusic #electronica",
    createdAt: "16h",
    likes: 143,
    replies: 32,
    reposts: 27,
  },
  {
    id: generateUniqueId(),
    username: "foodie",
    userImage: "https://i.pravatar.cc/150?img=14",
    content: "Made homemade ramen from scratch for the first time. The broth took 12 hours but it was absolutely worth it! 🍜 #foodporn #cooking",
    createdAt: "18h",
    likes: 210,
    replies: 23,
    reposts: 15,
  },
  {
    id: generateUniqueId(),
    username: "startupfounder",
    userImage: "https://i.pravatar.cc/150?img=15",
    content: "Big news! We just closed our Series A funding round. So proud of our team and excited for the next chapter of our journey. Hiring in design and engineering - DM if interested!",
    createdAt: "22h",
    likes: 298,
    replies: 47,
    reposts: 56,
  }
]; 