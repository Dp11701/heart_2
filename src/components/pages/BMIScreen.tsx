"use client";
import Lottie from "react-lottie";
import ContinueButton from "../ContinueButton";
import { UserInfo } from "../models/UserInfo";
import { OverviewInfoSchema } from "../models/WelcomeConfig";
import doctorAnimation from "../../../public/assets/jsons/Doctor2.json";
// Use public path for assets

import { BMIResult } from "../Molecules/BMIResult";
import Image from "next/image";
// Icon mapping
const iconMap: Record<string, string> = {
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
  icHeartPlus: "/assets/icons/icHeartPlus.svg",
};

// Mapping function to get display values from userInfo
const getUserInfoDisplay = (userInfo: UserInfo) => {
  const mappings = [
    {
      key: "cholesterolOption",
      label: "Cholesterol",
      getIcon: () => "icHeartPlus",
      getValue: (info: UserInfo) => {
        if (info.cholesterolOption === "icCheck") return "Yes";
        if (info.cholesterolOption === "icCancel") return "No";
        if (info.cholesterolOption === "icRequest") return "I don't know";
        return "Not specified";
      },
    },
    {
      key: "bloodPressureReading",
      label: "Blood Pressure",
      getIcon: () => "icBloodPressure",
      getValue: (info: UserInfo) => {
        if (info.bloodPressureReading === "icSmile")
          return "Less than 120/Less than 80";
        if (info.bloodPressureReading === "icConfused")
          return "120-129/less than 80";
        if (info.bloodPressureReading === "icSad") return "130-139/80-89";
        if (info.bloodPressureReading === "icVerySad")
          return "140 or higher/90 or higher";
        if (info.bloodPressureReading === "icRequest") return "I don't know";
        return "Not specified";
      },
    },
    {
      key: "activityLevelOption",
      label: "Activity Level",
      getIcon: (info: UserInfo) => info.activityLevelOption || "icVeryActive",
      getValue: (info: UserInfo) => {
        if (info.activityLevelOption === "icSedentary")
          return "Sedentary (little to no exercise)";
        if (info.activityLevelOption === "icLightActivity")
          return "Light activity (1-2 times/week)";
        if (info.activityLevelOption === "icModerate")
          return "Moderate activity (3-5 times/week)";
        if (info.activityLevelOption === "icVeryActive")
          return "Very active (more than 5 times/week)";
        return "Not specified";
      },
    },
    {
      key: "smokeHistory",
      label: "Smoking History",
      getIcon: (info: UserInfo) => info.smokeHistory || "icTobacco",
      getValue: (info: UserInfo) => {
        if (info.smokeHistory === "icTobacco") return "I smoke tobacco";
        if (info.smokeHistory === "icVape") return "Only vape";
        if (info.smokeHistory === "icSmoker") return "I'm an ex-smoker";
        if (info.smokeHistory === "icNeverSmoker") return "I've never smoked";
        return "Not specified";
      },
    },
    {
      key: "drinkAlcoholOption",
      label: "Alcohol Consumption",
      getIcon: (info: UserInfo) => info.drinkAlcoholOption || "icRegularly",
      getValue: (info: UserInfo) => {
        if (info.drinkAlcoholOption === "icRegularly") return "Regularly";
        if (info.drinkAlcoholOption === "icOccasionally") return "Occasionally";
        if (info.drinkAlcoholOption === "icBeer")
          return "Regularly but in the past";
        if (info.drinkAlcoholOption === "icNoAlcohol") return "I don't drink";
        return "Not specified";
      },
    },
  ];

  return mappings.filter((mapping) => userInfo[mapping.key as keyof UserInfo]);
};

export interface IBMIScreenProps {
  config: OverviewInfoSchema;
  userInfo: UserInfo;
  onContinue: () => void;
}

export function BMIScreen(props: IBMIScreenProps): React.JSX.Element {
  const { userInfo } = props;
  const heightInCm =
    userInfo.heightUnit === "ft/in"
      ? (userInfo?.height ?? 0) * 2.54
      : userInfo.height ?? 0;
  const weightInKg =
    userInfo.weightUnit === "lbs"
      ? (userInfo.weight ?? 0) * 0.453592
      : userInfo.weight ?? 0;

  const userInfoDisplay = getUserInfoDisplay(userInfo);

  return (
    <div className="screen-container">
      <div className="screen-content">
        <span className="text-center text-[#2D3142] font-[600] text-[20px] leading-[32px] px-5 mb-10">
          Your Personal Summary
        </span>

        <Lottie
          options={{
            animationData: doctorAnimation,
            loop: true,
            autoplay: true,
          }}
          height="auto"
          width="auto"
        />

        <div className="flex flex-col items-center mb-8 bg-[#FFFFFF] mx-5 rounded-[16px] pb-4">
          <BMIResult w={weightInKg} h={heightInCm} />

          <div className="flex flex-col w-full px-5 gap-4">
            {userInfoDisplay.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-start px-3 bg-[#F4F6FA] rounded-[16px]"
              >
                <Image
                  src={iconMap[item.getIcon(userInfo)]}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <div className="flex flex-col justify-start items-start py-3">
                  <span className="text-[14px] text-[#9C9EB9] font-[400] leading-[20px]">
                    {item.label}
                  </span>
                  <span className="font-[500] text-[14px] leading-[20px] text-[#2D3142]">
                    {item.getValue(userInfo)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContinueButton
        disabled={false}
        text={"Continue"}
        onClick={() => {
          props.onContinue();
        }}
      />
    </div>
  );
}
