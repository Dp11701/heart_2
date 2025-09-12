"use client";
// import "../styles/WelcomeView.css";
import Lottie from "lottie-react";
import starwellcomeAnimation from "../../../public/assets/jsons/Starwellcome.json";
import ratingsAnimation from "../../../public/assets/jsons/Ratings.json";
import Image from "next/image";
import ContinueButton from "@/components/ContinueButton";
import { WelcomeSchema } from "@/components/models/WelcomeConfig";
function WelcomeScreen(props: {
  config: WelcomeSchema;
  onContinue: () => void;
}) {
  return (
    <div className="screen-container">
      <div className="screen-content flex flex-col items-center justify-center gap-4">
        <Image
          src="/assets/heartRate.png"
          alt="heartRate"
          className="mb-10"
          width={120}
          height={120}
        />
        <Lottie
          animationData={starwellcomeAnimation}
          loop={true}
          autoplay={true}
          style={{
            mixBlendMode: "multiply",
            backgroundColor: "transparent",
          }}
        />
        <Lottie
          animationData={ratingsAnimation}
          loop={true}
          autoplay={true}
          style={{
            mixBlendMode: "multiply",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <ContinueButton
        disabled={false}
        text="Continue"
        // additionClassName='button-animate-keyboard'
        onClick={() => {
          props.onContinue();
        }}
      />
    </div>
  );
}

export default WelcomeScreen;
