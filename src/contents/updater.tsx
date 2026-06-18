import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import WindowWrapper from "@/components/window";
import { cn, getErrorMessage } from "@/lib/utils";
import { openUrl } from "@tauri-apps/plugin-opener";
import { RotateCcw, RotateCw, ScrollText } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useTransition, useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { check } from "@tauri-apps/plugin-updater"
import { relaunch } from "@tauri-apps/plugin-process"
import { IUpdaterState, UpdaterStatus } from "@/lib/types";
import { INITIAL_UPDATER_STATE } from "@/lib/constants";

export default function UpdaterContent(){
     const [isChecking, startChecking] = useTransition();
     const [isUpdating, startUpdating] = useTransition();
     const {t} = useTranslation("update")
     const [update, setUpdate] = useState<IUpdaterState>(INITIAL_UPDATER_STATE)
     const setUpdaterState = (overrides: Partial<IUpdaterState>) => setUpdate(prev=>({...prev, ...overrides}))
     const checkForUpdates = async () => {
          setUpdaterState({
               status: UpdaterStatus.Checking,
               downloaded: 0,
               total: 0
          })
          startChecking(async()=>{
               try {
                    const update = await check();
                    setUpdaterState({
                         status: update ? UpdaterStatus.NeedsUpdate : UpdaterStatus.Updated,
                    })
               } catch (err){
                    toast.error(t("failed-check.main"),{
                         description: getErrorMessage(err)
                    })
                    setUpdaterState({
                         status: UpdaterStatus.CheckError,
                    })
               }
          })
     }
     const updateApp = () => {
          setUpdaterState({
               status: UpdaterStatus.Updating,
               downloaded: 0,
               total: 0
          })
          startUpdating(async()=>{
               try {
                    const update = await check();
                    if(update){
                         ["calm-mood-tauri-version","calm-mood-version"].map(val=>localStorage.removeItem(val))
                         let downloaded = 0, contentLength = 0;
                         await update.downloadAndInstall((event) => {
                              switch (event.event) {
                                   case 'Started':
                                        contentLength = event.data.contentLength || 0;
                                        setUpdaterState({
                                             total: contentLength,
                                             downloaded
                                        })
                                        break;
                                   case 'Progress':
                                        downloaded += event.data.chunkLength;
                                        setUpdaterState({
                                             total: contentLength,
                                             downloaded
                                        })
                                        break;
                                   case 'Finished':
                                        setUpdaterState({
                                             status: UpdaterStatus.Completed
                                        })
                                        break;
                              }
                         });
                    }
               } catch (err){
                    toast.error(t("failed-update.main"),{
                         description: getErrorMessage(err)
                    })
                    setUpdaterState({
                         status: UpdaterStatus.UpdateError,
                         total: 0,
                         downloaded: 0
                    })
               }
          })
     }
     useEffect(()=>{
          checkForUpdates()
     },[]);
     const currProgress = useMemo(()=>(update.downloaded/update.total)*100,[update.downloaded,update.total]);
     return (
          <WindowWrapper title={t("title")}>
               <div className="bg-card/40 backdrop-blur-sm text-card-foreground border shadow-xs rounded-md p-4 flex justify-center items-center flex-col gap-2 max-w-[400px] w-full">
                    <h2 className={cn(
                         "text-xl md:text-2xl lg:text-3xl font-semibold",
                         (update.status==="failed-check" || update.status==="failed-update") && "text-destructive",
                         (update.status==="checking" || update.status==="updating") && "text-muted-foreground"
                    )}>{t(`${update.status}.main`)}</h2>
                    <p className="text-muted-foreground">{t(`${update.status}.secondary`)}</p>
                    {(update.status==="needs-update" || update.status==="updating") && (
                         <div className="flex items-center justify-center w-full max-w-md gap-3">
                              {!isNaN(currProgress) && (
                                   <span className="font-medium">{currProgress.toFixed(0)}%</span>
                              )}
                              <Progress value={currProgress}/>
                         </div>
                    )}
                    {update.status==="completed" ? (
                         <Button onClick={async() => await relaunch()}>
                              <RotateCcw/>
                              {t("buttons.relaunch")}
                         </Button>
                    ) : (update.status==="needs-update" || update.status==="updating") ? (
                         <ButtonGroup>
                              <Button disabled={isUpdating} onClick={updateApp}>
                                   <RotateCw className={cn(isUpdating && "animate-spin")}/>
                                   {isUpdating ? t("buttons.update.pending") : t("buttons.update.original")}
                              </Button>
                              <Button variant="secondary" size="icon" title={t("buttons.changelog")} onClick={async() => await openUrl("https://github.com/ArsenGabrielyan/calm-mood-desktop/blob/main/CHANGELOG.md")}>
                                   <ScrollText/>
                              </Button>
                         </ButtonGroup>   
                    ) : (
                         <Button onClick={checkForUpdates} disabled={isChecking}>
                              <RotateCw className={cn(isChecking && "animate-spin")}/>
                              {isChecking ? t("buttons.check.pending") : t("buttons.check.original")}
                         </Button>
                    )}
               </div>
          </WindowWrapper>
     )
}