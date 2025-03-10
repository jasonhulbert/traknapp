import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '@/lib/ui/prop-const';
import { fontSansTight } from '@/lib/fonts/fonts';

export type TrkTitleProps = {
    children: ReactNode;
    classNames?: Partial<TrkTitleClassNames>;
    tag?: string;
    size?: PropConst<typeof TrkTitleSizes>;
    weight?: PropConst<typeof TrkTitleWeights>;
    truncate?: boolean;
};

export type TrkTitleClassNames = {
    title: string;
};

export type TrkTitleModClassNames = {
    [key in keyof TrkTitleClassNames]: Record<string, boolean>;
};

export const TrkTitleWeights = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular: 400,
    Medium: 500,
    Semibold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900
} as const;

export const TrkTitleSizes = {
    XSmall: 'xs',
    Small: 'sm',
    Default: 'default',
    Large: 'lg',
    XLarge: 'xl',
    X2Large: '2xl',
    X3Large: '3xl',
    X4Large: '4xl',
    X5Large: '5xl',
    X6Large: '6xl'
} as const;

export const TrkTitleOptions = {
    Truncate: 'truncate'
} as const;

export const TrkTitle: FC<TrkTitleProps> = ({
    children,
    classNames,
    truncate,
    tag,
    size = TrkTitleSizes.Default,
    weight = TrkTitleWeights.Medium
}): JSX.Element => {
    size = size || TrkTitleSizes.Default;

    const baseClassNames = useMemo<TrkTitleClassNames>(
        () => ({
            title: `block ${fontSansTight.className}`
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTitleModClassNames>>(
        () => ({
            title: {
                truncate: !!truncate,
                'text-xs': size === TrkTitleSizes.XSmall,
                'text-sm': size === TrkTitleSizes.Small,
                'text-base': size === TrkTitleSizes.Default,
                'text-lg': size === TrkTitleSizes.Large,
                'text-xl': size === TrkTitleSizes.XLarge,
                'text-2xl': size === TrkTitleSizes.X2Large,
                'text-3xl': size === TrkTitleSizes.X3Large,
                'text-4xl': size === TrkTitleSizes.X4Large,
                'text-5xl': size === TrkTitleSizes.X5Large,
                'text-6xl': size === TrkTitleSizes.X6Large,
                'font-thin': weight === TrkTitleWeights.Thin,
                'font-extralight': weight === TrkTitleWeights.ExtraLight,
                'font-light': weight === TrkTitleWeights.Light,
                'font-normal': weight === TrkTitleWeights.Regular,
                'font-medium': weight === TrkTitleWeights.Medium,
                'font-semibold': weight === TrkTitleWeights.Semibold,
                'font-bold': weight === TrkTitleWeights.Bold,
                'font-extrabold': weight === TrkTitleWeights.ExtraBold,
                'font-black': weight === TrkTitleWeights.Black
            }
        }),
        [size, weight, truncate]
    );

    const finalClassNames = useMemo<TrkTitleClassNames>(
        () =>
            resolveFinalClassNames<TrkTitleClassNames>(baseClassNames, modClassNames, classNames) as TrkTitleClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    const Tag = `${tag ? tag : 'span'}` as keyof JSX.IntrinsicElements;

    return <Tag className={finalClassNames.title}>{children}</Tag>;
};
