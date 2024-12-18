"use client"
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import {initData, useSignal} from "@telegram-apps/sdk-react";
import {TypeAnimation} from "react-type-animation";
import {Button} from "@/components/ui/button";
import { motion } from "motion/react";

export default function Home() {
    const initDataState = useSignal(initData.state);

    console.log(initDataState)
    return (
        <BackButtonHandler back={false}>
            {/*<h1 className="text-5xl">Hi, {initDataState ? initDataState.user?.firstName : "stranger"}!</h1>*/}
            <div className="mt-[50%] flex flex-col gap-4 mx-4 w-full">
                <span className="font-mono text-pretty text-primary-foreground">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            'Привет, незнакомец!',
                            1000,
                            'Привет, незнакомец или может быть..',
                            1000,
                            'Привет, незнакомка?',
                            1000,
                            'Ха, я и так знаю кто ты!',
                            1000,
                            `Привет, ${initDataState && initDataState.user?.firstName}!`,
                            1000,
                            `Привет, ${initDataState && initDataState.user?.firstName}! Ну что, может быть начнём нашу игру?`,
                            1000,
                        ]}
                        speed={50}
                        style={{fontSize: '2em'}}
                        repeat={0}
                    />
                </span>
                <motion.div
                    className="flex w-full"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 15,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }
                    }}
                >
                    <Button>Начать</Button>
                </motion.div>
            </div>
        </BackButtonHandler>
    );
}
