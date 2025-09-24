"use client";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Utils } from "@/utils/Utils";
import { FirebaseUtils, remoteConfig } from "@/utils/FirebaseUtils";
import { IAPSpecificOfferView } from "@/components/pages/IAP/IAPSpecificOfferView";
import { IAPThumbView } from "@/components/pages/IAP/IAPThumbView";
import { IAPPricesView } from "@/components/pages/IAP/IAPPricesView";
import { IAPMillionsUsersLoveUsView } from "@/components/pages/IAP/IAPMillionsUsersLoveUsView";
import { IAPGuaranteeView } from "@/components/pages/IAP/IAPGuaranteeView";
import { BottomSheet } from "@/components/Molecules/BottomSheet";
import { fetchAndActivate, getValue } from "firebase/remote-config";

export default function InAppPurchaseScreen() {
  const [config, setConfig] = useState(Utils.shared.defaultIAPConfig);
  const [isMobile, setIsMobile] = useState(false);
  const [iapIntro, setIapIntro] = useState<number>(0);

  async function switchConfigs() {
    if (typeof window === "undefined") return;

    const locale = localStorage.getItem("languageCode");
    if (locale) {
      try {
        const response = await Utils.shared.iapConfig(locale);
        setConfig(response);
      } catch {
        localStorage.removeItem("languageCode");
        setConfig(Utils.shared.defaultIAPConfig);
      }
    } else {
      localStorage.removeItem("languageCode");
      setConfig(Utils.shared.defaultIAPConfig);
    }
  }
  async function debugRemoteConfig() {
    try {
      const activated = await fetchAndActivate(remoteConfig);
      console.log("fetchAndActivate result:", activated);

      // Parse JSON-like params safely
      const appConfigRaw = getValue(remoteConfig, "app_config").asString();
      try {
        const appConfig = JSON.parse(appConfigRaw);
        console.log("app_config JSON:", appConfig);
        const IAPIntro = appConfig.const.iap_intro;
        const KBIntro = appConfig.const.kb_intro;
        console.log("IAPIntro:", IAPIntro);
        console.log("KBIntro:", KBIntro);
        setIapIntro(IAPIntro);
      } catch {
        console.log("app_config (raw string):", appConfigRaw);
      }
    } catch (err) {
      console.error("Remote Config debug error:", err);
    }
  }

  useEffect(() => {
    debugRemoteConfig();
  }, []);

  useEffect(() => {
    console.log("iapIntro:", iapIntro);
  }, [iapIntro]);

  useEffect(() => {
    Modal.setAppElement("#purchase-content");
    switchConfigs().then();
  }, []);

  useEffect(() => {
    FirebaseUtils.trackingIntro("iap_intro1");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateIsMobile);
    } else {
      window.addEventListener("resize", updateIsMobile);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", updateIsMobile);
      } else {
        window.removeEventListener("resize", updateIsMobile);
      }
    };
  }, []);

  return (
    <div className="App-No-OverFlow">
      <div
        id={"purchase-content"}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 600,
          margin: "0 auto",
          backgroundColor: "white",
        }}
      >
        {iapIntro === 2 && (
          <div>
            <IAPSpecificOfferView config={config} constConfig={iapIntro} />
            <IAPThumbView config={config} constConfig={iapIntro} />
            <IAPPricesView config={config} constConfig={iapIntro} />
            <IAPMillionsUsersLoveUsView config={config} />
            <IAPGuaranteeView config={config} />
          </div>
        )}
        {iapIntro === 3 && (
          <div>
            <IAPSpecificOfferView config={config} constConfig={iapIntro} />
            <IAPThumbView config={config} constConfig={iapIntro} />

            {/* Hiển thị BottomSheet chỉ trên mobile; desktop hiển thị trực tiếp */}
            {isMobile ? (
              <BottomSheet title="" minHeight="200px" draggable={true}>
                <IAPPricesView config={config} constConfig={iapIntro} />
                <IAPMillionsUsersLoveUsView config={config} />
                <IAPGuaranteeView config={config} />
              </BottomSheet>
            ) : (
              <>
                <IAPPricesView config={config} constConfig={iapIntro} />
                <IAPMillionsUsersLoveUsView config={config} />
                <IAPGuaranteeView config={config} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
