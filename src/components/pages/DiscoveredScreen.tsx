"use client";
import { Typography } from "antd";
import NextButton from "../Molecules/NextButton";
import { FeatureCard } from "../Molecules/FeatureCard";

const features = [
  { title: "Real-time Heart Monitoring", icon: "icHeart" },
  { title: "Blood Pressure Tracking", icon: "icBloodPressure" },
  { title: "Heart-Healthy Diet", icon: "icHeartHealthyDiet" },
  { title: "AI-personalized Plan", icon: "icAiPersonalizedPlan" },
];

interface DiscoveredScreenProps {
  onContinue?: () => void;
}
export default function DiscoveredScreen({
  onContinue,
}: DiscoveredScreenProps) {
  return (
    <div className="flex flex-col h-full justify-between mb-8">
      <div>
        <Typography className="text-center text-[#2D3142] font-[600] text-[20px] leading-[32px] px-5 my-10">
          People Like You Have Discovered Hidden Signs With iCardiac.
        </Typography>
        <div className="flex w-full h-full px-4 gap-4">
          {/* Column 1 - Odd items */}
          <div className="flex flex-col w-1/2 gap-4">
            {features
              .filter((_, idx) => idx % 2 === 0)
              .map((f, idx) => (
                <div key={f.title} className="flex justify-center">
                  <FeatureCard
                    config={f}
                    idx={idx * 2}
                    onTap={() => {
                      alert(f.title);
                      onContinue?.();
                    }}
                  />
                </div>
              ))}
          </div>

          {/* Column 2 - Even items */}
          <div className="flex flex-col w-1/2 gap-4 mt-10">
            {features
              .filter((_, idx) => idx % 2 === 1)
              .map((f, idx) => (
                <div key={f.title} className="flex justify-center">
                  <FeatureCard
                    config={f}
                    idx={idx * 2 + 1}
                    onTap={() => {
                      alert(f.title);
                      onContinue?.();
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-10">
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
