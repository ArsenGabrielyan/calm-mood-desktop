import { cn } from "@/lib/utils"

export default function SVGWrapper(props: React.SVGProps<SVGElement>){
     return (
          <svg
               xmlns="http://www.w3.org/2000/svg"
               xmlSpace="preserve"
               x="0"
               y="0"
               version="1.1"
               viewBox={props.viewBox}
               className={props.className?.includes("fill-primary") ? props.className : cn("fill-foreground",props.className)}
               width={props.width}
               height={props.height}
          >
               {props.children}
          </svg>
     )
}