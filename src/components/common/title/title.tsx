import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/class-names';
import { PropConst } from '@/types/prop-const';

export type TrkTitleProps = {
    children: ReactNode;
    classNames?: Partial<TrkTitleClassNames>;
    tag?: string;
    size?: PropConst<typeof TrkTitleSizes>;
    variant?: PropConst<typeof TrkTitleVariants>;
};

export type TrkTitleClassNames = {
    title: string;
};

export type TrkTitleModClassNames = {
    [key in keyof TrkTitleClassNames]: Record<string, boolean>;
};

export const TrkTitleSizes = {
    XSmall: 'xs',
    Small: 'sm',
    Default: 'default',
    Large: 'lg',
    XLarge: 'xl',
    XXLarge: '2xl',
    XXXLarge: '3xl',
    XXXXLarge: '4xl'
} as const;

export const TrkTitleVariants = {
    Default: 'default',
    Subtle: 'subtle'
} as const;

export const TrkTitle: FC<TrkTitleProps> = ({ children, size, variant, tag, classNames }): JSX.Element => {
    size = size || TrkTitleSizes.Default;
    variant = variant || TrkTitleVariants.Default;

    const baseClassNames = useMemo<TrkTitleClassNames>(
        () => ({
            title: 'flex items-center gap-x-2'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTitleModClassNames>>(
        () => ({
            title: {
                'text-xs': size === TrkTitleSizes.XSmall,
                'text-sm': size === TrkTitleSizes.Small,
                'text-base': size === TrkTitleSizes.Default,
                'text-lg': size === TrkTitleSizes.Large,
                'text-xl': size === TrkTitleSizes.XLarge,
                'text-2xl': size === TrkTitleSizes.XXLarge,
                'text-3xl': size === TrkTitleSizes.XXXLarge,
                'text-4xl': size === TrkTitleSizes.XXXXLarge,
                'font-bold tracking-tight text-neutral-700': variant === TrkTitleVariants.Default,
                'font-semibold tracking-tight text-neutral-500': variant === TrkTitleVariants.Subtle
            }
        }),
        [size, variant]
    );

    const finalClassNames = useMemo<TrkTitleClassNames>(
        () =>
            resolveFinalClassNames<TrkTitleClassNames>(baseClassNames, modClassNames, classNames) as TrkTitleClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    const Tag = `${tag ? tag : 'span'}` as keyof JSX.IntrinsicElements;

    return <Tag className={finalClassNames.title}>{children}</Tag>;
};
