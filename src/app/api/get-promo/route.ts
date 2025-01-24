import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const userId = request.headers.get('userId');
    const surveyId = request.headers.get('surveyId');

    if (!userId || !surveyId) {
        return NextResponse.json(
            { error: 'Missing userId or surveyId in headers' },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/code/${surveyId}`, {
            headers: {
                userId,
            },
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error('Error fetching promo:', error);

        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const message = error.response?.data?.message || 'Error fetching promo';

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