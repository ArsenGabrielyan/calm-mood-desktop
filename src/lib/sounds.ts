import { lazy } from "react"
import { ISounds } from "./types"

const Birds = lazy(()=>import("@/icons/birds"))
const Rain = lazy(()=>import("@/icons/rain"))
const River = lazy(()=>import("@/icons/river"))
const Beach = lazy(()=>import("@/icons/beach"))
const Train = lazy(()=>import("@/icons/train"))
const Thunderstorm = lazy(()=>import("@/icons/thunderstorm"))
const Night = lazy(()=>import("@/icons/night"))
const Lake = lazy(()=>import("@/icons/lake"))
const Waves = lazy(()=>import("@/icons/waves"))
const Waterfall = lazy(()=>import("@/icons/waterfall"))

export const soundIds = [
     "birds", "rain",
     "river", "beach",
     "train", "thunderstorm",
     "night", "lake",
     "waves", "waterfall"
] as const
export type SoundsType = typeof soundIds[number];
const soundIcons = {
     birds: Birds,
     rain: Rain,
     river: River,
     beach: Beach,
     train: Train,
     thunderstorm: Thunderstorm,
     night: Night,
     lake: Lake,
     waves: Waves,
     waterfall: Waterfall
} satisfies Record<SoundsType, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

export const sounds: ISounds[] = soundIds.map(id=>({
     id,
     Icon: soundIcons[id],
     url: `${id}.mp3`
}))