import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';
import { TrkLabel } from '../label/label';

export type TrkFieldProps = {
    children: ReactNode;
    classNames?: Partial<TrkFieldClassNames>;
    label?: string;
    labelPosition?: PropConst<typeof TrkFieldLabelPositions>;
    htmlFor?: string;
};

export type TrkFieldClassNames = {
    wrapper: string;
    label: string;
    control: string;
};

export type TrkFieldModClassNames = {
    [Key in keyof Partial<TrkFieldClassNames>]: Record<string, boolean>;
};

export const TrkFieldLabelPositions = {
    DEFAULT: 'default',
    Inside: 'inside',
    None: 'none'
} as const;

export const TrkField: FC<TrkFieldProps> = ({ children, classNames, label, labelPosition, htmlFor }): JSX.Element => {
    const baseClassNames = useMemo<TrkFieldClassNames>(
        () => ({
            wrapper: 'group relative flex flex-col gap-y-1 w-full',
            label: 'text-stone-500 group-focus-within:text-stone-800',
            control: 'w-auto'
        }),
        []
    );

    const modClassNames = useMemo<TrkFieldModClassNames>(
        () => ({
            label: {
                'order-0 none sr-only': labelPosition === 'none',
                'order-1 absolute top-0 left-0 w-full truncate !leading-4 !pt-1 !px-2': labelPosition === 'inside'
            },
            control: {
                'order-1': labelPosition === 'default' || labelPosition === 'none',
                'order-0': labelPosition === 'inside'
            }
        }),
        [labelPosition]
    );

    const finalClassNames = useMemo<TrkFieldClassNames>(
        () => resolveFinalClassNames(baseClassNames, modClassNames, classNames),
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <div className={finalClassNames.wrapper}>
            <div className={finalClassNames.control}>{children}</div>
            {label && (
                <TrkLabel htmlFor={htmlFor} classNames={{ label: finalClassNames.label }}>
                    {label}
                </TrkLabel>
            )}
        </div>
    );
};
