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
import { useState } from "react";

interface NewThreadDialogProps {
  username: string;
  userImage?: string;
  onSubmit: (content: string) => void | Promise<void>;
}

export function NewThreadDialog({ username, userImage, onSubmit }: NewThreadDialogProps) {
  const [open, setOpen] = useState(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
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
          />
        </div>
      </DialogContent>
    </Dialog>
  );
} 