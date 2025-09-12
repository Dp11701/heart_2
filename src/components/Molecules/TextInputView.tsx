import "@/styles/TextInputView.css";
import "@/styles/SelectAgeScreen.css";
import { CSSProperties, useEffect, useRef } from "react";

import { WheelNumberPicker } from "./WheelNumberPicker";
import { RulerPicker } from "./RulerPicker";
import { VerticalRulerPicker } from "./VerticalRulerPicker";

export interface TextInputViewProps {
  max: number;
  min: number;
  ideal: number;
  unit: string;
  currentValue: string;
  onChangeValue: (value: string) => void;
  textInputStyles?: CSSProperties;
  maxLength?: number;
  useWheelPicker?: boolean; // New prop to switch between input and wheel picker
  useRulerPicker?: boolean; // New prop to use ruler picker
  pickerOrientation?: "horizontal" | "vertical"; // Orientation for ruler picker
  useVerticalRulerPicker?: boolean; // New prop to use vertical ruler picker
  gender?: "Male" | "Female";
}

export function TextInputView(props: TextInputViewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!props.useWheelPicker) {
      inputRef.current?.focus();
      setTimeout(() => {
        inputRef.current?.focus();
      });
    }
  }, [inputRef, props.useWheelPicker]);

  // If wheel picker is enabled, use the new component
  if (props.useWheelPicker) {
    return (
      <div
        style={{
          alignContent: "center",
          textAlign: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <WheelNumberPicker
          max={props.max}
          min={props.min}
          ideal={props.ideal}
          unit={props.unit}
          currentValue={parseInt(props.currentValue) || props.ideal}
          onChangeValue={(value) => props.onChangeValue(value.toString())}
        />
      </div>
    );
  }
  if (props.useRulerPicker) {
    return (
      <div>
        <RulerPicker
          min={props.min}
          max={props.max}
          value={parseInt(props.currentValue) || props.ideal}
          unit={props.unit}
          onChange={(val) => props.onChangeValue(val.toString())}
          orientation={props.pickerOrientation || "horizontal"}
        />
      </div>
    );
  } else if (props.useVerticalRulerPicker) {
    return (
      <div className="flex flex-col items-center justify-between w-full h-full">
        <VerticalRulerPicker
          min={props.min}
          max={props.max}
          value={parseInt(props.currentValue) || props.ideal}
          unit={props.unit}
          onChange={(val) => props.onChangeValue(val.toString())}
          gender={props.gender || "Male"}
        />
      </div>
    );
  }

  // Original input implementation
  return (
    <div
      style={{
        alignContent: "center",
        textAlign: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="text-input-container">
          <input
            // ref={inputRef}
            autoFocus={true}
            value={props.currentValue}
            className={`text-input`}
            style={props.textInputStyles ?? {}}
            placeholder={props.ideal.toString()}
            maxLength={props.maxLength ?? 5}
            onChange={(e) => {
              props.onChangeValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                (e.target as any).blur?.(); // Bắt buộc mất focus → kích hoạt onBlur
              }
            }}
          />
          <span
            style={{
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {props.unit}
          </span>
        </div>

        <div
          style={{
            height: 1.5,
            backgroundColor: "#3A79D8",
          }}
        ></div>
      </div>
    </div>
  );
}
