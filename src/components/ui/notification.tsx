import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function Notification({
  message,
  isOpen,
  onClose,
  duration = 3000,
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to finish
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-full py-2 px-4 flex items-center gap-2 shadow-lg border border-gray-700 transition-all duration-300",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <Check className="h-4 w-4 text-green-400" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
} 