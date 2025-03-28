'use client';

import { FC, JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { TrkNavBarGlobal } from './nav-bar-global';

export type TrkNavBarProps = {
    classNames?: Partial<TrkNavBarClassNames>;
    slots?: Partial<TrkNavBarSlots>;
};

export type TrkNavBarClassNames = {
    navBar: string;
};

export type TrkNavBarModClassNames = {
    [key in keyof TrkNavBarClassNames]: Record<string, boolean>;
};

export type TrkNavBarSlots = {
    start: JSX.Element;
    middle: JSX.Element;
    end: JSX.Element;
    title: JSX.Element;
    actions: JSX.Element;
};

export const TrkNavBar: FC<TrkNavBarProps> = ({ classNames, slots }) => {
    const navBarRef = useRef<HTMLDivElement>(null);

    const baseClassNames = useMemo<TrkNavBarClassNames>(
        () => ({
            navBar: 'z-40 sticky inset-0 bottom-auto flex flex-wrap w-full min-h-16 bg-gray-100/60 border-b border-gray-300/60 backdrop-blur-md'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkNavBarModClassNames>>(
        () => ({
            navBar: {}
        }),
        []
    );

    const finalClassNames = useMemo<TrkNavBarClassNames>(
        () =>
            resolveFinalClassNames<TrkNavBarClassNames>(
                baseClassNames,
                modClassNames,
                classNames
            ) as TrkNavBarClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    const handleResize = useCallback(() => {
        if (navBarRef.current) {
            document.body.style.setProperty('--trk-nav-bar-height', `${navBarRef.current.clientHeight}px`);
        }
    }, [navBarRef]);

    useEffect(() => {
        const observer = new ResizeObserver(handleResize);
        const ref = navBarRef.current;

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
            }

            observer.disconnect();
        };
    }, [navBarRef, handleResize]);

    return (
        <div ref={navBarRef} className={finalClassNames.navBar}>
            <TrkNavBarGlobal slots={{ start: slots?.start, middle: slots?.middle, end: slots?.end }} />
        </div>
    );
};
