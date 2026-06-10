import Logo from "@/components/logo"

export default function SplashScreen(){
     const backgroundImage: React.CSSProperties = {
          background: `url(/backgrounds/bg-4.webp), url(/backgrounds/bg-4.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
     }
     return (
          <main className="relative w-full min-h-dvh flex justify-center items-center flex-col gap-2.5" style={backgroundImage}>
               <div className="absolute inset-0 bg-linear-to-b from-background/50 to-background/70 -z-00"/>
               <div className="relative z-10 text-foreground p-4 w-full md:w-fit flex justify-center items-center flex-col">
                    <Logo width={480} height={163}/>
                    <div className="flex items-center gap-1.5 text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold">
                         <div className="bg-primary/70 size-8 rounded-full animate-calm-pulse" />
                         Խնդրում ենք սպասել․․․
                    </div>
               </div>
          </main>
     )
}