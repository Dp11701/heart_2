"use client";
import "@/styles/Common.css";
import { SwitcherView } from "../Molecules/SwitcherView";
import { TextInputView } from "../Molecules/TextInputView";
import ContinueButton from "../ContinueButton";
import { useEffect, useState } from "react";
import { SelectInputValueSchema } from "../models/WelcomeConfig";
import { ValueConfigItem } from "../models/ValueConfig";
import { UserInfo } from "../models/UserInfo";
import { TextInput } from "../Molecules/TextInput";

export interface SelectHeightScreenProps {
  config: SelectInputValueSchema;
  heightConfig: ValueConfigItem[];
  userInfo: UserInfo;
  onContinue: (value: number, unit: string) => void;
}

export function SelectHeightScreen(
  props: SelectHeightScreenProps
): React.JSX.Element {
  const [unit, setUnit] = useState(props.heightConfig[1].unit);
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(props.heightConfig[0].max);
  const [minValue, setMinValue] = useState(props.heightConfig[0].min);
  const [idealValue, setIdealValue] = useState(props.heightConfig[0].ideal);
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Separate values for each unit
  const [cmValue, setCmValue] = useState(150);
  const [inchValue, setInchValue] = useState(59);

  function formatInchesToFtIn(totalInches: number): string {
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}`;
  }

  function parseFtInToInches(inputDigits: string): number | null {
    const digits = inputDigits.replace(/\D/g, "").slice(0, 3);
    if (digits.length === 0) return null;
    const feetChar = digits.charAt(0);
    if (feetChar === "0") return null;
    const feet = parseInt(feetChar, 10);
    const inchDigits = digits.slice(1);
    let inches = 0;
    if (inchDigits.length > 0) {
      const n = parseInt(inchDigits, 10);
      if (!isNaN(n)) {
        inches = Math.max(0, Math.min(n, 11));
      }
    }
    return feet * 12 + inches;
  }

  useEffect(() => {
    switch (unit) {
      case props.heightConfig[1].unit: // inch (ft/in entry, store as inches)
        setMaxValue(props.heightConfig[1].max);
        setMinValue(props.heightConfig[1].min);
        setIdealValue(props.heightConfig[1].ideal);
        setValue(inchValue);
        setInputValue(inchValue.toString());
        checkValid(
          inchValue.toString(),
          props.heightConfig[1].min,
          props.heightConfig[1].max,
          false
        );
        break;
      case props.heightConfig[0].unit: // cm
        setMaxValue(props.heightConfig[0].max);
        setMinValue(props.heightConfig[0].min);
        setIdealValue(props.heightConfig[0].ideal);
        setValue(cmValue);
        setInputValue(cmValue.toString());
        checkValid(
          cmValue.toString(),
          props.heightConfig[0].min,
          props.heightConfig[0].max,
          false
        );
        break;
    }
  }, [unit]);

  function checkValid(
    stringNumber: string,
    minValue: number,
    maxValue: number,
    reloadInputText: boolean = false
  ) {
    if (unit === "ft/in") {
      const inches = parseFtInToInches(stringNumber);
      if (inches !== null && inches >= minValue && inches <= maxValue) {
        setValue(inches);
        setInchValue(inches);
        setIsValid(true);
        return;
      }
      setValue(0);
      setIsValid(false);
      if (reloadInputText) setInputValue("");
      return;
    }

    const number = Number(stringNumber);
    if (isFinite(number) && number >= minValue && number <= maxValue) {
      setValue(number);
      setCmValue(number);
      setIsValid(true);
    } else {
      setValue(0);
      setIsValid(false);
      if (reloadInputText) {
        setInputValue("");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-between bg-transparent h-full w-full pb-10  overflow-hidden">
      <div className="flex flex-col items-center justify-between w-full h-full gap-4 pb-4">
        <div className="flex flex-col items-center justify-between w-full mb-10">
          <span className="title-text">{props.config.title}</span>
          <SwitcherView
            currentUnit={unit}
            units={props.heightConfig.map((e) => e.unit)}
            onSelectUnit={(newUnit) => {
              setUnit(newUnit);
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-between w-full h-full">
          {/* <TextInputView
            unit={unit}
            min={minValue}
            ideal={idealValue}
            max={maxValue}
            currentValue={inputValue}
            onChangeValue={(newValue: string) => {
              setInputValue(newValue);
              const numValue = Number(newValue);
              if (unit === "cm") {
                setCmValue(numValue);
              } else {
                setInchValue(numValue);
              }
              checkValid(newValue, minValue, maxValue);
            }}
            useVerticalRulerPicker={true}
            gender={props.userInfo.gender as "Male" | "Female" | undefined}
          /> */}
          <TextInput
            placeholder={
              unit === "ft/in"
                ? formatInchesToFtIn(idealValue)
                : idealValue.toString()
            }
            unit={unit}
            value={inputValue}
            setValue={(newValue: string) => {
              setInputValue(newValue);
              checkValid(newValue, minValue, maxValue);
            }}
          />
        </div>
      </div>

      <ContinueButton
        disabled={!isValid}
        text={props.config.continue}
        onClick={() => {
          props.onContinue(value, unit);
        }}
      />
    </div>
  );
}
