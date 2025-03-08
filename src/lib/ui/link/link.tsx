import Link from 'next/link';
import { FC, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';

export type TrkLinkProps = {
    children: ReactNode;
    href: string;
    classNames?: Partial<TrkLinkClassNames>;
};

export type TrkLinkClassNames = {
    link: string;
};

export type TrkLinkModClassNames = {
    [Key in keyof Partial<TrkLinkClassNames>]: Record<string, boolean>;
};

export const TrkLink: FC<TrkLinkProps> = ({ children, href, classNames }) => {
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

    return (
        <Link className={finalClassNames.link} href={href}>
            {children}
        </Link>
    );
};
