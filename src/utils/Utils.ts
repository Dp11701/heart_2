import { ValueConfig } from "@/components/models/ValueConfig";
import { IAPConfig } from "@/components/models/IAPConfig";
import { ResultSuccessConfig } from "@/components/models/ResultSuccessConfig";
import { WelcomeConfig } from "@/components/models/WelcomeConfig";

import defaultValueConfig from "@/components/configs/value_config.json";
import defaultIAPConfig from "@/components/configs/iap.json";
import defaultResultConfig from "@/components/configs/result.json";
import defaultWebsiteConfig from "@/components/configs/welcome.json";

export class Utils {
  defaultValueConfig: ValueConfig = ValueConfig.parse(defaultValueConfig);
  defaultIAPConfig: IAPConfig = IAPConfig.parse(defaultIAPConfig);
  defaultResultConfig: ResultSuccessConfig =
    ResultSuccessConfig.parse(defaultResultConfig);
  defaultWebsiteConfig: WelcomeConfig =
    WelcomeConfig.parse(defaultWebsiteConfig);

  constructor() {
    this.welcomeConfig().then((e) => {
      this.defaultWebsiteConfig = e;
    });
    this.valueConfig().then((e) => {
      this.defaultValueConfig = e;
    });
    this.resultConfig().then((e) => {
      this.defaultResultConfig = e;
    });
    this.iapConfig().then((e) => {
      this.defaultIAPConfig = e;
    });
  }

  static shared: Utils = new Utils();

  async welcomeConfig(languageCode: string | null | undefined = null) {
    const lang =
      languageCode ||
      (typeof window !== "undefined"
        ? localStorage.getItem("languageCode")
        : null) ||
      "default";
    try {
      const rp = await fetch(
        `${process.env.PUBLIC_URL}/configs/${lang}/welcome.json`
      );
      return WelcomeConfig.parse(await rp.json());
    } catch (e) {
      return this.defaultWebsiteConfig;
    }
  }

  async valueConfig(languageCode: string | null | undefined = null) {
    const lang =
      languageCode ||
      (typeof window !== "undefined"
        ? localStorage.getItem("languageCode")
        : null) ||
      "default";
    try {
      const rp = await fetch(
        `${process.env.PUBLIC_URL}/configs/${lang}/value_config.json`
      );
      return ValueConfig.parse(await rp.json());
    } catch (e) {
      return this.defaultValueConfig;
    }
  }

  async resultConfig(languageCode: string | null | undefined = null) {
    const lang =
      languageCode ||
      (typeof window !== "undefined"
        ? localStorage.getItem("languageCode")
        : null) ||
      "default";
    try {
      const rp = await fetch(
        `${process.env.PUBLIC_URL}/configs/${lang}/result.json`
      );
      return ResultSuccessConfig.parse(await rp.json());
    } catch (e) {
      return this.defaultResultConfig;
    }
  }

  async iapConfig(languageCode: string | null | undefined = null) {
    const lang =
      languageCode ||
      (typeof window !== "undefined"
        ? localStorage.getItem("languageCode")
        : null) ||
      "default";
    try {
      const rp = await fetch(
        `${process.env.PUBLIC_URL}/configs/${lang}/iap.json`
      );
      return IAPConfig.parse(await rp.json());
    } catch (e) {
      return this.defaultIAPConfig;
    }
  }
}
