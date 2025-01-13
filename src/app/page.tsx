"use client";

import {
    exitFullscreen,
    initData,
    isFullscreen,
    requestFullscreen,
    useSignal, viewport
} from "@telegram-apps/sdk-react";
import {X} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {InitDataTable} from "@/components/containers/init-data-table";
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import {useEffect} from "react";

export default function Home() {
    const initDataState = useSignal(initData.state);
    const fullscreen = useSignal(isFullscreen);
    useEffect(() => {
        console.log("isSupported: " + viewport.requestFullscreen.isSupported())
        console.log("isAvailable: " + viewport.requestFullscreen.isAvailable())
    }, [])

    return (
        <BackButtonHandler back={false}>
            <Avatar className="mt-4">
                <AvatarImage src={initDataState?.user?.photoUrl}/>
                <AvatarFallback>{initDataState?.user?.firstName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-pretty font-mono">
                Привет, {initDataState && initDataState.user?.firstName}!
            </span>
            <Drawer>
                <DrawerTrigger asChild><Button>InitData</Button></DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Пользователь {initDataState?.user?.firstName}</DrawerTitle>
                        <DrawerDescription className="text-center">Данные профиля Telegram</DrawerDescription>
                    </DrawerHeader>
                    <InitDataTable data={initDataState?.user}/>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button className={"fixed right-1 top-1"} size="icon" variant="ghost"><X/></Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {
                requestFullscreen.isSupported() && requestFullscreen.isAvailable() &&
                <div className="flex items-center space-x-2">
                    <Switch id="fullscreen-mode" checked={fullscreen}
                            onCheckedChange={async () => await (fullscreen ? exitFullscreen() : requestFullscreen())}/>
                    <Label htmlFor="fullscreen-mode">Полноэкранный режим</Label>
                </div>
            }
        </BackButtonHandler>
    );
}
