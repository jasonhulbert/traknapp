import { FC, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/class-names';

export type TrkNavBarGlobalProps = {
    classNames?: Partial<TrkNavBarGlobalClassNames>;
    slots?: Partial<TrkNavBarGlobalSlots>;
};

export type TrkNavBarGlobalClassNames = {
    global: string;
    globalStart: string;
    globalMiddle: string;
    globalEnd: string;
};

export type TrkNavBarGlobalModClassNames = {
    [key in keyof TrkNavBarGlobalClassNames]?: Record<string, boolean>;
};

export type TrkNavBarGlobalSlots = {
    start: JSX.Element;
    middle: JSX.Element;
    end: JSX.Element;
};

export const TrkNavBarGlobal: FC<TrkNavBarGlobalProps> = ({ classNames, slots }) => {
    const baseClassNames = useMemo<TrkNavBarGlobalClassNames>(
        () => ({
            global: 'grid grid-cols-[25%_1fr_25%] items-center w-full h-16 p-4 border-b border-neutral-100',
            globalStart: 'mr-auto',
            globalMiddle: 'flex flex-1 justify-center items-center',
            globalEnd: 'ml-auto'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkNavBarGlobalModClassNames>>(() => ({}), []);

    const finalClassNames = useMemo<TrkNavBarGlobalClassNames>(
        () =>
            resolveFinalClassNames<TrkNavBarGlobalClassNames>(
                baseClassNames,
                modClassNames,
                classNames
            ) as TrkNavBarGlobalClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <div className={finalClassNames.global}>
            <div className={finalClassNames.globalStart}>{slots?.start}</div>
            <div className={finalClassNames.globalMiddle}>{slots?.middle}</div>
            <div className={finalClassNames.globalEnd}>{slots?.end}</div>
        </div>
    );
};
