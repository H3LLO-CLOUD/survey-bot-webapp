import {cn} from "@/lib/utils";
import {useTransitionRouter} from "next-view-transitions";
import {CheckCheck} from "lucide-react";
// import {ArrowUpRight, CheckCheck, Gift} from "lucide-react";
import axios from "axios";
import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";
import {initData, useSignal, popup} from "@telegram-apps/sdk-react";
import {SurveyType} from "@/app/types/survey";
import Image from "next/image";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";

const Survey = ({
                    id,
                    // userId,
                    title,
                    progress,
                    description
                }: SurveyType) => {
    // const [promoCode, setPromoCode] = useState<string | null>(null);
    //
    // const fetchPromoCode = async (surveyId, userId) => {
    //     try {
    //         const response = await axios.get('/api/get-promo', {headers: {userId: userId, surveyId: surveyId}});
    //         setPromoCode(response.data.promoCode); // Assuming the API returns { promoCode: "CODE123" }
    //     } catch (error) {
    //         console.error('Error fetching promo code:', error);
    //     }
    // };
    const router = useTransitionRouter();

    return (
        <div
            onClick={() => {
                if (progress === 100) {
                    // fetchPromoCode(id, userId).then()
                    return popup
                        .open({
                            title: 'Уведомление',
                            // message: `Твой промокод за прохождение опроса: ${promoCode}`,
                            message: "Опрос уже пройден.",
                            buttons: [{id: 'ok', type: 'ok'}]
                        })
                        .then(buttonId =>
                            console.log(buttonId === null
                                ? 'User did not click any button'
                                : `User clicked a button with ID "${buttonId}"`
                            )
                        )
                }
                router.push(`/survey/${id}`);
            }}
            className="group block w-full max-w-md cursor-pointer"
            style={{viewTransitionName: `card-${id}`}}
        >
            <div className={cn(
                "relative max-w-screen-sm rounded-2xl",
                "border border-zinc-200/50",
                `transition-all duration-300`,
                `hover:border-zinc-300/50`,
                progress === 100 && 'border-green-200/50 bg-green-50/50',
            )}>
                {/* CheckCheck */}
                {progress === 100 && <span className={`
                  absolute right-5 top-5 rounded-xl
                `} style={{viewTransitionName: `badge-${id}`}}>
                    <CheckCheck className="text-green-500"/>
                </span>}


                {/* Content Section */}
                <div className="p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="space-y-2.5">
                            <h3 className={`
                              font-mono text-xl font-bold leading-6
                            `} style={{viewTransitionName: `title-${id}`}}>
                                {title}
                            </h3>
                            <p className={`line-clamp-2 text-md`}
                               style={{viewTransitionName: `description-${id}`}}>
                                {description}
                            </p>
                        </div>
                        {/*<div className={cn(*/}
                        {/*    "self-end rounded-full p-2",*/}
                        {/*    `bg-black/5`,*/}
                        {/*    "backdrop-blur-md",*/}
                        {/*    `group-hover:bg-black/10`,*/}
                        {/*    "transition-colors duration-300"*/}
                        {/*)}>*/}
                        {/*    {progress < 100 ?*/}
                        {/*        <ArrowUpRight className={`h-4 w-4 text-zinc-800`}/> :*/}
                        {/*        <Gift className={`h-4 w-4 text-zinc-800`}/>*/}
                        {/*    }*/}
                        {/*</div>*/}
                    </div>
                </div>
                {progress > 0 && progress < 100 && <Progress value={progress} className={`
                  mx-5 my-2 w-auto
                `}/>}
            </div>
        </div>
    );
};

const SurveysList = () => {
    const [surveys, setSurveys] = useState<SurveyType[]>([]);
    const initDataState = useSignal(initData.state);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!api) {
            return;
        }

        setTimeout(() => {
            if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
                setCurrent(0);
                api.scrollTo(0);
            } else {
                api.scrollNext();
                setCurrent(current + 1);
            }
        }, 3000);
    }, [api, current]);
    useEffect(() => {
        const fetchSurveyList = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/api/get-survey-list', {headers: {userId: initDataState?.user?.id}});
                setSurveys(response.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurveyList().then();
    }, [initDataState]);

    return (
        <div className="flex flex-col gap-10">
            <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                    {surveys.length > 0 && surveys.map((survey, index) => (
                        <CarouselItem key={index}>
                            <Survey
                                key={survey.title}
                                {...survey}
                            />
                        </CarouselItem>
                    ))
                    }
                </CarouselContent>
            </Carousel>
            {loading && <div className={`flex w-full flex-col items-center`}><span>Идёт загрузка...</span></div>}
            {!loading && surveys.length <= 0 && <div className={`
              flex w-full flex-col items-center
            `}>
                <Image src="/upset.webp"
                       unoptimized
                       className={`h-20 w-20`} width={80}
                       height={80} alt={"Upset"}/>
                <span>Пока что, активных опросов нет.</span>
            </div>}
        </div>
    )
}

export default SurveysList;
