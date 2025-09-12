"use client";

import { useEffect, useState, useRef } from "react";
import { Transition } from "@mantine/core";
import { twMerge } from "tailwind-merge";

interface BottomSheetProps {
  children: React.ReactNode;
  height?: string; // ví dụ: "50%", "400px", "auto"
  minHeight?: string; // chiều cao tối thiểu khi thu gọn, ví dụ: "20vh", "24vh"
  title?: string;
  showHandle?: boolean;
  draggable?: boolean; // cho phép kéo lên/xuống
}

export function BottomSheet({
  children,
  height = "50%",
  minHeight = "24vh",
  title,
  showHandle = true,
  draggable = true,
}: BottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragStartHeight, setDragStartHeight] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Drag handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!draggable) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
    setDragStartHeight(isExpanded ? 100 : 20); // percentage
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!draggable) return;

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartY - clientY;
    const threshold = 50; // pixels

    if (deltaY > threshold && !isExpanded) {
      setIsExpanded(true);
    } else if (deltaY < -threshold && isExpanded) {
      setIsExpanded(false);
    }
  };

  const handleDragEnd = () => {
    if (!draggable) return;
    // Reset drag state
  };

  return (
    <>
      {/* Sheet - Always visible */}
      <div
        ref={sheetRef}
        style={{
          height: draggable
            ? isExpanded
              ? "90vh"
              : minHeight
            : height === "auto"
            ? "auto"
            : height,
          maxHeight: height === "auto" ? "90vh" : undefined,
          transition: draggable ? "height 0.3s ease-out" : undefined,
        }}
        className={twMerge(
          "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-lg",
          "flex flex-col",
          height === "auto" ? "max-h-[90vh]" : ""
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "bottom-sheet-title" : undefined}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
      >
        {/* Handle bar */}
        {showHandle && (
          <div
            className={twMerge(
              "mx-auto mt-3 h-1.5 w-12 rounded-full bg-gray-300",
              draggable ? "cursor-grab active:cursor-grabbing" : ""
            )}
            onTouchStart={handleDragStart}
            onMouseDown={handleDragStart}
          />
        )}

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 pb-2">
            <h2
              id="bottom-sheet-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
          </div>
        )}

        {/* Content */}
        <div
          className={twMerge(
            "flex-1 overflow-y-auto",
            title ? "px-0 pb-4" : "p-0"
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
}
