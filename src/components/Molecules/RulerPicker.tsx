import React, { useRef, useState, useEffect } from "react";

interface RulerPickerProps {
  min: number;
  max: number;
  value: number;
  unit?: string;
  onChange?: (val: number) => void;
  orientation?: "horizontal" | "vertical";
}

const ITEM_WIDTH = 24;

export const RulerPicker: React.FC<RulerPickerProps> = ({
  min,
  max,
  value,
  unit = "lbs",
  onChange,
  orientation = "horizontal",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(value);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const PADDING_COUNT = 9;

  useEffect(() => {
    if (!scrollRef.current) return;
    const centerOffset =
      orientation === "horizontal"
        ? scrollRef.current.clientWidth / 2
        : scrollRef.current.clientHeight / 2;
    const left = (value - min) * ITEM_WIDTH;
    if (orientation === "horizontal") {
      scrollRef.current.scrollTo({
        left: left - centerOffset + ITEM_WIDTH / 2,
      });
    } else {
      scrollRef.current.scrollTo({
        top: left - centerOffset + ITEM_WIDTH / 2,
      });
    }
  }, [value, min, orientation]);

  const snapToNearest = () => {
    if (!scrollRef.current) return;
    const centerOffset =
      orientation === "horizontal"
        ? scrollRef.current.clientWidth / 2
        : scrollRef.current.clientHeight / 2;
    const scrollPos =
      orientation === "horizontal"
        ? scrollRef.current.scrollLeft
        : scrollRef.current.scrollTop;
    const index = Math.round(
      (scrollPos + centerOffset - ITEM_WIDTH / 2) / ITEM_WIDTH
    );
    const newValue = min + index;
    const left = (newValue - min) * ITEM_WIDTH;
    if (orientation === "horizontal") {
      scrollRef.current.scrollTo({
        left: left - centerOffset + ITEM_WIDTH / 2,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scrollTo({
        top: left - centerOffset + ITEM_WIDTH / 2,
        behavior: "smooth",
      });
    }
    if (newValue >= min && newValue <= max && newValue !== current) {
      setCurrent(newValue);
      onChange?.(newValue);
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const centerOffset =
      orientation === "horizontal"
        ? scrollRef.current.clientWidth / 2
        : scrollRef.current.clientHeight / 2;
    const scrollPos =
      orientation === "horizontal"
        ? scrollRef.current.scrollLeft
        : scrollRef.current.scrollTop;
    const index = Math.round(
      (scrollPos + centerOffset - ITEM_WIDTH / 2) / ITEM_WIDTH
    );
    const newValue = min + index;
    if (newValue >= min && newValue <= max && newValue !== current) {
      setCurrent(newValue);
      onChange?.(newValue);
    }
    // Debounce snap
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      snapToNearest();
    }, 120);
  };

  // Also snap on mouse/touch end for best UX
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onEnd = () => snapToNearest();
    el.addEventListener("touchend", onEnd);
    el.addEventListener("mouseup", onEnd);
    return () => {
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("mouseup", onEnd);
    };
  }, [orientation, snapToNearest]);

  return (
    <div className="w-full max-w-md mx-auto select-none">
      {/* Giá trị hiển thị */}
      <div className="text-center text-[28px] leading-[32px] font-semibold text-[#2D3142] mb-2">
        {current}
        <span className="text-[20px] leading-[32px] text-[#2D3142] font-[500] ml-1">
          {unit}
        </span>
      </div>

      {/* Ruler */}
      <div
        className={`relative ${
          orientation === "horizontal" ? "w-full h-28" : "h-96 w-20"
        }`}
      >
        {/* Vạch center */}
        {orientation === "horizontal" ? (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20">
            <div className="w-[3px] h-20 bg-[#2D3142]" />
          </div>
        ) : (
          <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 z-20 flex justify-center">
            <div className="h-[3px] w-16 bg-[#2D3142]" />
          </div>
        )}

        {/* Scrollable ruler */}
        <div
          ref={scrollRef}
          className={`no-scrollbar relative h-full bg-transparent ${
            orientation === "horizontal"
              ? "overflow-x-scroll"
              : "overflow-y-scroll"
          }`}
          onScroll={handleScroll}
          style={{
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
        >
          <div
            className={`relative bg-transparent flex items-end ${
              orientation === "horizontal"
                ? "h-full flex-row"
                : "w-full flex-col items-center"
            }`}
            style={{
              width:
                orientation === "horizontal"
                  ? (max - min + 1) * ITEM_WIDTH
                  : undefined,
              height:
                orientation === "vertical"
                  ? (max - min + 1) * ITEM_WIDTH
                  : undefined,
            }}
          >
            {/* Spacer đầu */}

            {Array.from({ length: max - min + 1 }).map((_, i) => {
              const val = min + i;
              const isTenth = val % 10 === 0;
              return (
                <div
                  key={val}
                  className={`flex flex-col items-center justify-end ${
                    orientation === "horizontal"
                      ? ""
                      : "flex-row items-end justify-center"
                  }`}
                  style={{
                    width:
                      orientation === "horizontal" ? ITEM_WIDTH : undefined,
                    height: orientation === "vertical" ? ITEM_WIDTH : undefined,
                  }}
                >
                  {isTenth && (
                    <div
                      className={`text-xs text-gray-400 mt-1 ${
                        orientation === "horizontal" ? "" : "ml-2 mb-0"
                      }`}
                    >
                      {val}
                    </div>
                  )}
                  <div
                    className={`${
                      isTenth
                        ? orientation === "horizontal"
                          ? "w-[2px] h-12 bg-[#A5A6BC]"
                          : "h-[2px] w-12 bg-[#A5A6BC]"
                        : orientation === "horizontal"
                        ? "w-[1px] h-8 bg-[#A5A6BC]"
                        : "h-[1px] w-8 bg-[#A5A6BC]"
                    }`}
                  />
                </div>
              );
            })}
            {/* Spacer cuối */}
          </div>
        </div>
      </div>
    </div>
  );
};
