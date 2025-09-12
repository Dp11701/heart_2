import {z} from "zod";

export const ValueConfigItem = z.object({
    unit: z.string(),
    min: z.number(),
    max: z.number(),
    ideal: z.number()
})

export const ValueConfig = z.object({
    weight: ValueConfigItem.array(),
    height: ValueConfigItem.array(),
    age: ValueConfigItem.array(),
})

export type ValueConfigItem = z.infer<typeof ValueConfigItem>;
export type ValueConfig = z.infer<typeof ValueConfig>;