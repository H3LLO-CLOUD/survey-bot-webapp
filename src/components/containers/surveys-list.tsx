import {cn} from "@/lib/utils";
import {useTransitionRouter} from "next-view-transitions";
import Noise from "@/components/ui/noise";
import {ArrowUpRight} from "lucide-react";

type SurveyType = {
    surveyId: number;
    title: string;
    description: string;
    badge?: {
        text: string;
        variant: "pink" | "indigo" | "orange";
    };
    createdAt: Date;
};

const surveys: SurveyType[] = [
    {
        surveyId: 1000001,
        title: "Как улучшить рабочие процессы?",
        description: "Поделитесь своими идеями по оптимизации процессов в нашей команде.",
        createdAt: new Date(1673680000000),
    },
    {
        surveyId: 1000002,
        title: "Ваше мнение о гибридной работе",
        description: "Узнаем, что думают сотрудники о совмещении удалёнки и офиса.",
        createdAt: new Date(1673670000000),
    },
    {
        surveyId: 1000003,
        title: "Какие технологии стоит изучить в следующем квартале?",
        description: "Подскажите, на какие инструменты стоит сделать упор.",
        createdAt: new Date(1673690000000),
    },
    {
        surveyId: 1000004,
        title: "Как сделать корпоративы незабываемыми?",
        description: "Идеи для создания лучших мероприятий в компании.",
        createdAt: new Date(1673650000000),
    },
    {
        surveyId: 1000005,
        title: "Что бы вы изменили в нашем техстеке?",
        description: "Пусть ваш голос станет шагом к улучшениям.",
        createdAt: new Date(1673640000000),
    },
];

const twGradients = [
    "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500",
    "bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400",
    "bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500",
    "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500",
    "bg-gradient-to-r from-lime-400 via-green-500 to-teal-500",
    "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-500",
    "bg-gradient-to-r from-rose-400 via-fuchsia-500 to-purple-500",
    "bg-gradient-to-r from-amber-500 via-yellow-500 to-lime-500",
    "bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500",
    "bg-gradient-to-r from-blue-400 via-violet-500 to-purple-600",
    "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
    "bg-gradient-to-r from-red-400 via-red-600 to-red-700",
    "bg-gradient-to-r from-green-400 via-green-500 to-teal-600",
    "bg-gradient-to-r from-orange-400 via-orange-500 to-red-500",
    "bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-700",
    "bg-gradient-to-r from-cyan-500 via-teal-500 to-green-500",
    "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800",
    "bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500",
    "bg-gradient-to-r from-yellow-500 via-orange-400 to-red-400",
    "bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500"
];

const Survey = ({
                    surveyId, title, createdAt, description, gradientClass
                }: SurveyType & { gradientClass: string }) => {
    const router = useTransitionRouter();

    return (
        <div
            onClick={(e) => {
                e.preventDefault();
                router.push(`/survey/${surveyId}?gradient=${encodeURIComponent(gradientClass)}`);
            }}
            className={`group block w-full max-w-md cursor-pointer`}
            style={{viewTransitionName: `card-${surveyId}`}}
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl",
                "bg-white/80 backdrop-blur-xl",
                "dark:bg-zinc-900/80",
                "border border-zinc-200/50 shadow-sm",
                "dark:border-zinc-800/50",
                `
                  transition-all duration-300

                  hover:shadow-md
                `,
                `
                  dark:hover:border-zinc-700/50

                  hover:border-zinc-300/50
                `
            )}>
                {/* Gradient Background */}
                <div className={cn(
                    "absolute inset-0",
                    gradientClass // Use the gradient class here
                )}/>

                {/* Badge */}
                <div className="absolute right-3 top-3">
                    <span className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-medium",
                        "bg-white/90 text-zinc-800",
                        "dark:bg-zinc-900/90 dark:text-zinc-200",
                        "backdrop-blur-md",
                        "shadow-sm",
                        `
                          border border-white/20

                          dark:border-zinc-800/50
                        `
                    )}>
                        {createdAt.toLocaleString("ru-RU", {month: "short", day: "numeric"})}
                    </span>
                </div>

                {/* Noise Section */}
                <div className="relative min-h-[260px]">
                    <Noise
                        patternSize={250}
                        patternScaleX={1}
                        patternScaleY={1}
                        patternRefreshInterval={2}
                        patternAlpha={25}
                    />
                </div>

                {/* Content Section */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1.5">
                            <h3 className={`
                              font-mono text-2xl font-bold leading-snug
                              text-white

                              dark:text-zinc-100
                            `} style={{viewTransitionName: `title-${surveyId}`}}>
                                {title}
                            </h3>
                            <p className={`
                              line-clamp-2 text-md text-zinc-50

                              dark:text-zinc-300
                            `} style={{viewTransitionName: `description-${surveyId}`}}>
                                {description}
                            </p>
                        </div>
                        <div className={cn(
                            "self-end rounded-full p-2",
                            `
                              bg-white/10

                              dark:bg-zinc-800/50
                            `,
                            "backdrop-blur-md",
                            `
                              dark:group-hover:bg-zinc-700/50

                              group-hover:bg-white/20
                            `,
                            "transition-colors duration-300"
                        )}>
                            <ArrowUpRight className="h-4 w-4 text-white"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SurveysList = () => {

    return (
        <div className="flex w-full flex-col items-center gap-4 bg-white">
            {surveys.map((survey, index) => (
                <Survey
                    key={survey.title}
                    {...survey}
                    gradientClass={twGradients[index % twGradients.length]} // Assign gradients cyclically
                />
            ))}
        </div>
    );
};

export default SurveysList;
