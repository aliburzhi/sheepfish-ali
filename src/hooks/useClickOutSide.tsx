import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: () => void) => {
    const domNode = useRef<EventTarget | null>(null);

    useEffect(() => {
        const maybeHandler = (event: MouseEvent) => {
            //@ts-ignore
            if (!domNode?.current?.contains(event.target as Node)) {
                handler();
            }
        };

        document.body.addEventListener('mousedown', maybeHandler);

        return () => {
            document.body.removeEventListener('mousedown', maybeHandler);
        };
    });

    return domNode;
};