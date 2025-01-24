import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, firstName, lastName, languageCode, username, allowsWriteToPm } = body;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            id,
            firstName,
            lastName,
            languageCode,
            username,
            allowsWriteToPm
        });

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const data = error.response?.data || { message: 'Internal Server Error' };

            if (status === 409) {
                return NextResponse.json(
                    { message: 'Conflict: User already exists', details: data },
                    { status: 409 }
                );
            }

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