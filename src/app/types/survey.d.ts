type AnswerVariantsType = {
    id: string;
    label: string;
    value: string;
}

type SurveyQuestionsType = {
    answerVariants: AnswerVariantsType[];
    description: string;
    id: string;
    index: number;
    title: string;
    range?: {
        min: number;
        max: number;
    }
    userAnswer: null | string;
    type: string;
}

type SurveyType = {
    id: number;
    userId: number;
    title: string;
    description: string;
    progress: number;
    createdAt?: Date;
    questions: SurveyQuestionsType[];
};

type SurveyBuilderProps = {
    initialSchema: SurveyType;
    userId?: number;
    title?: string;
    description?: string;
    surveyId?: string;
}

export { SurveyType, SurveyBuilderProps, AnswerVariantsType };