import { FC, JSX, PropsWithChildren, useMemo } from 'react';
import { joinClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';

export type TrkFieldLabelProps = PropsWithChildren<{
    classNames?: Partial<TrkFieldLabelClassNames>;
    htmlFor?: string;
    variant?: PropConst<typeof TrkFieldLabelVariants>;
    size?: PropConst<typeof TrkFieldLabelSizes>;
}>;

export type TrkFieldLabelClassNames = {
    label: string;
};

export type TrkFieldLabelModClassNames = {
    [Key in keyof Partial<TrkFieldLabelClassNames>]: Record<string, boolean>;
};

export const TrkFieldLabelVariants = {
    Default: 'default'
} as const;

export const TrkFieldLabelSizes = {
    Small: 'sm',
    Default: 'default'
} as const;

export const TrkFieldLabel: FC<TrkFieldLabelProps> = ({ children, classNames, size, htmlFor }): JSX.Element => {
    const baseClassNames = useMemo<TrkFieldLabelClassNames>(
        () => ({
            label: `block text-sm leading-tight tracking-wide font-medium transition-all duration-200`
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkFieldLabelModClassNames>>(
        () => ({
            label: {
                'text-xs': size === TrkFieldLabelSizes.Small
            }
        }),
        [size]
    );

    const finalClassNames = useMemo<TrkFieldLabelClassNames>(
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
