"use client"
import HackerBackground from "@/components/ui/hacker-bg";
import React, {useEffect, useState} from "react";
import {TypeAnimation} from "react-type-animation";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {redirect} from "next/navigation";
import SkipButton from "@/components/containers/skip-button";

const Page = () => {
    const [animationStart, setAnimationStart] = useState(false);
    useEffect(() => {
        setTimeout(() => setAnimationStart(true), 2000);
    })
    return (
        <>
            <HackerBackground/>
            <SkipButton />
            <div className="relative mt-[50%] flex flex-col gap-4 mx-4 w-full">
                <span className="font-mono text-pretty text-primary-foreground">
                    {
                        animationStart && <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed once, initially
                                'Ха!..',
                                1000,
                                'Ха!.. В этот раз улов покруче прежнего!',
                                2000,
                                'Стоп..',
                                2000,
                                'Кому это понадобился чехол для банана?!',
                                2000,
                                () => redirect('/introduction/2'),
                            ]}
                            speed={60}
                            deletionSpeed={90}
                            style={{fontSize: '2em', textShadow: "0px 0px 10px #000000"}}
                            repeat={0}
                        />
                    }
                </span>
            </div>
        </>
    )
}

export default Page