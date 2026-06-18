import { SoundsType } from "../sounds";

export interface ISounds {
      id: SoundsType;
      url: string;
      Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export type PlayBackType = "idle" | "playing" | "paused"
export enum NavLinks{
      Sounds = 'sounds',
      BreathingExercise = 'exercise',
      Pomodoro = 'pomodoro'
}
export enum UpdaterStatus {
     Checking = "checking",
     Updating = "updating",
     NeedsUpdate = "needs-update",
     Updated = "updated",
     CheckError = "failed-check",
     Completed = "completed",
     UpdateError = "failed-update"
}
export interface IUpdaterState{
     status: UpdaterStatus,
     newVersion: string | null,
     patchDate: Date | null,
     downloaded: number,
     total: number
}