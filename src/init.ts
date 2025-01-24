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
    }

    if (miniApp.bindCssVars.isAvailable()) {
        miniApp.bindCssVars();
    }

    if (!themeParams.isMounted()) {
        themeParams.mount();
    }

    if (themeParams.bindCssVars.isAvailable()) {
        themeParams.bindCssVars();
    }

    if (!viewport.isMounted() && !viewport.isMounting()) {
        void viewport.mount().catch((e) => {
            console.error("Something went wrong mounting the viewport", e);
        }).then(() => {
            // Make app Fullscreen if available
            if (viewport.requestFullscreen.isSupported() && viewport.requestFullscreen.isAvailable() && !viewport.isFullscreen()) viewport.requestFullscreen()
        });
    }

    if (viewport.bindCssVars.isAvailable()) {
        viewport.bindCssVars();
    }

    // Disable vertical swipes
    if (!swipeBehavior.isMounted()) {
        swipeBehavior.mount();
    }

    if (swipeBehavior.disableVertical.isAvailable()) {
        swipeBehavior.disableVertical();
    }

    // Restore initData
    initData.restore();
}