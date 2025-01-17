"use client"
import Link from 'next/link'
import {Button} from "@/components/ui/button";
import {BackButtonHandler} from "@/components/tma/back-button-handler";

export default function NotFound() {
    return (
        <BackButtonHandler>
            <h1 className="mb-6 text-2xl font-bold">404 🤔: Похоже, этот опрос сбежал от нас! 🚪💨</h1>
            <p>Мы не можем найти его, но можем предложить вам кое-что получше:</p>
            <Button asChild><Link href="/">Вернуться на главную</Link></Button>
            <p className="mt-6 text-xs accent-muted">Или подумать над вечным вопросом: &ldquo;Почему 404, а не 405?&rdquo;</p>
        </BackButtonHandler>
    )
}