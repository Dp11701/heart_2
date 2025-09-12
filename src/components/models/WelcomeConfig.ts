import { z } from "zod";

export const UnitSchema = z.object({
  unit: z.string(),
  min: z.number(),
  max: z.number(),
  ideal: z.number(),
});
export type UnitSchema = z.infer<typeof UnitSchema>;

export const SelectGenderSchema = z.object({
  title: z.string(),
  description: z.string(),
  male: z.string(),
  female: z.string(),
  preferNotToSay: z.string(),
});
export type SelectGenderSchema = z.infer<typeof SelectGenderSchema>;

export const SelectInputValueSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  note: z.string(),
  continue: z.string(),
});
export type SelectInputValueSchema = z.infer<typeof SelectInputValueSchema>;

export const OptionSchema = z.object({
  key: z.string(),
  value: z.string(),
});
export type OptionSchema = z.infer<typeof OptionSchema>;

export const SelectSchema = z.object({
  title: z.string(),
  options: z
    .array(OptionSchema)
    .optional()
    .transform((e) => e || []),
});
export type SelectSchema = z.infer<typeof SelectSchema>;

export const OverviewInfoSchema = z.object({
  title: z.string(),
  tenYears: z.string(),
  normal: z.string(),
  weight: z.string(),
  height: z.string(),
  age: z.string(),
  gender: z.string(),
  "80LikeYou": z.string(),
  description: z.string(),
  continue: z.string(),
});
export type OverviewInfoSchema = z.infer<typeof OverviewInfoSchema>;

export const AnalyzingSchema = z.object({
  title: z.string(),
  options: z.array(OptionSchema),
});
export type AnalyzingSchema = z.infer<typeof AnalyzingSchema>;

export const SendEmailSchema = z.object({
  title: z.string(),
  description: z.string(),
  privacyPolicy: z.string(),
  submit: z.string(),
});
export type SendEmailSchema = z.infer<typeof SendEmailSchema>;

export const WelcomeSchema = z.object({
  trustedBy: z.string(),
  "1M+": z.string(),
  welcomeTo: z.string(),
  appName: z.string(),
  features: z.array(z.string()),
  continueTitle: z.string(),
  advice: z.string(),
  privacyPolicy: z.string(),
  termOfUse: z.string(),
  subscriptionTerms: z.string(),
  privacyPolicyLink: z.string(),
  termOfUseLink: z.string(),
  subscriptionTermsLink: z.string(),
});
export type WelcomeSchema = z.infer<typeof WelcomeSchema>;

export const WelcomeConfig = z.object({
  WELCOME: WelcomeSchema,
  SELECT_GENDER: SelectGenderSchema,
  SELECT_AGE: SelectInputValueSchema,
  SELECT_WEIGHT: SelectInputValueSchema,
  SELECT_HEIGHT: SelectInputValueSchema,
  OVERVIEW_INFO: OverviewInfoSchema,
  SELECT_HEALTH_CONDITION: SelectSchema,
  SELECT_CURRENT_HEALTH_MONITOR: SelectSchema,
  SELECT_CHOLESTEROL: SelectSchema,
  SELECT_BLOOD_PRESSURE: SelectSchema,
  SELECT_HYPERTENSION: SelectSchema,
  SELECT_HIGH_BLOOD_PRESSURE: SelectSchema,
  SELECT_ACTIVITY_LEVEL: SelectSchema,
  SELECT_SMOKING_HISTORY: SelectSchema,
  SELECT_ALCOHOL: SelectSchema,
  ANALYZING: AnalyzingSchema,
  // SEND_EMAIL: SendEmailSchema,
});

export type WelcomeConfig = z.infer<typeof WelcomeConfig>;
