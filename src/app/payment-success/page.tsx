"use client";

import { useEffect, useState } from "react";
import { FirebaseUtils } from "../../utils/FirebaseUtils";
import { UserInfo } from "@/components/models/UserInfo";
import { Utils } from "../../utils/Utils";
import { useRouter } from "next/navigation";
import Image from "next/image";
function loadUserInfo(): UserInfo {
  try {
    if (typeof window === "undefined") return UserInfo.parse({});
    return UserInfo.parse(JSON.parse(localStorage.getItem("userInfo") || "{}"));
  } catch (e) {
    return UserInfo.parse({});
  }
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

export default function PaymentSuccess() {
  const [config, setConfig] = useState(Utils.shared.defaultResultConfig);
  const [userInfo, setUserInfo] = useState<UserInfo>(UserInfo.parse({}));
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setUserInfo(loadUserInfo());
  }, []);

  useEffect(() => {
    if (isClient) {
      switchConfigs().then();
      register().then();
    }
  }, [isClient]);

  useEffect(() => {
    FirebaseUtils.trackingPayment("sign_in_success");
  }, []);

  async function switchConfigs() {
    if (typeof window === "undefined") return;

    const locale =
      typeof window !== "undefined"
        ? localStorage.getItem("languageCode")
        : null;
    if (locale) {
      try {
        const response = await Utils.shared.resultConfig(locale);
        setConfig(response);
      } catch {
        if (typeof window !== "undefined")
          localStorage.removeItem("languageCode");
        setConfig(Utils.shared.defaultResultConfig);
      }
    } else {
      if (typeof window !== "undefined")
        localStorage.removeItem("languageCode");
      setConfig(Utils.shared.defaultResultConfig);
    }
  }

  async function register() {
    if (typeof window === "undefined") return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TECH_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bundle_id: "com.pulse.heartkit",
            email_user_input: userInfo.email,
            raw_data: userInfo,
            session_id:
              typeof window !== "undefined"
                ? localStorage.getItem("sessionId") || ""
                : "",
            type: "apple",
            fbc: getCookie("_fbc") || "",
            fbp: getCookie("_fbp") || "",
          }),
        }
      );

      const json = await response.json();
    } catch (error: any) {
      console.log(error);
      FirebaseUtils.trackingPayment("register_fail", {
        reason: error || "unknown",
      });
    }
  }

  async function handleSignInWithApple() {
    if (typeof window === "undefined") return;

    try {
      FirebaseUtils.trackingPayment("sign_in");
      const data = await (window as any).AppleID.auth.signIn();

      if (data.authorization) {
        const code = data.authorization.code;
        const idToken = data.authorization.id_token;
        if (typeof window !== "undefined")
          localStorage.setItem("authorization_code", code);
        router.push("/success");
      } else {
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
        width: "100dvw",
        height: "calc(100dvh - 48px)",
        padding: "24px auto",
      }}
    >
      <div></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifySelf: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Image
          src="/assets/icAppIconPayment.png"
          alt={""}
          width={100}
          height={100}
          style={{
            borderRadius: 16,
            boxShadow: "0px 4px 24px 0px #FF355B24",
          }}
        />

        <span
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            whiteSpace: "pre-line",
            lineHeight: 1.5,
          }}
        >
          {config.paymentSuccessTitle}
        </span>
      </div>

      <button
        onClick={handleSignInWithApple}
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          height: 56,
          backgroundColor: "black",
          borderRadius: 10,
          gap: 16,
          padding: "0px 16px",
        }}
      >
        <Image src="/assets/icAppleLogo.png" alt={""} width={32} height={32} />
        <span style={{ fontSize: 18, fontWeight: 600, color: "white" }}>
          {config.loginWithApple}
        </span>
      </button>
    </div>
  );
}
