import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { CircleFlag, CircleFlagProps } from "react-circle-flags";

export function FlagIcon({className, ...props}: CircleFlagProps) {
     const [isBrokenImg, setIsBrokenImg] = useState(false);
     useEffect(() => {
          setIsBrokenImg(false);
     }, [props.countryCode]);
     if (isBrokenImg) {
          return <Languages className={cn("text-muted-foreground size-4",className)} />;
     }
     return (
          <CircleFlag
               {...props}
               className={cn("size-4",className)}
               onError={(e) => {
                    props.onError?.(e);
                    setIsBrokenImg(true);
               }}
          />
     );
}