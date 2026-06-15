import { TFunction } from "i18next";
import * as z from "zod"

export const getBreathingExerciseSchema = (t: TFunction<"breathing-exercise">) => z.object({
     exerciseTime: z.string().trim().refine(v => {
          const n = Number(v);
          return n >= 12 && n <= 300;
     },t("validations.duration")),
     pattern: z.enum([
          "inhale-hold-exhale",
          "inhale-hold-exhale-hold",
          "inhale-exhale",
          "inhale-exhale-hold",
     ],t("validations.exercise-type")),
})

export const getPomodoroSchema = (t: TFunction<"pomodoro">) => z.object({
     focus: z.int(t("validation.should-be-int")).refine(n => n >= 10 && n <= 60, t("validation.focus-time")),
     shortBreak: z.int(t("validation.should-be-int")).refine(n => n >= 5 && n <= 25, t("validation.short-break")),
     longBreak: z.int(t("validation.should-be-int")).refine(n => n >= 10 && n <= 40, t("validation.long-break")),
     loops: z.int(t("validation.should-be-int")).refine(n => n >= 2 && n <= 10, t("validation.loops"))
})