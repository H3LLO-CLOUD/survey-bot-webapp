import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Root} from "@/providers/root";
import Particles from "@/components/ui/particles";

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

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Root>
            <div className="relative flex h-[100vh] max-w-screen bg-primary justify-center overflow-clip">
                {children}
                <Particles
                    className="absolute inset-0"
                    quantity={100}
                    ease={80}
                    color="#ffffff"
                    refresh
                />
            </div>
        </Root>
        </body>
        </html>
);
}
