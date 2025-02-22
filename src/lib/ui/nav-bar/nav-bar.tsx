'use client';

import { FC, JSX, useEffect, useMemo } from 'react';
import { useNavBar } from './nav-bar-provider';
import { TrkNavBarMeta } from './nav-bar-meta';
import { resolveFinalClassNames } from '../util/class-names';
import { TrkTitle } from '../title/title';
import { TrkNavBarGlobal } from './nav-bar-global';
import { usePathname, useSearchParams } from 'next/navigation';

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
    const { title, breadcrumbs, actions, setTitle, setBreadcrumbs, setActions } = useNavBar();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const baseClassNames = useMemo<TrkNavBarClassNames>(
        () => ({
            navBar: 'sticky inset-0 bottom-auto flex flex-col w-full h-auto bg-neutral-100/60 backdrop-blur-md shadow-md'
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

    // Reset title, breadcrumbs, and actions whenever route pathname or search params change
    useEffect(() => {
        setTitle('');
        setBreadcrumbs([]);
        setActions(<></>);
    }, [pathname, searchParams, setTitle, setBreadcrumbs, setActions]);

    return (
        <div className={finalClassNames.navBar}>
            <TrkNavBarGlobal slots={{ start: slots?.start, middle: slots?.middle, end: slots?.end }} />

            <TrkNavBarMeta
                breadcrumbs={breadcrumbs}
                slots={{
                    title:
                        typeof title === 'string' ? (
                            <TrkTitle tag="h1" truncate={true}>
                                {title}
                            </TrkTitle>
                        ) : (
                            title
                        ),
                    actions
                }}
            />
        </div>
    );
};
