import { z } from "zod";
import { CommentModel } from "../pages/IAP/IAPMillionsUsersLoveUsView";

export const IAPConfig = z.object({
  yourSpecialOffer: z.string(),
  thumbTitle: z.string(),
  checkWithBody: z.string(),
  enableFreeTrial: z.string(),
  packs: z.array(
    z.object({
      title: z.string(),
      subtitle: z.string(),
      price: z.string(),
      productId: z.string(),
      subtitle1: z
        .string()
        .nullish()
        .transform((e) => ""),
      ctaButtonTitle: z.string(),
    })
  ),
  millionsOfUsers: z.string(),
  millionsOfUseHighlight: z.string(),
  "30Days": z.string(),
  weBelieve: z.string(),
  weBelieve2: z.string(),
  yourInfoSafe: z.string(),
  yourInfoSafe2: z.string(),
  secureCheckout: z.string(),
  secureCheckout2: z.string(),
  needHelp: z.string(),
  needHelp2: z.string(),
  pleaseNote: z.string(),
  selectPaymentMethod: z.string(),
  debitOrCredit: z.string(),
  priceToday: z.string(),
  priceTodayDes: z.string(),
  comments: CommentModel.array()
    .nullish()
    .transform((e) => e || []),
});

export type IAPConfig = z.infer<typeof IAPConfig>;
