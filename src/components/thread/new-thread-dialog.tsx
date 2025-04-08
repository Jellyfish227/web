"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PenSquare } from "lucide-react";
import { ComposeThread } from "./compose-thread";
import { useState, useEffect } from "react";
import { AppConfig } from "@/config/app-config";

interface NewThreadDialogProps {
  username: string;
  userImage?: string;
  onSubmit: (content: string) => void | Promise<void>;
  autoOpen?: boolean; // Allow prop override of config
}

export function NewThreadDialog({ 
  username, 
  userImage, 
  onSubmit,
  autoOpen 
}: NewThreadDialogProps) {
  const [open, setOpen] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);
  
  // Determine if auto-open should be enabled
  const shouldAutoOpen = autoOpen !== undefined ? autoOpen : AppConfig.autoOpenNewThreadDialog;

  // Open dialog automatically on component mount if auto-open is enabled
  useEffect(() => {
    if (!shouldAutoOpen) return;
    
    // Short delay to ensure component is fully rendered
    const timer = setTimeout(() => {
      setOpen(true);
      setAutoOpened(true);
    }, 800);

    return () => clearTimeout(timer);
  }, [shouldAutoOpen]);

  const handleSubmit = async (content: string) => {
    try {
      // Call the parent onSubmit function
      const result = onSubmit(content);
      
      // If it's a promise, wait for it to resolve
      if (result instanceof Promise) {
        await result;
      }
      
      // Close the dialog after successful submission
      setTimeout(() => {
        setOpen(false);
      }, 1000); // Close after the notification shows
      
      return result;
    } catch (error) {
      console.error("Error submitting thread:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      // Only allow programmatic changes to override auto-opening once
      if (!newOpen && autoOpened) {
        setAutoOpened(false);
      }
      setOpen(newOpen);
    }}>
      <DialogTrigger asChild>
        <Button className="w-full gap-2">
          <PenSquare className="h-4 w-4" />
          <span>New Thread</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create a new thread</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ComposeThread
            username={username}
            userImage={userImage}
            onSubmit={handleSubmit}
            typePlaceholder={true}
            placeholderText="爲什麼網上的人這麼討厭女生？"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 