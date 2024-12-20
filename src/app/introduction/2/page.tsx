"use client"
import {initData, useSignal} from "@telegram-apps/sdk-react";
import {TypeAnimation} from "react-type-animation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {redirect} from "next/navigation";
import SkipButton from "@/components/containers/skip-button";
import React from "react";

export default function Page() {
    const initDataState = useSignal(initData.state);

    console.log(initDataState)
    return (
        <>
            <SkipButton />
            <div className="mt-[50%] flex flex-col gap-4 mx-4 w-full">
                <span className="font-mono text-pretty text-primary-foreground">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            'Чёртов Гринч взломал мой сервер и украл все подарки!',
                            1000,
                            'Кажется, в этом году я не смогу вас поздравить :(',
                            1000,
                            'Но..',
                            1000,
                            'Но.. вы же справитесь и без меня?',
                            2000,
                            () => redirect('/main'),
                        ]}
                        speed={60}
                        deletionSpeed={90}
                        style={{fontSize: '2em'}}
                        repeat={0}
                    />
                </span>
            </div>
        </>
    );
}
