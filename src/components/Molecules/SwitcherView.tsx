import { useEffect, useState } from "react";

export interface SwitcherViewProps {
  units: string[]; // ví dụ: ["kg", "lbs"]
  currentUnit: string;
  onSelectUnit: (unit: string) => void;
}

export function SwitcherView({
  units,
  currentUnit,
  onSelectUnit,
}: SwitcherViewProps) {
  const [activeIndex, setActiveIndex] = useState(units.indexOf(currentUnit));

  useEffect(() => {
    setActiveIndex(units.indexOf(currentUnit));
  }, [currentUnit, units]);

  const optionWidth = 56; // mỗi nút rộng 56px
  const switchWidth = optionWidth * units.length;

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative h-8 rounded-full bg-white border border-gray-300 shadow-inner overflow-hidden"
        style={{ width: switchWidth }}
      >
        {/* Nút highlight trượt */}
        <div
          className="absolute top-0 left-0 h-8 rounded-full bg-[#2D3142] transition-transform duration-300 ease-in-out"
          style={{
            width: optionWidth,
            transform: `translateX(${activeIndex * optionWidth}px)`,
          }}
        />

        <div className="relative flex h-full">
          {units.map((unit, index) => {
            const isSelected = currentUnit === unit;
            return (
              <button
                key={unit}
                onClick={() => onSelectUnit(unit)}
                className={`w-[56px] h-8 text-[16px] font-[500] flex items-center justify-center z-10 transition-colors duration-300 ${
                  isSelected ? "text-white" : "text-[#A5A6BC]"
                }`}
              >
                {unit}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
