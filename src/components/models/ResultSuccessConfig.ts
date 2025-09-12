import {z} from 'zod';

export const ResultSuccessConfig = z.object({
    paymentSuccessTitle: z.string(),
    loginWithApple: z.string(),
    thanks: z.string(),
    thanksCancel: z.string(),
    step1: z.string(),
    step2: z.string(),
    step3: z.string()
});

export type ResultSuccessConfig = z.infer<typeof ResultSuccessConfig>;