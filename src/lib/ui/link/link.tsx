import Link from 'next/link';
import { FC, ReactNode, useEffect, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';

export type TrkLinkProps = {
    children: ReactNode;
    href?: string;
    routerHref?: string;
    classNames?: Partial<TrkLinkClassNames>;
};

export type TrkLinkClassNames = {
    link: string;
};

export type TrkLinkModClassNames = {
    [Key in keyof Partial<TrkLinkClassNames>]: Record<string, boolean>;
};

export const TrkLink: FC<TrkLinkProps> = ({ children, href, routerHref, classNames }) => {
    const baseClassNames = useMemo<TrkLinkClassNames>(
        () => ({
            link: 'text-primary-500'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkLinkModClassNames>>(
        () => ({
            link: {}
        }),
        []
    );

    const finalClassNames = useMemo(
        () => resolveFinalClassNames<TrkLinkClassNames>(baseClassNames, modClassNames, classNames) as TrkLinkClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    useEffect(() => {
        if (!href && !routerHref) {
            throw new Error('Either `href` or `routerHref` must be provided');
        }
    }, [href, routerHref]);

    return !href && !routerHref ? null : routerHref ? (
        <Link className={finalClassNames.link} href={routerHref}>
            {children}
        </Link>
    ) : (
        <a href={href} className={finalClassNames.link}>
            {children}
        </a>
    );
};
