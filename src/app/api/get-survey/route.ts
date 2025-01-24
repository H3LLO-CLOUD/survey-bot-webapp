import axios from 'axios';
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const userId = request.headers.get('userId');
    const surveyId = request.headers.get('surveyId');
    console.log(userId, surveyId)

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/survey/${surveyId}`, {
            headers: {
                userId,
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching survey:', error);

        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Error fetching survey';

            return NextResponse.json(
                { error: message },
                { status }
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}