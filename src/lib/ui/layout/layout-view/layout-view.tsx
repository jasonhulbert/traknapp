import { FC, useMemo } from 'react';
import { PropConst } from '../../prop-const';
import { resolveFinalClassNames } from '../../util/selectors';
import { TrkLoading } from '../../loading/loading';

export type TrkLayoutViewProps = {
    children: React.ReactNode;
    classNames?: Partial<TrkLayoutViewClassNames>;
    variant?: PropConst<typeof TrkLayoutViewVariant>;
    isLoading?: boolean;
};

export type TrkLayoutViewClassNames = {
    view: string;
    viewLoading: string;
};

export type TrkLayoutViewModClassNames = {
    [key in keyof TrkLayoutViewClassNames]?: Record<string, boolean>;
};

export const TrkLayoutViewVariant = {
    Default: 'default',
    Inset: 'inset'
} as const;

export const TrkLayoutView: FC<TrkLayoutViewProps> = ({ children, classNames, variant, isLoading }) => {
    const baseClassNames: TrkLayoutViewClassNames = {
        view: 'relative block',
        viewLoading: 'absolute inset-0 flex items-center justify-center bg-background/60'
    };

    const modClassNames = useMemo<TrkLayoutViewModClassNames>(
        () => ({
            view: {
                'p-4': variant === TrkLayoutViewVariant.Inset
            }
        }),
        [variant]
    );

    const finalClassNames = resolveFinalClassNames(baseClassNames, modClassNames, classNames);

    return (
        <div className={finalClassNames.view}>
            {children}
            {isLoading && (
                <div className={finalClassNames.viewLoading}>
                    <TrkLoading />
                </div>
            )}
        </div>
    );
};
