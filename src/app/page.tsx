"use client"
import {initData, useSignal} from "@telegram-apps/sdk-react";
import {TypeAnimation} from "react-type-animation";
import {Button} from "@/components/ui/button";
import { motion } from "motion/react";
import Link from "next/link";
import {redirect} from "next/navigation";
import SkipButton from "@/components/containers/skip-button";

export default function Home() {
    const initDataState = useSignal(initData.state);

    console.log(initDataState)
    return (
        <>
            <motion.div
                initial={{opacity: 0, x: -50}}
                animate={{opacity: 1, x: 0}}
                transition={{
                    duration: 0.4,
                    delay: 1.5,
                    scale: {type: "spring", visualDuration: 0.4, bounce: 0.5}
                }}
            >
                <SkipButton asChild={true} />
            </motion.div>
            {/*<h1 className="text-5xl">Hi, {initDataState ? initDataState.user?.firstName : "stranger"}!</h1>*/}
            <div className="mt-[50%] flex flex-col gap-4 mx-4 w-full">
                <span className="font-mono text-pretty text-primary-foreground">
                    <TypeAnimation
                        sequence={[
                            // Same substring at the start will only be typed once, initially
                            `Привет, ${initDataState && initDataState.user?.firstName}!`,
                            1000,
                            'Надеюсь, в этом году ты не ронял(-а) прод?',
                            1000,
                            'Отлично, тогда у Санты есть для тебя подарок!',
                            2000,
                            () => redirect('/introduction/1'),
                        ]}
                        speed={60}
                        deletionSpeed={90}
                        style={{fontSize: '2em'}}
                        repeat={0}
                    />
                </span>
                <motion.div
                    className="relative flex w-full"
                    initial={{opacity: 0, x: -50}}
                    animate={{opacity: 1, x: 0}}
                    transition={{
                        duration: 0.4,
                        delay: 15,
                        scale: {type: "spring", visualDuration: 0.4, bounce: 0.5}
                    }}
                >
                    <Button asChild>
                        <Link href="/test">Начать</Link>
                    </Button>
                </motion.div>
            </div>
        </>
    );
}
