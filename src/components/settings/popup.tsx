"use client"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";

interface PopupComponentProps{
     open?: boolean;
     onOpen?: (open: boolean) => void,
     trigger?: React.JSX.Element
     children: React.ReactNode,
     title: string,
     description?: string,
}
export default function PopupComponent({open, onOpen, children, title, description, trigger}: PopupComponentProps){
     return (
          <Drawer open={open} onOpenChange={onOpen}>
               {trigger && (
                    <DrawerTrigger asChild>
                         {trigger}
                    </DrawerTrigger>
               )}
               <DrawerContent>
                    <DrawerHeader>
                         <DrawerTitle className="text-lg sm:text-xl font-semibold">{title}</DrawerTitle>
                         {description && (
                              <DrawerDescription>{description}</DrawerDescription>
                         )}
                    </DrawerHeader>
                    <div className="p-5 overflow-y-auto">
                         {children}
                    </div>
               </DrawerContent>
          </Drawer>
     )
}