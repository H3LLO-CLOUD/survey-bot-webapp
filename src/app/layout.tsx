import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Root} from "@/providers/root";
import Particles from "@/components/ui/particles";
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
    title: "H4ckin.. Santa!",
    description: "Ho ho ho!",
};

export default async function RootLayout({
                                             children
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <body
            className={`${geistSans.variable} ${geistMono.variable} bg-primary antialiased`}
        >
        <Root>
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color="#ffffff"
                refresh
            />
            <div className="relative flex h-[100vh] max-w-screen justify-center overflow-clip">
                {children}
            </div>
        </Root>
        </body>
        </html>
    );
}
