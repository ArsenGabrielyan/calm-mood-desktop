import { SoundsType } from "../sounds";
import { UpdaterStatus } from "./enums";

export interface ISounds {
      id: SoundsType;
      url: string;
      Icon: React.LazyExoticComponent<
            React.ComponentType<React.SVGProps<SVGSVGElement>>
      >;
}
export type PlayBackType = "idle" | "playing" | "paused"
export interface IUpdaterState{
     status: UpdaterStatus,
     newVersion: string | null,
     patchDate: Date | null,
     downloaded: number,
     total: number
}