import React from "react";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Root} from "@/providers/root";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
        <html lang="ru">
        <body
            className={`
              ${geistSans.variable}
              ${geistMono.variable}

              antialiased
            `}
        >
        <Root>
            <div className={
                `
                  flex h-screen max-h-screen flex-col items-center
                  justify-center gap-4 overflow-clip px-4
                `
            }>
                {children}
            </div>
        </Root>
        </body>
        </html>
    );
}
