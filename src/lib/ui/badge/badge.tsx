import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';

export interface TrkBadgeProps {
    children: ReactNode;
    classNames?: Partial<TrkBadgeClassNames>;
    theme?: PropConst<typeof TrkBadgeThemes>;
    variant?: PropConst<typeof TrkBadgeVariants>;
    onClick?: () => void;
}

export type TrkBadgeClassNames = {
    badge: string;
};

export type TrkBadgeModClassNames = {
    [Key in keyof Partial<TrkBadgeClassNames>]: Record<string, boolean>;
};

export const TrkBadgeVariants = {
    DEFAULT: 'default',
    Outline: 'outline'
} as const;

export const TrkBadgeThemes = {
    DEFAULT: 'default'
} as const;

export const TrkBadge: FC<TrkBadgeProps> = ({
    children,
    classNames,
    onClick,
    variant = TrkBadgeVariants.DEFAULT,
    theme = TrkBadgeThemes.DEFAULT
}): JSX.Element => {
    const baseClassNames = useMemo<TrkBadgeClassNames>(
        () => ({
            badge: 'inline-flex items-center w-auto py-1 px-2 text-xs font-medium leading-none border rounded-full'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkBadgeModClassNames>>(
        () => ({
            badge: {
                'bg-gray-200/50 text-gray-700 border-transparent':
                    theme === TrkBadgeThemes.DEFAULT && variant === TrkBadgeVariants.DEFAULT,
                'bg-transparent text-gray-700 border-gray-500':
                    theme === TrkBadgeThemes.DEFAULT && variant === TrkBadgeVariants.Outline
            }
        }),
        [theme, variant]
    );

    const finalClassNames = useMemo<TrkBadgeClassNames>(
        () => resolveFinalClassNames<TrkBadgeClassNames>(baseClassNames, modClassNames, classNames),
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <span className={finalClassNames.badge} onClick={onClick}>
            {children}
        </span>
    );
};
