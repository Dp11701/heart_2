import {z} from "zod";

export const RadioOptions = z.object({
    title: z.string(),
    options: z.string().array(),
})
export type RadioOptions = z.infer<typeof RadioOptions>;

export const Constants = {
    CHOLESTEROL_OPTIONS: RadioOptions.parse({
        title: 'Do you have high Cholesterol?',
        options: ['Yes', 'No', "I don't know"]
    }),
    BLOOD_PRESSURE_READING_OPTIONS: RadioOptions.parse({
        title: 'What is your typical blood pressure reading?',
        options: ['Less than 120/Less than 80', '120-129/less than 80', "130-139/80-89", "140 or higher/90 or higher", "I don’t know"]
    }),
    HYPERTENSION_OPTIONS: RadioOptions.parse({
        title: 'Do you have hypertension?',
        options: ['Yes', 'No', "I don't know"]
    }),
    HIGH_BLOOD_PRESSURE_OPTIONS: RadioOptions.parse({
        title: 'Do you take medication for high blood pressure?',
        options: ['Yes', 'No']
    }),
    ACTIVITY_LEVEL_OPTIONS: RadioOptions.parse({
        title: 'What is your physical activity level?',
        options: ['Sedentary (little to no exercise)', 'Light activity (1-2 times per week)', 'Moderate activity (3-5 times per week)', 'Very active (more than 5 times per week)']
    }),
    SLEEP_DAILY_OPTIONS: RadioOptions.parse({
        title: 'How much sleep do you get daily?',
        options: ['Less than 5 hours', '5-7 hours', 'More than 7 hours']
    }),
    SMOKE_HISTORY_OPTIONS: RadioOptions.parse({
        title: 'Do you smoke or have a smoking history?',
        options: ['I smoke tobacco', 'I’m an ex-smoker', 'I’ve never smoked']
    }),
    DRINK_ALCOHOL_OPTIONS: RadioOptions.parse({
        title: 'Do you drink alcohol?',
        options: ['Regularly', 'Occasionally', 'Regularly but in the past', 'I don’t drink']
    })
}