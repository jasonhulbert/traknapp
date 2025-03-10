import { FC, useMemo } from 'react';
import { PropConst } from '../prop-const';
import { resolveFinalClassNames } from '../util/selectors';
import { Loader } from 'lucide-react';

export type TrkLoadingProps = {
    classNames?: Partial<TrkLoadingClassNames>;
    size?: PropConst<typeof TrkLoadingSize>;
    variant?: PropConst<typeof TrkLoadingVariant>;
    theme?: PropConst<typeof TrkLoadingTheme>;
};

export const TrkLoadingSize = {
    Small: 'sm',
    Default: 'default',
    Large: 'lg'
} as const;

export const TrkLoadingVariant = {
    Default: 'default',
    Overlay: 'overlay'
} as const;

export const TrkLoadingTheme = {
    Default: 'defualt',
    Primary: 'primary'
} as const;

export type TrkLoadingClassNames = {
    loading: string;
    loadingIndicator: string;
};

export type TrkLoadingModClassNames = {
    [Key in keyof Partial<TrkLoadingClassNames>]: Record<string, boolean>;
};

export const TrkLoading: FC<TrkLoadingProps> = ({
    classNames,
    variant,
    theme = TrkLoadingTheme.Default,
    size = TrkLoadingSize.Default
}) => {
    const baseClassNames = useMemo<TrkLoadingClassNames>(
        () => ({
            loading: 'inline-flex items-center justify-center',
            loadingIndicator: 'block h-auto animate-spin'
        }),
        []
    );

    const modClassNames = useMemo<TrkLoadingModClassNames>(
        () => ({
            loading: {
                'absolute inset-0 w-full h-full': variant === TrkLoadingVariant.Overlay
            },
            loadingIndicator: {
                'w-4': size === TrkLoadingSize.Small,
                'w-8': size === TrkLoadingSize.Default,
                'w-12': size === TrkLoadingSize.Large,
                'text-stone-500': theme === TrkLoadingTheme.Default,
                'text-violet-500': theme === TrkLoadingTheme.Primary
            }
        }),
        [variant, size, theme]
    );

    const finalClassNames = useMemo<TrkLoadingClassNames>(() => {
        return resolveFinalClassNames(baseClassNames, modClassNames, classNames);
    }, [baseClassNames, modClassNames, classNames]);

    return (
        <div className={finalClassNames.loading}>
            <Loader className={finalClassNames.loadingIndicator} />
        </div>
    );
};
