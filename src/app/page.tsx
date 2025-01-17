"use client";

import {
    initData,
    useSignal
} from "@telegram-apps/sdk-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import SurveysList from "@/components/containers/surveys-list";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Home() {
    const initDataState = useSignal(initData.state);

    return (
        <BackButtonHandler back={false}>
            <div className={`flex h-[50vh] flex-col items-center justify-center`}>
                <div className={`
                  sticky top-[25vh] flex flex-col items-center justify-center
                  gap-2
                `}>
                    <Avatar>
                        <AvatarImage src={initDataState?.user?.photoUrl}/>
                        <AvatarFallback>{initDataState?.user?.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-mono">
                        Привет, {initDataState && initDataState.user?.firstName}!
                    </span>
                    <span className="mb-0 font-mono">
                        Активные опросы для тебя: <Button><Link href="/test">Test</Link></Button>
                    </span>
                </div>
            </div>
            <SurveysList/>
        </BackButtonHandler>
    );
}
