import React from "react";
import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Root} from "@/providers/root";
import "./globals.css";
import {ViewTransitions} from "next-view-transitions";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "white"
}

export const metadata: Metadata = {
    title: "TWA Starter",
    description: "Telegram WebApp Starter",
};

export default async function RootLayout({
                                             children
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="ru">
            <body
                className={`
                  ${geistSans.variable}
                  ${geistMono.variable}

                  absolute inset-0 h-screen w-screen overflow-hidden antialiased
                `}
            >
            <Root>
                {children}
            </Root>
            </body>
            </html>
        </ViewTransitions>
    );
}
