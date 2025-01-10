import {
    backButton,
    viewport,
    miniApp,
    initData,
    $debug,
    init as initSDK, swipeBehavior, themeParams,
} from '@telegram-apps/sdk-react';

/**
 * Initializes the application and configures its dependencies.
 */
export async function init(debug: boolean): Promise<void> {
    // Set @telegram-apps/sdk-react debug mode.
    $debug.set(debug);

    // Initialize special event handlers for Telegram Desktop, Android, iOS, etc.
    // Also, configure the package.
    initSDK();

    // Mount all components used in the project.
    if (backButton.isSupported()) {
        backButton.mount();
    }

    // Define components-related CSS variables.
    if (!miniApp.isMounted()) {
        miniApp.mount();
        miniApp.bindCssVars();
    }
    if (!themeParams.isMounted()) {
        themeParams.mount();
        themeParams.bindCssVars();
    }

    initData.restore();

    if (!viewport.isMounted() && !viewport.isMounting()) {
        void viewport.mount().catch((e) => {
            console.error("Something went wrong mounting the viewport", e);
        }).then(() => {
            if (viewport.requestFullscreen.isSupported() && !viewport.isFullscreen()) viewport.requestFullscreen()
        });
    }

    if (viewport.isMounted()) {
        viewport.bindCssVars();
    }


    if (!swipeBehavior.isMounted()) {
        swipeBehavior.mount();
        swipeBehavior.disableVertical();
    }
}