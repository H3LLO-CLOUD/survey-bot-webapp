import axios from 'axios';

export async function GET(request: Request) {
    const userId = request.headers.get('userId');

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/survey`, {
            headers: {
                userId,
            },
        });

        return new Response(JSON.stringify(response.data), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching survey:', error);

        return new Response(
            JSON.stringify({error: 'Error fetching survey'}),
            {status: 500}
        );
    }
}