"use client"
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import {useParams} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import SurveyBuilder from "@/components/containers/survey-builder";
import {useEffect, useState} from "react";
import {initData, useSignal} from "@telegram-apps/sdk-react";
import axios from "axios";
import {SurveyType} from "@/app/types/survey";

// const surveySchema = {
//     questions: [
//         {id: 'q1', type: 'yesno', question: 'Do you like ice cream?'},
//         {
//             id: 'q2',
//             type: 'single',
//             question: 'What is your favorite color?',
//             options: ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Black', 'White'],
//         },
//         {
//             id: 'q3',
//             type: 'multi',
//             question: 'Select your hobbies:',
//             options: ['Reading', 'Gaming', 'Cooking'],
//         },
//         {
//             id: 'q4',
//             type: 'range',
//             question: 'Rate your satisfaction:',
//             range: {min: 1, max: 10},
//         },
//         {id: 'q5', type: 'text', question: 'What is your name?'},
//         {id: 'q6', type: 'number', question: 'How old are you?'},
//     ],
// };

const Page = () => {
    const [survey, setSurvey] = useState<SurveyType>();
    const params = useParams<{ surveyId: string }>()
    const initDataState = useSignal(initData.state);
    useEffect(() => {
        const fetchSurvey = async () => {
            try {
                const response = await axios.get('/api/get-survey', {
                    headers: {
                        userId: initDataState?.user?.id,
                        surveyId: params.surveyId
                    }
                });
                setSurvey(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSurvey().then();
    }, [initDataState?.user?.id, params.surveyId]);
    console.log(survey)
    if (!survey) return;

    return (
        <BackButtonHandler>
            {/* Badge */}
            <div className={`relative flex w-full flex-col items-center`}>
                {survey?.createdAt &&
                    <Badge variant="subtle" className={`
                      absolute right-2 top-2 rounded-xl
                    `} style={{viewTransitionName: `badge-${params.surveyId}`}}>
                        {survey.createdAt.toLocaleString("ru-RU", {month: "short", day: "numeric"})}
                    </Badge>
                }
                <div className="container mx-auto">
                    <SurveyBuilder initialSchema={survey} surveyId={params.surveyId} title={survey.title}
                                   description={survey.description} userId={initDataState?.user?.id}/>
                </div>
            </div>
        </BackButtonHandler>
    )
}

export default Page;