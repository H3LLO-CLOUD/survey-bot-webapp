"use client";

import {
    type PropsWithChildren,
    useEffect
} from "react";
import {
    useLaunchParams,
} from "@telegram-apps/sdk-react";

import {ErrorBoundary} from "@/components/tma/error-boundary";
import {ErrorPage} from "@/components/tma/error-page";
import {useDidMount} from "@/hooks/useDidMount";
import {useClientOnce} from "@/hooks/useClientOnce";
import {init} from "@/init";

function RootInner({children}: PropsWithChildren) {
    const isDev = process.env.NODE_ENV === "development";

    const lp = useLaunchParams();
    const debug = isDev || lp.startParam === "debug";

    // Initialize the library.
    useClientOnce(() => {
        init(debug);
    });

    // Enable debug mode to see all the methods sent and events received.
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        debug && import("eruda").then((lib) => lib.default.init());
    }, [debug]);

    return children;
}

export function Root(props: PropsWithChildren) {
    // Unfortunately, Telegram Mini Apps does not allow us to use all features of
    // the Server Side Rendering. That's why we are showing loader on the server
    // side.
    const didMount = useDidMount();

    return didMount ?
        <ErrorBoundary fallback={ErrorPage}>
            <RootInner {...props} />
        </ErrorBoundary>
        :
        <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="color-white">Загрузка...</h3>
        </div>;
}