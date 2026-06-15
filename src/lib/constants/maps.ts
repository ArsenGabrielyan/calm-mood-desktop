import { BreathingPhase, BreathingExerciseState, BreathingPatternId } from "../types/breathing-exercise";

export const PHASE_TO_CIRCLE: Record<BreathingPhase, BreathingExerciseState["circleType"]> = {
     inhale: "growing",
     hold: "hold",
     exhale: "shrinking",
};
export const BREATHING_PATTERNS: Record<BreathingPatternId,BreathingPhase[]> = {
     "inhale-hold-exhale":["inhale", "hold", "exhale"],
     "inhale-hold-exhale-hold": ["inhale", "hold", "exhale", "hold"],
     "inhale-exhale": ["inhale", "exhale"],
     "inhale-exhale-hold": ["inhale", "exhale", "hold"],
};
export const POMODORO_PRESETS = {
     balanced: {
          focus: 30,
          shortBreak: 10,
          longBreak: 20,
          loops: 6
     },
     lightStart: {
          focus: 15,
          shortBreak: 5,
          longBreak: 10,
          loops: 4
     },
     deepWork: {
          focus: 50,
          shortBreak: 15,
          longBreak: 30,
          loops: 4
     },
     easyMode: {
          focus: 10,
          shortBreak: 5,
          longBreak: 15,
          loops: 3
     },
     learning: {
          focus: 25,
          shortBreak: 5,
          longBreak: 10,
          loops: 6
     },
} as const