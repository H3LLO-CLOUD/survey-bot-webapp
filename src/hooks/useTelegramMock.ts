import { parseInitData, isTMA, mockTelegramEnv } from '@telegram-apps/sdk-react';

import { useClientOnce } from '@/hooks/useClientOnce';

/**
 * Mocks Telegram environment in development mode.
 */
export function useTelegramMock(): void {
    useClientOnce(() => {
        let shouldMock: boolean;
        const MOCK_KEY = '____mocked';

        // We don't mock if we are already in a mini app.
        if (isTMA('simple')) {
            // We could previously mock the environment.
            // In case we did, we should do it again.
            // The reason is the page could be reloaded, and we should apply mock again, because
            // mocking also enables modifying the window object.
            shouldMock = !!sessionStorage.getItem(MOCK_KEY);
        } else {
            shouldMock = true;
        }

        if (!shouldMock) {
            return;
        }

        const initDataRaw = JSON.stringify({
            user: {
                id: 99281932,
                first_name: 'N V',
                last_name: '',
                username: 'nvmxre',
                language_code: 'ru',
                is_premium: true,
                allows_write_to_pm: true,
            },
            hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
            auth_date: '1716922846',
            start_param: 'debug',
            chat_type: 'sender',
            chat_instance: '8428209589180549439',
        });

        mockTelegramEnv({
            themeParams: {
                accentTextColor: '#6ab2f2',
                bgColor: '#17212b',
                buttonColor: '#5288c1',
                buttonTextColor: '#ffffff',
                destructiveTextColor: '#ec3942',
                headerBgColor: '#17212b',
                hintColor: '#708499',
                linkColor: '#6ab3f3',
                secondaryBgColor: '#232e3c',
                sectionBgColor: '#17212b',
                sectionHeaderTextColor: '#6ab3f3',
                subtitleTextColor: '#708499',
                textColor: '#f5f5f5',
            },
            initData: JSON.parse(initDataRaw),
            initDataRaw,
            version: '8',
            platform: 'tdesktop',
        });
        sessionStorage.setItem(MOCK_KEY, '1');

        console.info(
            '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
        );
    });
}