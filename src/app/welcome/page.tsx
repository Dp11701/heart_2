"use client";
import React, { JSX, useEffect, useState } from "react";
import { IntroStep } from "@/components/models/IntroStep";
import WelcomeScreen from "@/components/pages/WelcomeScreen";
import SelectGenderScreen from "@/components/pages/SelectGenderScreen";
import SelectAgeScreen from "@/components/pages/SelectAgeScreen";
import { SelectHeightScreen } from "@/components/pages/SelectHeightScreen";
import { SelectWeightScreen } from "@/components/pages/SelectWeightScreen";
import { BMIScreen } from "@/components/pages/BMIScreen";
import { SelectRadioView } from "@/components/pages/SelectRadioView";
import AppHeaderView from "@/components/Molecules/AppHeaderView";
import { AnalyzingScreen } from "@/components/pages/AnalyzingScreen";
import { UserInfo } from "@/components/models/UserInfo";
import "@/styles/App.css";
import DiscoveredScreen from "@/components/pages/DiscoveredScreen";
import DoctorScreen from "@/components/pages/DoctorScreen";
import { Utils } from "@/utils/Utils";
import { FirebaseUtils } from "@/utils/FirebaseUtils";
import { useRouter } from "next/navigation";

function IntroScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfo>(UserInfo.parse({}));
  const [step, setStep] = useState(IntroStep.parse("WELCOME"));

  useEffect(() => {
    console.log(step, "step");
  }, [step]);

  const [valueConfig, setValueConfig] = useState(
    Utils.shared.defaultValueConfig
  );
  const [welcomeConfig, setWelcomeConfig] = useState(
    Utils.shared.defaultWebsiteConfig
  );

  // useEffect(() => {
  //   switchConfigs().then();
  // }, []);

  useEffect(() => {
    FirebaseUtils.trackingIntro("welcome");
  }, []);

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [userInfo]);

  // async function switchConfigs() {
  //   if (true) {
  //     try {
  //       const response = await Utils.shared.welcomeConfig("default");
  //       localStorage.setItem("languageCode", "default");
  //       setWelcomeConfig(response);
  //     } catch {
  //       localStorage.removeItem("languageCode");
  //       setWelcomeConfig(Utils.shared.defaultWebsiteConfig);
  //     }
  //   } else {
  //     localStorage.removeItem("languageCode");
  //     setWelcomeConfig(Utils.shared.defaultWebsiteConfig);
  //   }
  // }

  const STEPS: IntroStep[] = [
    "WELCOME",
    "DOCTOR",
    "SELECT_HEALTH_CONDITION",
    "SELECT_CURRENT_HEALTH_MONITOR",
    "SELECT_CHOLESTEROL",
    "SELECT_BLOOD_PRESSURE",
    "SELECT_HYPERTENSION",
    "SELECT_HIGH_BLOOD_PRESSURE",
    "SELECT_ACTIVITY_LEVEL",
    "SELECT_SMOKING_HISTORY",
    "SELECT_ALCOHOL",
    "DISCOVERED",
    "SELECT_GENDER",
    "SELECT_AGE",
    "SELECT_HEIGHT",
    "SELECT_WEIGHT",
    "OVERVIEW_INFO",
    "ANALYZING",
    // "SEND_EMAIL",
  ];

  function nextStep() {
    let idx = STEPS.findIndex((e) => e === step);
    if (idx + 1 < STEPS.length) {
      setStep(STEPS[idx + 1]);
    }
  }

  function previousStep() {
    let idx = STEPS.findIndex((e) => e === step);
    if (idx - 1 >= 0) {
      setStep(STEPS[idx - 1]);
    }
  }

  function screen(step: IntroStep): JSX.Element {
    switch (step) {
      case "WELCOME":
        return (
          <WelcomeScreen
            key={step}
            config={welcomeConfig.WELCOME}
            onContinue={() => {
              nextStep();
              FirebaseUtils.trackingIntro("continue");
            }}
          />
        );
      case "SELECT_GENDER":
        return (
          <SelectGenderScreen
            key={step}
            config={welcomeConfig.SELECT_GENDER}
            onSelectGender={(gender) => {
              setUserInfo({ ...userInfo, ...{ gender: gender } });
              nextStep();
              FirebaseUtils.trackingIntro("gender", {
                gender: gender.toLowerCase(),
              });
            }}
          />
        );
      case "SELECT_AGE":
        return (
          <SelectAgeScreen
            key={step}
            config={welcomeConfig.SELECT_AGE}
            ageConfig={valueConfig.age}
            onContinue={(age) => {
              setUserInfo({ ...userInfo, ...{ age: age } });
              nextStep();
              FirebaseUtils.trackingIntro("age", {
                gender: age.toString().toLowerCase(),
              });
            }}
          />
        );
      case "SELECT_HEIGHT":
        return (
          <SelectHeightScreen
            key={step}
            config={welcomeConfig.SELECT_HEIGHT}
            heightConfig={valueConfig.height}
            userInfo={userInfo}
            onContinue={(value, unit) => {
              setUserInfo({
                ...userInfo,
                ...{ height: value, heightUnit: unit },
              });
              nextStep();
            }}
          />
        );
      case "SELECT_WEIGHT":
        return (
          <SelectWeightScreen
            key={step}
            config={welcomeConfig.SELECT_WEIGHT}
            weightConfig={valueConfig.weight}
            userInfo={userInfo}
            onContinue={(value, unit) => {
              setUserInfo({
                ...userInfo,
                ...{ weight: value, weightUnit: unit },
              });
              nextStep();
              FirebaseUtils.trackingIntro("body_metric", {
                height: value.toString(),
                length_unit: unit.toString(),
                weight: userInfo.weight?.toString() ?? "null",
                weight_unit: userInfo.weightUnit?.toString() ?? "null",
              });
            }}
          />
        );

      case "OVERVIEW_INFO":
        return (
          <BMIScreen
            config={welcomeConfig.OVERVIEW_INFO}
            userInfo={userInfo}
            onContinue={() => {
              nextStep();
              FirebaseUtils.trackingIntro("bmi", {
                status: bmiStatus(),
              });
            }}
          />
        );

      case "SELECT_HEALTH_CONDITION":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_HEALTH_CONDITION}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ healthCondition: option } });
              nextStep();
              FirebaseUtils.trackingIntro("health_condition", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_CURRENT_HEALTH_MONITOR":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_CURRENT_HEALTH_MONITOR}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ currentHealthMonitor: option } });
              nextStep();
              FirebaseUtils.trackingIntro("current_health_monitor", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_CHOLESTEROL":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_CHOLESTEROL}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ cholesterolOption: option } });
              nextStep();
              FirebaseUtils.trackingIntro("cholesterol", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_BLOOD_PRESSURE":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_BLOOD_PRESSURE}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ bloodPressureReading: option } });
              nextStep();
              FirebaseUtils.trackingIntro("blood_pressure_level", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_HYPERTENSION":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_HYPERTENSION}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ hypertensionOption: option } });
              nextStep();
              FirebaseUtils.trackingIntro("hypertension", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_HIGH_BLOOD_PRESSURE":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_HIGH_BLOOD_PRESSURE}
            onPickOption={(option) => {
              setUserInfo({
                ...userInfo,
                ...{ highBloodPressureOption: option },
              });
              nextStep();
              FirebaseUtils.trackingIntro("blood_pressure_medication", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_ACTIVITY_LEVEL":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_ACTIVITY_LEVEL}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ activityLevelOption: option } });
              nextStep();
              FirebaseUtils.trackingIntro("physical_activity_level", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_SMOKING_HISTORY":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_SMOKING_HISTORY}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ smokeHistory: option } });
              nextStep();
              FirebaseUtils.trackingIntro("smoke", {
                status: option,
              });
            }}
          />
        );

      case "SELECT_ALCOHOL":
        return (
          <SelectRadioView
            key={step}
            options={welcomeConfig.SELECT_ALCOHOL}
            onPickOption={(option) => {
              setUserInfo({ ...userInfo, ...{ drinkAlcoholOption: option } });
              nextStep();
              FirebaseUtils.trackingIntro("drink_alcohol", {
                status: option,
              });
            }}
          />
        );

      case "ANALYZING":
        return (
          <AnalyzingScreen
            config={welcomeConfig.ANALYZING}
            onContinue={() => {
              router.push("/purchase");

              FirebaseUtils.trackingIntro("analyzing");
            }}
          />
        );

      case "DISCOVERED":
        return (
          <DiscoveredScreen
            onContinue={() => {
              nextStep();
            }}
          />
        );
      case "DOCTOR":
        return (
          <DoctorScreen
            onContinue={() => {
              nextStep();
            }}
          />
        );
      default:
        return <></>;
    }
  }

  function bmiStatus() {
    if (!userInfo.height || !userInfo.weight) {
      return "unknown";
    }
    const heightInKg =
      userInfo.heightUnit == "ft" ? userInfo.height * 0.3048 : userInfo.height;
    const weightInKg =
      userInfo.weightUnit == "lbs"
        ? userInfo.weight * 0.453592
        : userInfo.weight;

    const bmi = weightInKg / (heightInKg * heightInKg);
    if (bmi < 18.5) {
      return "underweight";
    } else if (bmi < 24.9) {
      return "normal";
    } else if (bmi < 29.9) {
      return "overweight";
    } else {
      return "obese";
    }
  }

  return (
    <div className="App overflow-y-auto">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <AppHeaderView
          indexIndicator={STEPS.findIndex((e) => e === step) - 1}
          showBackButton={!["WELCOME", "SEND_EMAIL"].includes(step)}
          onTapBack={() => {
            previousStep();
          }}
        />
        {screen(step)}
      </div>
    </div>
  );
}

export default IntroScreen;
