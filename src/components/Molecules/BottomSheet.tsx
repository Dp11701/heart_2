"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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
  const [dragDeltaY, setDragDeltaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const startedExpandedRef = useRef<boolean>(false);
  const startedFromContentAtTopRef = useRef<boolean>(false);
  const [collapsedHeightPx, setCollapsedHeightPx] = useState<number>(0);
  const [expandedHeightPx, setExpandedHeightPx] = useState<number>(0);

  // Compute pixel heights from minHeight and target 90vh
  useEffect(() => {
    const computeHeights = () => {
      const viewportH = typeof window !== "undefined" ? window.innerHeight : 0;
      const parseToPx = (val: string): number => {
        if (!val) return 0;
        if (val.endsWith("vh"))
          return Math.round((parseFloat(val) / 100) * viewportH);
        if (val.endsWith("px")) return Math.round(parseFloat(val));
        // fallback percentage or other: treat as vh percentage
        if (val.endsWith("%"))
          return Math.round((parseFloat(val) / 100) * viewportH);
        return Math.round(parseFloat(val)) || Math.round(0.24 * viewportH);
      };
      setCollapsedHeightPx(parseToPx(minHeight));
      setExpandedHeightPx(Math.round(0.9 * viewportH));
    };
    computeHeights();
    window.addEventListener("resize", computeHeights);
    return () => window.removeEventListener("resize", computeHeights);
  }, [minHeight]);

  // Drag handlers
  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (!draggable) return;
    // Prevent browser scroll during touch drag
    if ("preventDefault" in e) {
      try {
        e.preventDefault();
      } catch {}
    }

    // If expanded, allow drag start from header/handle, or from content only if scrolled to top
    if (isExpanded) {
      const target = (e as any).target as Node | null;
      const inHeaderOrHandle = !!(
        (headerRef.current && target && headerRef.current.contains(target)) ||
        (handleRef.current && target && handleRef.current.contains(target))
      );
      const inContent = !!(
        contentRef.current &&
        target &&
        contentRef.current.contains(target)
      );
      const contentAtTop = contentRef.current
        ? contentRef.current.scrollTop <= 0
        : false;
      if (!inHeaderOrHandle && !(inContent && contentAtTop)) return;
      startedFromContentAtTopRef.current = inContent && contentAtTop;
    } else {
      startedFromContentAtTopRef.current = false;
    }

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragStartY(clientY);
    setDragDeltaY(0);
    setIsDragging(true);
    startedExpandedRef.current = isExpanded;
  };

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!draggable || !isDragging) return;
    // Prevent browser scroll during touch drag
    if ("preventDefault" in e) {
      try {
        e.preventDefault();
      } catch {}
    }

    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    let delta = dragStartY - clientY;
    // If drag started while collapsed, allow only upward pull (ignore downward)
    if (!startedExpandedRef.current && delta < 0) delta = 0;
    setDragDeltaY(delta);
  };

  const handleDragEnd = () => {
    if (!draggable || !isDragging) return;
    // Asymmetric thresholds: open 80px up, close 160px down
    const openThreshold = 80;
    const closeThreshold = 160;

    if (dragDeltaY > openThreshold && !startedExpandedRef.current) {
      setIsExpanded(true);
    } else if (dragDeltaY < -closeThreshold && startedExpandedRef.current) {
      // Close immediately when dragging down past threshold while expanded
      setIsExpanded(false);
    }

    setIsDragging(false);
    setDragDeltaY(0);
  };

  // Lock body scroll when expanded
  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const prev = body.style.overflow;
    if (isExpanded) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = prev || "";
      body.style.overflow = "";
    }
    return () => {
      body.style.overflow = "";
    };
  }, [isExpanded]);

  // No arming step; allow immediate close when dragging down from top

  return (
    <>
      {/* Backdrop */}
      {draggable && isExpanded && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sheet - Always visible */}
      <motion.div
        ref={sheetRef}
        style={{
          height: draggable
            ? isExpanded
              ? expandedHeightPx
              : collapsedHeightPx
            : height === "auto"
            ? "auto"
            : height,
          maxHeight: height === "auto" ? "90vh" : undefined,
        }}
        animate={{
          height: draggable
            ? isExpanded
              ? expandedHeightPx
              : collapsedHeightPx
            : height === "auto"
            ? undefined
            : undefined,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
        className={twMerge(
          "fixed inset-x-0 bottom-0 z-50 rounded-t-2xl bg-white shadow-lg",
          "flex flex-col",
          height === "auto" ? "calc(100dvh - 170px)" : ""
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "bottom-sheet-title" : undefined}
        onClick={() => {
          if (draggable && !isExpanded) {
            setIsExpanded(true);
          }
        }}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
      >
        {/* Handle bar */}
        {showHandle && (
          <div className="w-full pt-2 pb-1">
            <div
              ref={handleRef}
              className={twMerge(
                "mx-auto h-2 w-16 rounded-full bg-gray-300",
                draggable
                  ? "cursor-grab active:cursor-grabbing select-none touch-none"
                  : ""
              )}
              aria-label="Drag handle"
            />
          </div>
        )}

        {/* Header */}
        {title && (
          <div
            ref={headerRef}
            className="flex items-center justify-between p-4 pt-2 pb-2 select-none"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
          >
            <h2
              id="bottom-sheet-title"
              className="text-lg font-semibold text-gray-900"
            >
              {title}
            </h2>
            <button
              type="button"
              aria-label="Close"
              className="ml-3 rounded p-2 text-gray-500 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => setIsExpanded(false)}
            >
              ×
            </button>
          </div>
        )}

        {/* Content */}
        <div
          className={twMerge(
            isExpanded
              ? "flex-1 overflow-y-auto"
              : "flex-1 overflow-hidden pointer-events-none touch-none",
            title ? "px-0 pb-4" : "p-0"
          )}
          ref={contentRef}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
}
