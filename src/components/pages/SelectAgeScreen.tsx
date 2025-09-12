"use client";
import { JSX, useState } from "react";
import IdealView from "@/components/Molecules/IdealView";
import "@/styles/SelectAgeScreen.css";
import ContinueButton from "@/components/ContinueButton";
import { TextInputView } from "@/components/Molecules/TextInputView";
import { SelectInputValueSchema } from "@/components/models/WelcomeConfig";
import { ValueConfigItem } from "../models/ValueConfig";
import { TextInput } from "../Molecules/TextInput";

export interface SelectAgeScreenProps {
  config: SelectInputValueSchema;
  ageConfig: ValueConfigItem[];
  onContinue: (age: number) => void;
}

function SelectAgeScreen(props: SelectAgeScreenProps): JSX.Element {
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(props.ageConfig[0]?.max || 95);
  const [minValue, setMinValue] = useState(props.ageConfig[0]?.min || 20);
  const [idealValue, setIdealValue] = useState(props.ageConfig[0]?.ideal || 30);
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function checkValid(
    stringNumber: string,
    minValue: number,
    maxValue: number,
    reloadInputText: boolean = false
  ) {
    const number = parseInt(stringNumber);
    if (isFinite(number) && number >= minValue && number <= maxValue) {
      setValue(number);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        width: "100%",
        height: "auto",
        overscrollBehavior: "none",
      }}
      className="justify-between items-center pb-4 overflow-x-hidden overflow-y-hidden"
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <span className="title-text">{props.config.title}</span>
        <IdealView text={props.config.description || ""} />

        {/* <TextInputView
          min={minValue}
          ideal={idealValue}
          max={maxValue}
          currentValue={inputValue}
          textInputStyles={{ textAlign: "center" }}
          maxLength={2}
          onChangeValue={(newValue: string) => {
            setInputValue(newValue);
            checkValid(newValue, minValue, maxValue);
          }}
          useWheelPicker={true}
          unit="Years"
        /> */}
        <div className="flex flex-col h-[300px] w-full items-center justify-center">
          <TextInput
            placeholder={idealValue.toString()}
            unit="Years"
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
        text={props.config.continue || ""}
        onClick={() => {
          props.onContinue(value);
        }}
      />
    </div>
  );
}

export default SelectAgeScreen;
