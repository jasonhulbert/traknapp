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
            wrapper: 'relative flex flex-col gap-y-1 w-full',
            label: '',
            control: 'relative w-auto'
        }),
        []
    );

    const modClassNames = useMemo<TrkFieldModClassNames>(
        () => ({
            label: {
                'none sr-only': labelPosition === 'none'
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
            {label && (
                <TrkLabel htmlFor={htmlFor} classNames={{ label: finalClassNames.label }}>
                    {label}
                </TrkLabel>
            )}
            <div className={finalClassNames.control}>{children}</div>
        </div>
    );
};
