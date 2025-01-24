'use client';

import { backButton } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import {useTransitionRouter} from "next-view-transitions";

export function BackButtonHandler({ children, back = true }: PropsWithChildren<{
    /**
     * True if it is allowed to go back from this page.
     */
    back?: boolean
}>) {
    const router = useTransitionRouter()

        useEffect(() => {
        if (back) {
            backButton.show();
            return backButton.onClick(() => {
                router.back();
            });
        }
        backButton.hide();
    }, [back, router]);

    return <>{children}</>;
}