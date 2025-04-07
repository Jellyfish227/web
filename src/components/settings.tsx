"use client";

import { useState, useEffect } from "react";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { AppConfig } from "@/config/app-config";
import { Settings as SettingsIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Settings() {
  const [autoOpen, setAutoOpen] = useState(AppConfig.autoOpenNewThreadDialog);
  const [isOpen, setIsOpen] = useState(false);

  // Update the config value when the toggle changes
  const handleAutoOpenChange = (checked: boolean) => {
    setAutoOpen(checked);
    
    // In a real app, this would persist the setting to localStorage or a backend
    // For now, we'll just update the in-memory config
    AppConfig.autoOpenNewThreadDialog = checked;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-white hover:bg-gray-700"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Dialog Options</h3>
            <ToggleSwitch
              id="auto-open-dialog"
              label="Auto-open new thread dialog on page load"
              checked={autoOpen}
              onChange={handleAutoOpenChange}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 