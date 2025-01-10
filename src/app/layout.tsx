import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Root} from "@/providers/root";
import React from "react";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WebApp",
    description: "Telegram WebApp Boilerplate",
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
