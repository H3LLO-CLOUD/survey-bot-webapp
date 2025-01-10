"use client";
import {Button} from "@/components/ui/button";
import {shareURL} from "@telegram-apps/sdk-react";
import {Plus} from "lucide-react";

export const SharePlusButton = ({roomId}: { roomId: number | string | undefined }) => {
    return <Button
        variant="default"
        size="icon"
        className={`
          h-8 w-8 rounded-full border border-zinc-200 bg-zinc-100

          dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:bg-zinc-700/50

          hover:bg-zinc-200
        `}
        onClick={() => (shareURL.isAvailable() && roomId !== undefined) && shareURL(`https://t.me/H4ckinSantaBot/app?startapp=join-room-${roomId}`, 'Присоединяйся к нашей игре в Тайного Санту! 🎅')}
    >
        <Plus className="h-4 w-4"/>
    </Button>
}