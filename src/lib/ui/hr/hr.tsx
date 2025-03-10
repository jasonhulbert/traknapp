import { FC, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';

export type TrkHrProps = {
    classNames?: Partial<TrkHrClassNames>;
    spacing?: PropConst<typeof TrkHrSpacing>;
};

export type TrkHrClassNames = {
    hr: string;
};

export const TrkHrSpacing = {
    Default: 'default',
    Tight: 'tight',
    Loose: 'loose'
} as const;

export type TrkHrModClassNames = {
    [Key in keyof Partial<TrkHrClassNames>]: Record<string, boolean>;
};

export const TrkHr: FC<TrkHrProps> = ({ classNames, spacing }): JSX.Element => {
    const baseClassNames = useMemo<TrkHrClassNames>(
        () => ({
            hr: 'border-t border-stone-300 my-2'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkHrModClassNames>>(
        () => ({
            hr: {
                'my-2': spacing === TrkHrSpacing.Default,
                'my-1': spacing === TrkHrSpacing.Tight,
                'my-4': spacing === TrkHrSpacing.Loose
            }
        }),
        [spacing]
    );

    const finalClassNames = useMemo<TrkHrClassNames>(
        () => resolveFinalClassNames<TrkHrClassNames>(baseClassNames, modClassNames, classNames) as TrkHrClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return <hr className={finalClassNames.hr} />;
};
