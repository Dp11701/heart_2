import {z} from "zod";

export const PaymentMethod = z.enum([
    "STRIPE", "PAY_PAL"
])

export type PaymentMethod = z.infer<typeof PaymentMethod>