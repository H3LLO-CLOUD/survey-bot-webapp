import { useEffect } from 'react';
import {Button} from "@/components/ui/button";
import {BackButtonHandler} from "@/components/tma/back-button-handler";

export function ErrorPage({
                              error,
                              reset,
                          }: {
    error: Error & { digest?: string }
    reset?: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <BackButtonHandler>
            <h2>An unhandled error occurred!</h2>
            <blockquote>
                <code>
                    {error.message}
                </code>
            </blockquote>
            {reset && <Button onClick={() => reset()}>Try again</Button>}
        </BackButtonHandler>
    );
}