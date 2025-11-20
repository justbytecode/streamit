"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const DropdownList = ({
  options,
  selectedOption,
  onOptionSelect,
  triggerElement,
}: DropdownListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        className="cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {triggerElement}
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <ul className="absolute right-0 top-12 z-20 flex w-48 flex-col gap-1 rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl">
            {options.map((option) => (
              <li
                key={option}
                className={cn(
                  "relative flex cursor-pointer items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:bg-pink-50 hover:text-pink-600",
                  {
                    "bg-pink-100 text-white hover:bg-pink-100 hover:text-white": 
                      selectedOption === option,
                  }
                )}
                onClick={() => handleOptionClick(option)}
              >
                <span>{option}</span>
                {selectedOption === option && (
                  <Image
                    src="/assets/icons/check.svg"
                    alt="Selected"
                    width={16}
                    height={16}
                    className="brightness-0 invert"
                  />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DropdownList;