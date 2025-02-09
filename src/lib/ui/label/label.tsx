import { FC, JSX, useMemo } from 'react';
import { joinClassNames } from '../util/class-names';

export type TrkLabelProps = {
    children: JSX.Element;
    classNames?: Partial<TrkLabelClassNames>;
};

export type TrkLabelClassNames = {
    label: string;
};

export const TrkLabelVariants = {
    Default: 'default'
} as const;

export const TrkLabel: FC<TrkLabelProps> = ({ children, classNames }): JSX.Element => {
    const baseClassNames = useMemo<TrkLabelClassNames>(
        () => ({
            label: 'block text-neutral-800 font-semibold'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkLabelClassNames>>(
        () => ({
            label: ''
        }),
        []
    );

    const finalClassNames = useMemo<TrkLabelClassNames>(
        () => ({
            label: joinClassNames([baseClassNames.label, modClassNames.label, classNames?.label])
        }),
        [baseClassNames, modClassNames, classNames]
    );

    return <label className={finalClassNames.label}>{children}</label>;
};
