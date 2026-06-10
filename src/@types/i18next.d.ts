import "i18next";
import translation from "@i18n/hy/translation.json";
import breathingExercise from "@i18n/hy/breathing-exercise.json";
import pomodoro from "@i18n/hy/pomodoro.json";
import sounds from "@i18n/hy/sounds.json";

import { LangCode } from "../i18n/config";

declare module "i18next" {
     interface CustomTypeOptions {
          defaultNS: "translation";
          resources: {
               translation: typeof translation;
               sounds: typeof sounds;
               pomodoro: typeof pomodoro;
               "breathing-exercise": typeof breathingExercise
          };
     }
}