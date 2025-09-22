"use client";
import "@/styles/Common.css";
import { useEffect, useState } from "react";

import { SelectInputValueSchema } from "../models/WelcomeConfig";
import { ValueConfigItem } from "../models/ValueConfig";
import { TextInputView } from "../Molecules/TextInputView";
import { BMIResult } from "../Molecules/BMIResult";
import ContinueButton from "../ContinueButton";
import { SwitcherView } from "../Molecules/SwitcherView";
import { TextInput } from "../Molecules/TextInput";
import { configKbIntro } from "@/utils/Constant";

export interface SelectWeightScreenProps {
  config: SelectInputValueSchema;
  weightConfig: ValueConfigItem[];
  userInfo: any; // Add userInfo prop
  onContinue: (value: number, unit: string) => void;
  constConfig: number;
}

export function SelectWeightScreen(
  props: SelectWeightScreenProps
): React.JSX.Element {
  const [unit, setUnit] = useState(props.weightConfig[1].unit);
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(props.weightConfig[0].max);
  const [minValue, setMinValue] = useState(props.weightConfig[0].min);
  const [idealValue, setIdealValue] = useState(props.weightConfig[0].ideal);
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const heightInCm =
    props.userInfo.heightUnit === "ft/in"
      ? props.userInfo.height * 2.54
      : props.userInfo.height;

  // Convert weight to kg for BMI calculation
  const weightInKg = unit === "lbs" ? value * 0.453592 : value;

  useEffect(() => {
    switch (unit) {
      case props.weightConfig[0].unit:
        let newValueInKg = value * 0.453592;
        setMaxValue(props.weightConfig[0].max);
        setMinValue(props.weightConfig[0].min);
        setIdealValue(props.weightConfig[0].ideal);
        setInputValue(newValueInKg.toFixed(0));
        checkValid(
          newValueInKg.toFixed(0),
          props.weightConfig[0].min,
          props.weightConfig[0].max,
          true
        );
        break;
      case props.weightConfig[1].unit:
        setMaxValue(props.weightConfig[1].max);
        setMinValue(props.weightConfig[1].min);
        setIdealValue(props.weightConfig[1].ideal);
        let newValueInLbs = value * 2.20462;
        setInputValue(newValueInLbs.toFixed(0));
        checkValid(
          newValueInLbs.toFixed(0),
          props.weightConfig[1].min,
          props.weightConfig[1].max,
          true
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
    const number = Number(stringNumber);

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
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
      className="justify-between items-center pb-[10vh] overflow-y-auto overflow-x-hidden"
    >
      <div className="flex flex-col items-center justify-center">
        <span className="title-text">{props.config.title}</span>

        <div className="flex justify-center items-center">
          <SwitcherView
            currentUnit={unit}
            units={props.weightConfig.map((e) => e.unit)}
            onSelectUnit={(newUnit) => {
              setUnit(newUnit);
            }}
          />
        </div>

        <div style={{ height: 26 }}></div>

        {props.constConfig === configKbIntro.defaultKbIntro ? (
          <TextInputView
            unit={unit}
            min={minValue}
            ideal={idealValue}
            max={maxValue}
            currentValue={inputValue}
            onChangeValue={(newValue: string) => {
              setInputValue(newValue);
              checkValid(newValue, minValue, maxValue);
            }}
            useRulerPicker={true}
            pickerOrientation="horizontal"
          />
        ) : (
          <TextInput
            placeholder={idealValue.toString()}
            unit={unit}
            value={inputValue}
            setValue={(newValue: string) => {
              setInputValue(newValue);
              checkValid(newValue, minValue, maxValue);
            }}
          />
        )}

        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center justify-center w-[80%] h-[30vh] mt-10 gap-8 mb-10">
          <BMIResult w={weightInKg} h={heightInCm} />
        </div>
      </div>

      <ContinueButton
        disabled={!isValid}
        text={props.config.continue}
        // additionClassName='button-animate-keyboard'
        onClick={() => {
          props.onContinue(value, unit);
        }}
      />
    </div>
  );
}
