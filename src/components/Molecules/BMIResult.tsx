import React from "react";
import { Typography } from "antd";

interface BMIResultProps {
  w: number; // weight in kg
  h: number; // height in cm
}

const bmiStatus = (bmi: number) => {
  if (bmi < 18.5)
    return {
      label: "Underweight",
      color: "#36B6C6",
      message:
        "You're underweight. Focus on nutrient-rich foods and check in with a health expert to build up your strength.",
    };
  if (bmi < 25)
    return {
      label: "Normal",
      color: "#4CAF50",
      message:
        "You're in a healthy range. Keep up your current habits with balanced meals and regular movement!",
    };
  if (bmi < 30)
    return {
      label: "Overweight",
      color: "#FBC02D",
      message:
        "You're slightly over. Try more daily movement and mindful eating to work toward a healthier balance.",
    };
  return {
    label: "Obese",
    color: "#E57373",
    message:
      "Your BMI indicates obesity. Start with small lifestyle changes and talk to a professional for a safe, sustainable plan.",
  };
};

export const BMIResult: React.FC<BMIResultProps> = ({ w, h }) => {
  const bmi = w / Math.pow(h / 100, 2);
  const status = bmiStatus(bmi);

  const segments = [
    { min: 0, max: 18.5, color: "#36B6C6" },
    { min: 18.5, max: 25, color: "#4CAF50" },
    { min: 25, max: 30, color: "#FBC02D" },
    { min: 30, max: 40, color: "#E57373" },
  ];

  const minBMI = 0,
    maxBMI = 40;
  const arrowLeft = Math.min(
    100,
    Math.max(0, ((bmi - minBMI) / (maxBMI - minBMI)) * 100)
  );

  return (
    <div className="w-full h-auto bg-white rounded-xl  p-4 flex flex-col items-center">
      <div className="text-xl font-semibold text-gray-800 mb-1">
        BMI= {bmi.toFixed(1)}
      </div>
      <div className="text-sm font-medium mb-3" style={{ color: status.color }}>
        ({status.label})
      </div>

      <div className="relative w-full">
        {/* Bar */}
        <div className="flex w-full h-3 rounded-full overflow-hidden">
          {segments.map((seg, i) => (
            <div
              key={i}
              style={{
                backgroundColor: seg.color,
                width: `${((seg.max - seg.min) / (maxBMI - minBMI)) * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            left: `calc(${arrowLeft}% - 6px)`,
            bottom: "10px",
            width: 0,
            height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: `8px solid ${status.color}`,
          }}
        />
      </div>
      <Typography className="text-start text-[#61697F] font-[400] text-[14px] leading-[20px] mt-4">
        {status.message}
      </Typography>
    </div>
  );
};
