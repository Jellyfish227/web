"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  id: string;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function ToggleSwitch({
  id,
  label,
  checked = false,
  onChange,
  className,
}: ToggleSwitchProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        id={id}
        onClick={handleChange}
        className={cn(
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
          isChecked ? "bg-white" : "bg-gray-700"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out",
            isChecked ? "translate-x-5 bg-gray-900" : "translate-x-0 bg-gray-400"
          )}
        />
      </button>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-200 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  );
} 