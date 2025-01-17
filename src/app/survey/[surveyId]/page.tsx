"use client"
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import {motion} from "motion/react"
import {useParams, useSearchParams} from "next/navigation";
import Noise from "@/components/ui/noise";

const Survey = {
    title: "Как улучшить рабочие процессы?",
    description: "Поделитесь своими идеями по оптимизации процессов в нашей команде.",
    image: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/profile-mjss82WnWBRO86MHHGxvJ2TVZuyrDv.jpeg",
    createdAt: new Date(1673680000000)
}

const Page = () => {
    const params = useParams<{ surveyId: string }>()
    const searchParams = useSearchParams();
    const gradientClass = searchParams.get("gradient") || "bg-black";

    return (
        <BackButtonHandler>
            <div className={`
              absolute inset-0 px-4

              ${gradientClass}
            `} style={{viewTransitionName: `card-${params.surveyId}`}}>
                <Noise
                    patternSize={250}
                    patternScaleX={1}
                    patternScaleY={1}
                    patternRefreshInterval={2}
                    patternAlpha={25}
                />

                <motion.div
                    className={`
                      flex h-full flex-col items-center justify-center
                    `}
                    initial={{opacity: 0, scale: 0.95}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5}}
                >
                    <h1 className="text-4xl font-bold text-white"
                        style={{viewTransitionName: `title-${params.surveyId}`}}>{Survey.title}</h1>
                    <h3 className={`
                      text-lg text-zinc-50

                      dark:text-zinc-300
                    `}
                        style={{viewTransitionName: `description-${params.surveyId}`}}>{Survey.description}</h3>
                </motion.div>

                <motion.div
                    className="absolute bottom-10 w-full px-6"
                    initial={{opacity: 0, y: 50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: 0.3, duration: 0.5}}
                >
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <p className="text-gray-700">Survey questions go here...</p>
                    </div>
                </motion.div>
            </div>
        </BackButtonHandler>
    )
}

export default Page;