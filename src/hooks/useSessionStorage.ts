import React, {useState, useEffect} from "react";

const useSessionStorage = <T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        let currentValue: T;

        try {
            currentValue = JSON.parse(
                sessionStorage.getItem(key) || JSON.stringify(defaultValue)
            ) as T;
        } catch (error) {
            console.log(error);
            currentValue = defaultValue;
        }

        return currentValue;
    });

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};

export default useSessionStorage;