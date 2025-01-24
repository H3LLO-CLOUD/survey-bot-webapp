import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { answerVariantId, questionId, surveyId, userId  } = body;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyId}/answer`, {
            questionId: questionId,
            answerVariantId: answerVariantId},
            {headers: {'userId': userId}}
        );

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const data = error.response?.data || { message: 'Internal Server Error' };

            return NextResponse.json(
                { message: 'API request failed', details: data },
                { status }
            );
        }

        return NextResponse.json(
            { message: 'Internal Server Error', details: error },
            { status: 500 }
        );
    }
}