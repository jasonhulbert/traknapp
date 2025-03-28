import { FC, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';

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
            global: 'grid grid-cols-[1fr_auto_1fr] items-center w-full h-auto py-2 px-4 gap-2',
            globalStart: 'flex justify-start items-center w-auto',
            globalMiddle: 'flex justify-center items-center w-auto',
            globalEnd: 'flex justify-end items-center w-auto'
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
