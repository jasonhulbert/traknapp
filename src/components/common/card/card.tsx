import { FC, JSX, ReactNode, useMemo } from 'react';
import { PropConst } from '../../../types/prop-const';
import { resolveFinalClassNames } from '../util/class-names';

export type TrkCardProps = {
    children: ReactNode;
    classNames?: Partial<TrkCardClassNames>;
    variant?: PropConst<typeof TrkCardVariants>;
};

export type TrkCardClassNames = {
    card: string;
};

export type TrkCardModClassNames = {
    card: Record<string, boolean>;
};

export const TrkCardVariants = {
    Default: 'default',
    Glass: 'glass'
} as const;

export const TrkCard: FC<TrkCardProps> = ({ children, classNames, variant }): JSX.Element => {
    variant = variant || TrkCardVariants.Default;

    const baseClassNames = useMemo<TrkCardClassNames>(
        () => ({
            card: 'flex flex-col rounded-lg overflow-hidden border'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkCardModClassNames>>(
        () => ({
            card: {
                'bg-background border-neutral-200': variant === TrkCardVariants.Default,
                'bg-gradient-to-br from-background from-0% via-neutral-50 via-20% to-background to-100% bg-opacity-50 backdrop-blur-md border-neutral-200':
                    variant === TrkCardVariants.Glass
            }
        }),
        [variant]
    );

    const finalClassNames = useMemo<TrkCardClassNames>(
        () => resolveFinalClassNames<TrkCardClassNames>(baseClassNames, modClassNames, classNames) as TrkCardClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return <div className={finalClassNames.card}>{children}</div>;
};
