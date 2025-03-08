import { FC, JSX, PropsWithChildren, useMemo } from 'react';
import { joinClassNames } from '../util/selectors';

export type TrkLabelProps = PropsWithChildren<{
    classNames?: Partial<TrkLabelClassNames>;
    htmlFor?: string;
}>;

export type TrkLabelClassNames = {
    label: string;
};

export const TrkLabelVariants = {
    Default: 'default'
} as const;

export const TrkLabel: FC<TrkLabelProps> = ({ children, classNames, htmlFor }): JSX.Element => {
    const baseClassNames = useMemo<TrkLabelClassNames>(
        () => ({
            label: 'block text-neutral-800 text-sm font-semibold'
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

    return (
        <label htmlFor={htmlFor} className={finalClassNames.label}>
            {children}
        </label>
    );
};
