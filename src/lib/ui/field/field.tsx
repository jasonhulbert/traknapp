import { FC, JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';
import { TrkFieldLabel } from './field-label';

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

export const TrkField: FC<TrkFieldProps> = ({
    children,
    classNames,
    label,
    htmlFor,
    labelPosition = TrkFieldLabelPositions.DEFAULT
}): JSX.Element => {
    const baseClassNames = useMemo<TrkFieldClassNames>(
        () => ({
            wrapper: 'group relative flex flex-col gap-y-1 w-full',
            label: 'text-gray-500 peer-focus-within:text-gray-800',
            control: 'w-auto peer'
        }),
        []
    );

    const modClassNames = useMemo<TrkFieldModClassNames>(
        () => ({
            label: {
                'order-0 none sr-only': labelPosition === 'none',
                'order-1 absolute top-1 left-0 w-full truncate !text-xs !leading-4 !pt-1 !px-3':
                    labelPosition === 'inside'
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
                <TrkFieldLabel htmlFor={htmlFor} classNames={{ label: finalClassNames.label }}>
                    {label}
                </TrkFieldLabel>
            )}
        </div>
    );
};
