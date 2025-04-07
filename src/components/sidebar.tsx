"use client";

import Link from "next/link";
import { Home, Search, Heart, User } from "lucide-react";
import { NewThreadDialog } from "@/components/thread/new-thread-dialog";
import { UserAvatar } from "@/components/ui/user-avatar";
import { AppConfig } from "@/config/app-config";
import { Settings } from "@/components/settings";

interface SidebarProps {
  username: string;
  userImage?: string;
  onCreateThread: (content: string) => void | Promise<void>;
}

export function Sidebar({ username, userImage, onCreateThread }: SidebarProps) {
  const navItems = [
    { icon: <Home className="h-6 w-6" />, label: "Home", href: "/" },
    { icon: <Search className="h-6 w-6" />, label: "Search", href: "/search" },
    { icon: <Heart className="h-6 w-6" />, label: "Activity", href: "/activity" },
    { icon: <User className="h-6 w-6" />, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="h-screen border-r border-gray-700 w-[250px] py-4 px-3 flex flex-col bg-gray-800">
      <div className="mb-6 pl-2 flex items-center justify-between">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 text-white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.471 21c-.98 0-1.44-.724-1.44-1.436 0-.715.48-1.424 1.44-1.424.947 0 1.415.71 1.415 1.424 0 .712-.468 1.436-1.415 1.436Zm2.486-3.172c0 .712.45 1.428 1.456 1.428.85 0 1.32-.416 1.638-.864l.895.458c-.425.597-1.15 1.243-2.545 1.243-1.648 0-2.986-1.025-2.986-3.107v-3.307c0-2.082 1.338-3.102 2.986-3.102 1.397 0 2.123.641 2.547 1.24l-.895.454c-.32-.448-.788-.857-1.64-.857-1.006 0-1.455.712-1.455 1.424v5.99Zm8.133-7.956c1.648 0 2.985 1.025 2.985 3.102v3.307c0 2.082-1.337 3.107-2.985 3.107-1.648 0-2.986-1.025-2.986-3.107v-3.307c0-2.077 1.338-3.102 2.986-3.102Zm0 1.837c-1.006 0-1.455.712-1.455 1.424v2.99c0 .712.45 1.429 1.455 1.429 1.004 0 1.454-.717 1.454-1.429v-2.99c0-.712-.45-1.424-1.454-1.424Zm-9.033-5.502c0 1.045-.826 1.88-1.866 1.88-1.035 0-1.859-.835-1.859-1.88 0-1.042.824-1.88 1.859-1.88 1.04 0 1.866.838 1.866 1.88Z"
            fill="currentColor"
          />
        </svg>
        <Settings />
      </div>
      <nav className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-gray-700 transition-colors text-white"
              >
                {item.icon}
                <span className="text-lg">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-6 px-4 mb-4 flex items-center gap-3">
        <UserAvatar username={username} size={36} />
        <div className="font-medium">{username}</div>
      </div>
      <div className="px-2">
        <NewThreadDialog 
          username={username}
          userImage={userImage}
          onSubmit={onCreateThread}
          autoOpen={AppConfig.autoOpenNewThreadDialog}
        />
      </div>
    </div>
  );
} 