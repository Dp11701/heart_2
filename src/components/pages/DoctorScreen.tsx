"use client";
import { Typography } from "antd";
import NextButton from "../Molecules/NextButton";
import Lottie from "react-lottie";
import doctorAnimation from "../../../public/assets/jsons/doctor.json";

interface DoctorScreenProps {
  onContinue?: () => void;
}
export default function DoctorScreen({ onContinue }: DoctorScreenProps) {
  return (
    <div className="flex flex-col h-full justify-between mb-8">
      <div>
        <Typography className="text-center text-[#2D3142] font-[500] text-[16px] leading-[24px] px-5  mb-4 mt-2">
          Welcome. I’m Dr. Kim, here to guide you through your personalized
          heart health journey.
        </Typography>
        <Lottie
          options={{
            animationData: doctorAnimation,
            loop: true,
            autoplay: true,
          }}
          height="auto"
          width="auto"
        />
        <Typography className="text-center text-[#7D8296] font-[400] text-[16px] leading-[24px] px-5 ">
          Take 2 minutes to complete a quick quiz and get your custom plan.{" "}
        </Typography>
      </div>
      <div className="flex justify-center items-center w-full">
        <NextButton
          text="Next"
          onClick={() => {
            onContinue?.();
          }}
        />
      </div>
    </div>
  );
}
