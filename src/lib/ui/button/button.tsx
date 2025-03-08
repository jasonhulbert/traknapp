import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';

export type TrkButtonProps = {
    children: ReactNode;
    classNames?: Partial<TrkButtonClassNames>;
    variant?: PropConst<typeof TrkButtonVariants>;
    theme?: PropConst<typeof TrkButtonThemes>;
    size?: PropConst<typeof TrkButtonSizes>;
    radiusSize?: PropConst<typeof TrkButtonRadiusSizes>;
    iconOnly?: boolean;
    onClick?: () => void;
};

export type TrkButtonClassNames = {
    button: string;
};

export type TrkButtonModClassNames = {
    [Key in keyof Partial<TrkButtonClassNames>]: Record<string, boolean>;
};

export const TrkButtonVariants = {
    DEFAULT: 'default',
    Flat: 'flat',
    Ghost: 'ghost',
    Outline: 'outline'
} as const;

export const TrkButtonThemes = {
    DEFAULT: 'default',
    Primary: 'primary',
    Danger: 'danger',
    Success: 'success'
} as const;

export const TrkButtonSizes = {
    Small: 'sm',
    DEFAULT: 'default',
    Medium: 'md',
    Large: 'lg'
} as const;

export const TrkButtonRadiusSizes = {
    Small: 'sm',
    DEFAULT: 'default',
    Medium: 'md',
    Large: 'lg',
    Full: 'full'
} as const;

export const TrkButton: FC<TrkButtonProps> = ({
    children,
    classNames,
    onClick,
    variant = TrkButtonVariants.DEFAULT,
    theme = TrkButtonThemes.DEFAULT,
    size = TrkButtonSizes.DEFAULT,
    radiusSize = TrkButtonRadiusSizes.DEFAULT,
    iconOnly = false
}): JSX.Element => {
    const baseClassNames = useMemo<TrkButtonClassNames>(
        () => ({
            button: 'appearance-none outline-hidden inline-flex items-center justify-center align-middle gap-x-2 font-semibold flex-nowrap whitespace-nowrap leading-none border-2 transition-all duration-200 focus-visible:ring-3 focus-visible:ring-primary-500 focus-visible:ring-opacity-30'
        }),
        []
    );

    const modClassNames = useMemo<TrkButtonModClassNames>(
        () => ({
            button: {
                'bg-neutral-500 text-background border-transparent hover:bg-opacity-90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.DEFAULT,
                'bg-primary-500 text-background border-transparent hover:bg-opacity-90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.Primary,
                'bg-danger-500 text-background border-transparent hover:bg-opacity-90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.Danger,
                'bg-success-500 text-background border-transparent hover:bg-opacity-90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.Success,
                'bg-neutral-500 bg-opacity-10 border-transparent text-neutral-500 hover:bg-opacity-20':
                    variant === TrkButtonVariants.Flat && theme === TrkButtonThemes.DEFAULT,
                'bg-primary-500 bg-opacity-10 border-transparent text-primary-500 hover:bg-opacity-20':
                    variant === TrkButtonVariants.Flat && theme === TrkButtonThemes.Primary,
                'bg-danger-500 bg-opacity-10 border-transparent text-danger-500 hover:bg-opacity-20':
                    variant === TrkButtonVariants.Flat && theme === TrkButtonThemes.Danger,
                'bg-success-500 bg-opacity-10 border-transparent text-success-500 hover:bg-opacity-20':
                    variant === TrkButtonVariants.Flat && theme === TrkButtonThemes.Success,
                'bg-neutral-500 bg-opacity-0 text-neutral-500 border-neutral-500 hover:bg-opacity-10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.DEFAULT,
                'bg-primary-500 bg-opacity-0 text-primary-500 border-primary-500 hover:bg-opacity-10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.Primary,
                'bg-danger-500 bg-opacity-0 text-danger-500 border-danger-500 hover:bg-opacity-10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.Danger,
                'bg-success-500 bg-opacity-0 text-success-500 border-success-500 hover:bg-opacity-10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.Success,
                'bg-neutral-500 bg-opacity-0 text-neutral-500 border-transparent hover:bg-opacity-10':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.DEFAULT,
                'bg-primary-500 bg-opacity-0 text-primary-500 border-transparent hover:bg-opacity-10':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.Primary,
                'bg-danger-500 bg-opacity-0 text-danger-500 border-transparent hover:bg-opacity-10':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.Danger,
                'bg-success-500 bg-opacity-0 text-success-500 border-transparent hover:bg-opacity-10':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.Success,
                'h-10 text-base': size == TrkButtonSizes.Small,
                'h-12 text-lg': size == TrkButtonSizes.DEFAULT,
                'h-14 text-xl': size == TrkButtonSizes.Medium,
                'h-16 text-2xl': size == TrkButtonSizes.Large,
                'px-3 py-2': !iconOnly && size === TrkButtonSizes.Small,
                'px-4 py-2': !iconOnly && size === TrkButtonSizes.DEFAULT,
                'px-5 py-3': !iconOnly && size === TrkButtonSizes.Medium,
                'px-8 py-5': !iconOnly && size === TrkButtonSizes.Large,
                'w-10 p-2': iconOnly && size === TrkButtonSizes.Small,
                'w-12 p-2': iconOnly && size === TrkButtonSizes.DEFAULT,
                'w-14 p-3': iconOnly && size === TrkButtonSizes.Medium,
                'w-16 p-5': iconOnly && size === TrkButtonSizes.Large,
                'rounded-sm': radiusSize === TrkButtonRadiusSizes.Small,
                rounded: radiusSize === TrkButtonRadiusSizes.DEFAULT,
                'rounded-md': radiusSize === TrkButtonRadiusSizes.Medium,
                'rounded-lg': radiusSize === TrkButtonRadiusSizes.Large,
                'rounded-full': radiusSize === TrkButtonRadiusSizes.Full
            }
        }),
        [variant, theme, size, iconOnly, radiusSize]
    );

    const finalClassNames = useMemo<TrkButtonClassNames>(
        () => resolveFinalClassNames<TrkButtonClassNames>(baseClassNames, modClassNames, classNames),
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <button className={finalClassNames.button} onClick={onClick}>
            {children}
        </button>
    );
};
