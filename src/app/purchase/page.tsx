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

        {/* BottomSheet with IAPPricesView - Always visible */}
        <BottomSheet title="" minHeight="24vh" draggable={true}>
          <IAPPricesView config={config} />
          <IAPMillionsUsersLoveUsView config={config} />
          <IAPGuaranteeView config={config} />
        </BottomSheet>
      </div>
    </div>
  );
}
