import { FC, useState } from "react";

export interface TextInputProps {
  placeholder: string;
  unit: string;
  value: string;
  setValue: (value: string) => void;
}

export const TextInput: FC<TextInputProps> = ({
  placeholder,
  unit,
  value,
  setValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const displayedValue =
    unit === "ft/in" ? formatFtInFromDigits(value ?? "") : value ?? "";
  const isActive = isFocused || displayedValue.length > 0;
  return (
    <div className="bg-transparent flex flex-col items-center justify-center w-2/3">
      <div className="flex items-baseline gap-2 w-full justify-center">
        <input
          placeholder={placeholder}
          value={displayedValue}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            const raw = e.target.value;
            const digitsOnly = raw.replace(/\D/g, "");
            const limited =
              unit === "ft/in" ? digitsOnly.slice(0, 3) : digitsOnly;
            setValue(limited);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          size={Math.max(displayedValue.length, placeholder.length, 1)}
          className="text-center text-[36px] font-[700] leading-[36px] bg-transparent outline-none border-none transition-colors text-[#2D3142]"
          style={{
            width: "auto",
            caretColor: isFocused ? "#3A79D8" : "#2D3142",
          }}
        />
        <span className="font-[400] text-[16px] leading-[24px] text-[#59617A]">
          {unit}
        </span>
      </div>

      <div
        style={{
          marginTop: 8,
          height: 2,
          width: "100%",
          backgroundColor: isActive ? "#3A79D8" : "#2A3342",
        }}
      />
    </div>
  );
};

function formatFtInFromDigits(value: string): string {
  const digits = (value ?? "").replace(/\D/g, "").slice(0, 3);
  if (digits.length === 0) return "";
  const feetChar = digits.charAt(0);
  if (feetChar === "0") return "";
  const feet = feetChar;
  const inchDigits = digits.slice(1);
  let inchesDisplay = "";
  if (inchDigits.length > 0) {
    let inchesNum = parseInt(inchDigits, 10);
    if (!isNaN(inchesNum)) {
      if (inchesNum > 11) inchesNum = 11;
      if (inchesNum < 0) inchesNum = 0;
      inchesDisplay = inchesNum.toString();
    }
  }
  if (inchesDisplay === "") {
    return feet;
  }
  return `${feet}'${inchesDisplay}`;
}
