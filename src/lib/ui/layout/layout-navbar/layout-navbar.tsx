'use client';

import { FC, JSX, useCallback, useEffect, useMemo, useRef } from 'react';
import { resolveFinalClassNames } from '../../util/selectors';
import { TrkNavbarGlobal } from './layout-navbar-global';

export type TrkNavbarProps = {
    classNames?: Partial<TrkNavbarClassNames>;
    slots?: Partial<TrkNavbarSlots>;
};

export type TrkNavbarClassNames = {
    navBar: string;
};

export type TrkNavbarModClassNames = {
    [key in keyof TrkNavbarClassNames]: Record<string, boolean>;
};

export type TrkNavbarSlots = {
    start: JSX.Element;
    middle: JSX.Element;
    end: JSX.Element;
    title: JSX.Element;
    actions: JSX.Element;
};

export const TrkNavbar: FC<TrkNavbarProps> = ({ classNames, slots }) => {
    const navBarRef = useRef<HTMLDivElement>(null);

    const baseClassNames = useMemo<TrkNavbarClassNames>(
        () => ({
            navBar: 'z-40 sticky inset-0 bottom-auto flex flex-wrap w-full min-h-16 bg-gray-100/60 border-b border-gray-300/60 backdrop-blur-md'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkNavbarModClassNames>>(
        () => ({
            navBar: {}
        }),
        []
    );

    const finalClassNames = useMemo<TrkNavbarClassNames>(
        () => resolveFinalClassNames<TrkNavbarClassNames>(baseClassNames, modClassNames, classNames),
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
            <TrkNavbarGlobal slots={{ start: slots?.start, middle: slots?.middle, end: slots?.end }} />
        </div>
    );
};
