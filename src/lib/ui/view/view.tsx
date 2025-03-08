import { FC, useMemo } from 'react';
import { PropConst } from '../prop-const';
import { resolveFinalClassNames } from '../util/selectors';

export type TrkViewProps = {
    children: React.ReactNode;
    classNames?: Partial<TrkViewClassNames>;
    variant?: PropConst<typeof TrkViewVariant>;
};

export type TrkViewClassNames = {
    view: string;
};

export type TrkViewModClassNames = {
    [key in keyof TrkViewClassNames]?: Record<string, boolean>;
};

export const TrkViewVariant = {
    Default: 'default',
    Inset: 'inset'
} as const;

export const TrkView: FC<TrkViewProps> = ({ children, classNames, variant }) => {
    const baseClassNames: TrkViewClassNames = {
        view: 'block z-30'
    };

    const modClassNames = useMemo<TrkViewModClassNames>(
        () => ({
            view: {
                'p-4': variant === TrkViewVariant.Inset
            }
        }),
        [variant]
    );

    const finalClassNames = resolveFinalClassNames(baseClassNames, modClassNames, classNames);

    return <div className={finalClassNames.view}>{children}</div>;
};
