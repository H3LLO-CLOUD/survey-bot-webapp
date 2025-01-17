import SurveyBuilder from "@/components/containers/survey-builder";
import {BackButtonHandler} from "@/components/tma/back-button-handler";

const surveySchema = {
    questions: [
        { id: 'q1', type: 'yesno', question: 'Do you like ice cream?' },
        {
            id: 'q2',
            type: 'single',
            question: 'What is your favorite color?',
            options: ['Red', 'Blue', 'Green'],
        },
        {
            id: 'q3',
            type: 'multi',
            question: 'Select your hobbies:',
            options: ['Reading', 'Gaming', 'Cooking'],
        },
        {
            id: 'q4',
            type: 'range',
            question: 'Rate your satisfaction:',
            range: { min: 1, max: 10 },
        },
        { id: 'q5', type: 'text', question: 'What is your name?' },
        { id: 'q6', type: 'number', question: 'How old are you?' },
    ],
};

export default function SurveyPage() {
    return (
        <BackButtonHandler>
        <div className="container mx-auto p-4">
            <SurveyBuilder schema={surveySchema} />
        </div>
        </BackButtonHandler>
    );
}
