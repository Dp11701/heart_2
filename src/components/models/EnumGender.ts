import {z} from "zod";

export const EnumGender = z.enum([
    'MALE',
    "FEMALE",
    "NOT_TO_SAY"
])

export type EnumGender = z.infer<typeof EnumGender>