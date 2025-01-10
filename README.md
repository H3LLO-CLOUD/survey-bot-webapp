Это стартовый шаблон для создания [Telegram Web Apps](https://core.telegram.org/bots/webapps), использующий Next.js,
Tailwind CSS, Shadcn UI.

## Начало работы

- Создайте бота и webapp через [@BotFather](https://t.me/BotFather).
- Чтобы была возможность локальной разработки с поддержкой Hot Reload, при создании webapp внутри бота, укажите
  `https://127.0.0.1:3000` в качестве web app URL.
- Запустите локальный сервер:

```bash
npm run dev:https
# или
yarn dev:https
# или
pnpm dev:https
# или
bun dev:https
```

Теперь вы можете открыть своё локальное приложение внутри Telegram.

Начните редактировать `app/page.tsx`. При редактировании вы будете видеть изменения без перезагрузки.

## Полезные ссылки

- [Telegram Web Apps](https://core.telegram.org/bots/webapps) - документация Telegram Web Apps.
- [@telegram-apps/sdk-react](https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react/2-x) - документация
  `@telegram-apps/sdk-react`.
- [Next.js Documentation](https://nextjs.org/docs) - документация Next.js.
- [shadcn/ui](https://ui.shadcn.com/docs) - документация shadcn/ui.
