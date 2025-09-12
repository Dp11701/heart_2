"use client";

import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { FirebaseUtils } from "../../utils/FirebaseUtils";
import { Utils } from "../../utils/Utils";
import Image from "next/image";

export default function FinalSuccessScreen() {
  const [config, setConfig] = useState(Utils.shared.defaultResultConfig);

  async function switchConfigs() {
    const locale = localStorage.getItem("languageCode");
    if (locale) {
      try {
        const response = await Utils.shared.resultConfig(locale);
        setConfig(response);
      } catch {
        localStorage.removeItem("languageCode");
        setConfig(Utils.shared.defaultResultConfig);
      }
    } else {
      localStorage.removeItem("languageCode");
      setConfig(Utils.shared.defaultResultConfig);
    }
  }

  useEffect(() => {
    switchConfigs().then();
    save().then();
  }, []);

  async function save() {
    const sessionId = localStorage.getItem("sessionId") || "";
    const code = localStorage.getItem("authorization_code") || "";
    localStorage.removeItem("authorization_code");
    localStorage.removeItem("sessionId");
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_TECH_URL}/api/v1/user/update/${sessionId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authorization_code: code,
            type: "apple",
          }),
        }
      );
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error appropriately, e.g., show an error message to the user.
      return;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F4F6FA",
        width: "calc(100dvw-32px)",
        padding: "24px 16px",
      }}
      className="h-full"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            src="/assets/icAppIconPayment.png"
            alt={""}
            width={60}
            height={60}
            style={{
              borderRadius: 12,
              boxShadow: "0px 4px 24px 0px #FF255B24",
            }}
          />
          <span style={{ fontSize: 24, color: "#FF3D60", fontWeight: 600 }}>
            iCardiac
          </span>
        </div>

        <span
          style={{
            fontSize: 28,
            fontWeight: 600,
            whiteSpace: "pre-line",
            textAlign: "center",
            color: "#0D0D0E",
            lineHeight: 1.3,
          }}
        >
          {config.thanks}
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontWeight: 600, textAlign: "center" }}
            color={"#45454C"}
          >
            {config.step1}
          </span>
          <QRCode value={process.env.NEXT_PUBLIC_APP_LINK || ""} size={100} />
          <a
            href={process.env.NEXT_PUBLIC_APP_LINK}
            onClick={() => {
              FirebaseUtils.trackingPayment("go_store");
            }}
            target={"_blank"}
          >
            <Image
              src="/assets/icDownloadAppStore.png"
              alt={""}
              style={{ aspectRatio: "133/46" }}
              width={133}
              height={46}
            />
          </a>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ fontWeight: 600, textAlign: "center" }}
            color={"#45454C"}
          >
            {config.step2}
          </span>
          <Image
            src="/assets/icSuccess2.png"
            width={222}
            height={576}
            alt={""}
            style={{ aspectRatio: "888/576" }}
          />
        </div>

        <span style={{ fontWeight: 600 }} color={"#45454C"}>
          {config.step3}
        </span>
      </div>
    </div>
  );
}
