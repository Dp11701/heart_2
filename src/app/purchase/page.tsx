"use client";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Utils } from "@/utils/Utils";
import { FirebaseUtils } from "@/utils/FirebaseUtils";
import { IAPSpecificOfferView } from "@/components/pages/IAP/IAPSpecificOfferView";
import { IAPThumbView } from "@/components/pages/IAP/IAPThumbView";
import { IAPPricesView } from "@/components/pages/IAP/IAPPricesView";
import { IAPMillionsUsersLoveUsView } from "@/components/pages/IAP/IAPMillionsUsersLoveUsView";
import { IAPGuaranteeView } from "@/components/pages/IAP/IAPGuaranteeView";
import { BottomSheet } from "@/components/Molecules/BottomSheet";

export default function InAppPurchaseScreen() {
  const [config, setConfig] = useState(Utils.shared.defaultIAPConfig);
  const [isMobile, setIsMobile] = useState(false);

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
        <IAPSpecificOfferView config={config} />
        <IAPThumbView config={config} />

        {/* Hiển thị BottomSheet chỉ trên mobile; desktop hiển thị trực tiếp */}
        {isMobile ? (
          <BottomSheet title="" minHeight="240px" draggable={true}>
            <IAPPricesView config={config} />
            <IAPMillionsUsersLoveUsView config={config} />
            <IAPGuaranteeView config={config} />
          </BottomSheet>
        ) : (
          <>
            <IAPPricesView config={config} />
            <IAPMillionsUsersLoveUsView config={config} />
            <IAPGuaranteeView config={config} />
          </>
        )}
      </div>
    </div>
  );
}
