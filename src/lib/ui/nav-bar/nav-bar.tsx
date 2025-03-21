'use client';

import { FC, JSX, useMemo } from 'react';
import { useNavBar } from './nav-bar-provider';
import { TrkNavBarMeta } from './nav-bar-meta';
import { resolveFinalClassNames } from '../util/selectors';
import { TrkTitle } from '../title/title';
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
    const { title, breadcrumbs, actions } = useNavBar();

    const baseClassNames = useMemo<TrkNavBarClassNames>(
        () => ({
            navBar: 'z-40 sticky inset-0 bottom-auto flex flex-wrap w-full h-auto bg-stone-200/40 backdrop-blur-md'
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

    return (
        <div className={finalClassNames.navBar}>
            <TrkNavBarGlobal slots={{ start: slots?.start, middle: slots?.middle, end: slots?.end }} />

            {(title || breadcrumbs || actions) && (
                <TrkNavBarMeta
                    breadcrumbs={breadcrumbs}
                    slots={{
                        title:
                            typeof title === 'string' ? (
                                <TrkTitle tag="h1" weight={600} truncate={true}>
                                    {title}
                                </TrkTitle>
                            ) : (
                                title
                            ),
                        actions
                    }}
                />
            )}
        </div>
    );
};
