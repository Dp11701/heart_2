import { IAPSpecificOfferView } from "./IAPSpecificOfferView";
import { IAPThumbView } from "./IAPThumbView";
import { IAPPricesView } from "./IAPPricesView";

import "../../styles/App.css";
import { IAPMillionsUsersLoveUsView } from "./IAPMillionsUsersLoveUsView";
import { IAPGuaranteeView } from "./IAPGuaranteeView";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Utils } from "@/utils/Utils";
import { FirebaseUtils } from "@/utils/FirebaseUtils";

export function InAppPurchaseScreen() {
  const [config, setConfig] = useState(Utils.shared.defaultIAPConfig);

  async function switchConfigs() {
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
        <IAPPricesView config={config} />
        <IAPMillionsUsersLoveUsView config={config} />
        <IAPGuaranteeView config={config} />
      </div>
    </div>
  );
}
