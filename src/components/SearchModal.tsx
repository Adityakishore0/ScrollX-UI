"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on ESC key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md bg-neutral-900 text-white rounded-xl shadow-lg p-5"
      >
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Type a command or search..."
            className="w-full bg-transparent border-none outline-none text-lg px-2 placeholder-neutral-400"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 border-t border-neutral-700 pt-3">
          <p className="text-neutral-400 text-sm">Follow for updates</p>
          <button className="w-full flex items-center p-2 hover:bg-neutral-800 rounded-lg">
            Twitter @mannupaaji
          </button>
        </div>
        <div className="mt-3">
          <p className="text-neutral-400 text-sm">Installation</p>
          {[
            "Install Next.js",
            "Install Tailwind CSS",
            "Add utilities",
            "CLI",
          ].map((item) => (
            <button
              key={item}
              className="w-full flex items-center p-2 hover:bg-neutral-800 rounded-lg"
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
