import {z} from "zod";

const StringOrEmpty = z.string().optional().nullable().transform(e => e || "")
export const IAPPackModel = z.object({
    title: StringOrEmpty,
    priceTitle: StringOrEmpty,
    subTitle: StringOrEmpty,
})

export type IAPPackModel = z.infer<typeof IAPPackModel>