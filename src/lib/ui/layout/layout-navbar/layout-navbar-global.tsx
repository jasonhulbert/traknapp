import { FC, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../../util/selectors';

export type TrkNavbarGlobalProps = {
    classNames?: Partial<TrkNavbarGlobalClassNames>;
    slots?: Partial<TrkNavbarGlobalSlots>;
};

export type TrkNavbarGlobalClassNames = {
    global: string;
    globalStart: string;
    globalMiddle: string;
    globalEnd: string;
};

export type TrkNavbarGlobalModClassNames = {
    [key in keyof TrkNavbarGlobalClassNames]?: Record<string, boolean>;
};

export type TrkNavbarGlobalSlots = {
    start: JSX.Element;
    middle: JSX.Element;
    end: JSX.Element;
};

export const TrkNavbarGlobal: FC<TrkNavbarGlobalProps> = ({ classNames, slots }) => {
    const baseClassNames = useMemo<TrkNavbarGlobalClassNames>(
        () => ({
            global: 'grid grid-cols-[1fr_auto_1fr] items-center w-full h-auto py-2 px-4 gap-2',
            globalStart: 'flex justify-start items-center w-auto',
            globalMiddle: 'flex justify-center items-center w-auto',
            globalEnd: 'flex justify-end items-center w-auto'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkNavbarGlobalModClassNames>>(() => ({}), []);

    const finalClassNames = useMemo<TrkNavbarGlobalClassNames>(
        () => resolveFinalClassNames<TrkNavbarGlobalClassNames>(baseClassNames, modClassNames, classNames),
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
