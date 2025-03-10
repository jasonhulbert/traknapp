import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';

export type TrkButtonProps = {
    id?: string;
    type?: 'button' | 'submit' | 'reset';
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
    id,
    type = 'button',
    variant = TrkButtonVariants.DEFAULT,
    theme = TrkButtonThemes.DEFAULT,
    size = TrkButtonSizes.DEFAULT,
    radiusSize = TrkButtonRadiusSizes.DEFAULT,
    iconOnly = false
}): JSX.Element => {
    const baseClassNames = useMemo<TrkButtonClassNames>(
        () => ({
            button: 'cursor-pointer appearance-none outline-hidden inline-flex items-center justify-center align-middle gap-x-2 font-semibold flex-nowrap whitespace-nowrap leading-none border transition-all transition-discrete duration-200 focus-visible:ring-2 focus-visible:ring-violet-500/50'
        }),
        []
    );

    const modClassNames = useMemo<TrkButtonModClassNames>(
        () => ({
            button: {
                'bg-black text-white border-transparent hover:bg-black/90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.DEFAULT,
                'bg-violet-500 text-white border-transparent hover:bg-violet-500/90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.Primary,
                'bg-red-500 text-white border-transparent hover:bg-red-500/90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.Danger,
                'bg-green-500 text-white border-transparent hover:bg-green-500/90':
                    variant === TrkButtonVariants.DEFAULT && theme === TrkButtonThemes.Success,
                'bg-black/0 text-stone-black/80 border-transparent hover:bg-black/10 hover:text-black/100':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.DEFAULT,
                'bg-violet-500/0 text-violet-500/80 border-transparent hover:bg-violet-500/10 hover:text-orang-500/100':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.Primary,
                'bg-red-500/0 text-red-500/80 border-transparent hover:bg-red-500/10 hover:text-red-500/100':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.Danger,
                'bg-green-500/0 text-green-500/80 border-transparent hover:bg-green-500/10 hover:text-green-500/100':
                    variant === TrkButtonVariants.Ghost && theme === TrkButtonThemes.Success,
                'bg-black/0 text-black border-black hover:bg-black/10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.DEFAULT,
                'bg-violet-500/0 text-violet-500 border-violet-500 hover:bg-violet-500/10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.Primary,
                'bg-red-500/0 text-red-500 border-red-500 hover:bg-red-500/10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.Danger,
                'bg-green-500/0 text-green-500 border-green-500 hover:bg-green-500/10':
                    variant === TrkButtonVariants.Outline && theme === TrkButtonThemes.Success,
                'h-10 text-sm': size == TrkButtonSizes.Small,
                'h-12 text-base': size == TrkButtonSizes.DEFAULT,
                'h-14 text-lg': size == TrkButtonSizes.Medium,
                'h-16 text-xl': size == TrkButtonSizes.Large,
                'px-2 py-1': !iconOnly && size === TrkButtonSizes.Small,
                'px-4 py-2': !iconOnly && size === TrkButtonSizes.DEFAULT,
                'px-6 py-4': !iconOnly && size === TrkButtonSizes.Medium,
                'px-8 py-6': !iconOnly && size === TrkButtonSizes.Large,
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
        <button className={finalClassNames.button} id={id} type={type} onClick={onClick}>
            {children}
        </button>
    );
};
