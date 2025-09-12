"use client";
import { HTMLAttributes, useEffect, useState } from "react";

import "@/styles/SelectRadioView.css";
import "@/styles/Common.css";
import { SelectSchema } from "../models/WelcomeConfig";
import NextButton from "../Molecules/NextButton";

// Import icons

// Icon mapping
const iconMap: { [key: string]: string } = {
  icCheck: "/assets/icons/icCheck.svg",
  icCancel: "/assets/icons/icCancel.svg",
  icRequest: "/assets/icons/icRequest.svg",
  icBloodPressure: "/assets/icons/icBloodPressure.svg",
  icHeartRate: "/assets/icons/icHeartRate.svg",
  icSleep: "/assets/icons/icSleep.svg",
  icNutrition: "/assets/icons/icNutrition.svg",
  icEnergy: "/assets/icons/icEnergy.svg",
  icImprove: "/assets/icons/icImprove.svg",
  icExploring: "/assets/icons/icExploring.svg",
  icWatch: "/assets/icons/icWatch.svg",
  icManually: "/assets/icons/icManually.svg",
  icProhibition: "/assets/icons/icProhibition.svg",
  icHealthcare: "/assets/icons/icHealthcare.svg",
  icSmile: "/assets/icons/icSmile.svg",
  icConfused: "/assets/icons/icConfused.svg",
  icSad: "/assets/icons/icSad.svg",
  icVerySad: "/assets/icons/icVerySad.svg",
  icSedentary: "/assets/icons/icSedentary.svg",
  icLightActivity: "/assets/icons/icLightActivity.svg",
  icModerate: "/assets/icons/icModerate.svg",
  icVeryActive: "/assets/icons/icVeryActive.svg",
  icTobacco: "/assets/icons/icTobacco.svg",
  icVape: "/assets/icons/icVape.svg",
  icSmoker: "/assets/icons/icSmoker.svg",
  icNeverSmoker: "/assets/icons/icNeverSmoker.svg",
  icRegularly: "/assets/icons/icRegularly.svg",
  icOccasionally: "/assets/icons/icOccasionally.svg",
  icBeer: "/assets/icons/icBeer.svg",
  icNoAlcohol: "/assets/icons/icNoAlcohol.svg",
};

interface SelectRadioItemProps extends HTMLAttributes<HTMLElement> {
  idx: number;
  showIndex: number;
  option: any;
  isSelected: boolean;
  onTap: () => void;
}

function SelectRadioItem(props: SelectRadioItemProps) {
  const [scale, setScale] = useState(false);

  function className(): string {
    if (props.isSelected) {
      return `option-button-active item-list ${
        props.idx < props.showIndex ? "show" : ""
      } ${scale ? "bounce" : ""}`;
    }
    return `option-button item-list ${
      props.idx < props.showIndex ? "show" : ""
    }`;
  }

  return (
    <div
      key={props.idx}
      className={`${className()} bg-white rounded-[18px]`}
      style={{
        border: props.isSelected ? "2px solid #FF3D60" : "none",
      }}
      onClick={() => {
        setScale(true);
        props.onTap();
      }}
    >
      <div className="flex items-center gap-2">
        <img
          src={iconMap[props.option?.key] || props.option?.key}
          alt="icon"
          className="w-6 h-6"
          style={{ pointerEvents: "none" }}
        />
        <span>{props.option?.value as string}</span>
      </div>
    </div>
  );
}

export interface SelectRadioProps extends HTMLAttributes<HTMLDivElement> {
  options: SelectSchema;
  onPickOption?: (value: string) => void;
}

export function SelectRadioView(props: SelectRadioProps) {
  const { options, onPickOption, ...rest } = props;

  const [selectedOption, setSelectedOptions] = useState<any | null>(null);

  const [showIndex, setShowIndex] = useState<number>(0);

  useEffect(() => {
    for (let i = 0; i <= props.options.options.length; i++) {
      setTimeout(() => {
        setShowIndex(i);
      }, 100 * i);
    }
  }, [props.options.options.length]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "transparent",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "12px 16px",
        gap: 16,
      }}
      className="overflow-y-auto"
      {...rest}
    >
      <div className="flex flex-col gap-4">
        <span className="title-text"> {props.options.title} </span>

        <div className="flex flex-col gap-4">
          {props.options.options.map((option, idx) => {
            return (
              <SelectRadioItem
                idx={idx}
                isSelected={selectedOption?.key === option.key}
                option={option}
                showIndex={showIndex}
                key={`${option.key}-${idx}`}
                onTap={() => {
                  setSelectedOptions(option);
                }}
              />
            );
          })}
        </div>
      </div>

      <NextButton
        disabled={selectedOption === null}
        text={"Next"}
        onClick={() => {
          props.onPickOption?.(selectedOption?.key || "");
        }}
      />
    </div>
  );
}
