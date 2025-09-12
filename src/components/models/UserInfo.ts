import { string, z } from "zod";
import { EnumGender } from "./EnumGender";

const TransformOptionalString = z
  .string()
  .optional()
  .transform((e) => {
    if (e === undefined || e === null) {
      return null;
    }
    return e || null;
  });

const TransformOptionalNumber = z
  .number()
  .optional()
  .transform((e) => {
    if (e === undefined || e === null) {
      return null;
    }
    return e || null;
  });

export const UserInfo = z.object({
  gender: TransformOptionalString,
  age: TransformOptionalNumber,
  height: TransformOptionalNumber,
  heightUnit: TransformOptionalString,
  weight: TransformOptionalNumber,
  weightUnit: TransformOptionalString,
  healthCondition: TransformOptionalString,
  currentHealthMonitor: TransformOptionalString,
  cholesterolOption: TransformOptionalString,
  bloodPressureReading: TransformOptionalString,
  hypertensionOption: TransformOptionalString,
  highBloodPressureOption: TransformOptionalString,
  activityLevelOption: TransformOptionalString,
  smokeHistory: TransformOptionalString,
  sleepDailyOption: TransformOptionalString,
  drinkAlcoholOption: TransformOptionalString,
  email: TransformOptionalString,
});

export type UserInfo = z.infer<typeof UserInfo>;
