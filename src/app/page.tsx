"use client";

import {useEffect} from "react";
import axios from "axios";
import Image from "next/image";
import {
    initData,
    useSignal
} from "@telegram-apps/sdk-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import SurveysList from "@/components/containers/surveys-list";
// import {Button} from "@/components/ui/button";
// import {Link} from "next-view-transitions";

export default function Home() {
    const initDataState = useSignal(initData.state);

    useEffect(() => {
        const createUser = async () => {
            try {
                await axios.post('/api/create-user', {
                    ...initDataState?.user
                }, {
                    validateStatus: (status) => status === 409
                });
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const status = error.response?.status;
                    const data = error.response?.data;

                    console.error(`Error: ${status}. User creation failed:`, data?.message || error.message);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
        };

        if (initDataState?.user) {
            createUser().then();
        }
    }, [initDataState?.user]);

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
                    <div className="flex items-center gap-2 font-mono">
                        <Image src="/hi.webp" className={`h-6 w-6`} width={24} height={24}
                               alt={"Привет"}/> Привет, {initDataState && initDataState.user?.firstName}!
                         {/*<Button><Link href={"/survey/1"}>Test</Link></Button>*/}
                    </div>
                    <span className="mb-0 font-mono">
                        Активные опросы для тебя:
                    </span>
                </div>
            </div>
            <SurveysList/>
        </BackButtonHandler>
    );
}
