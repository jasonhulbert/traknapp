import { ChangeEvent, FC, JSX, useMemo } from 'react';
import { PropConst } from '../prop-const';
import { resolveFinalClassNames } from '../util/selectors';
import { TrkField, TrkFieldLabelPositions } from '../field/field';

export type TrkInputProps = {
    classNames?: Partial<TrkInputClassNames>;
    id?: string;
    label?: string;
    labelPosition?: PropConst<typeof TrkFieldLabelPositions>;
    placeholder?: string;
    type?: 'text' | 'password' | 'email' | 'number';
    name?: string;
    value?: string;
    disabled?: boolean;
    theme?: PropConst<typeof TrkInputThemes>;
    variant?: PropConst<typeof TrkInputVariants>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type TrkInputClassNames = {
    input: string;
};

export type TrkInputModClassNames = {
    [Key in keyof Partial<TrkInputClassNames>]: Record<string, boolean>;
};

export const TrkInputThemes = {
    DEFAULT: 'default'
} as const;

export const TrkInputVariants = {
    DEFAULT: 'default'
} as const;

export const TrkInput: FC<TrkInputProps> = ({
    id,
    classNames,
    label,
    placeholder,
    type,
    name,
    value,
    onChange,
    disabled = false,
    theme = TrkInputThemes.DEFAULT,
    variant = TrkInputVariants.DEFAULT,
    labelPosition = TrkFieldLabelPositions.DEFAULT
}): JSX.Element => {
    const baseClassNames = useMemo<TrkInputClassNames>(
        () => ({
            input: 'appearance-none outline-hidden w-full h-14 px-3 text-base leading-tight font-medium rounded border transition-all duration-200'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkInputModClassNames>>(
        () => ({
            input: {
                'bg-white/60 border-gray-300 text-gray-700 placeholder:text-gray-300 focus:bg-white/80 focus:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-500/20':
                    variant === TrkInputVariants.DEFAULT && theme === TrkInputThemes.DEFAULT && !disabled,
                'bg-gray-200/60 text-gray-500 cursor-not-allowed': disabled,
                'pt-4': labelPosition === TrkFieldLabelPositions.Inside
            }
        }),
        [theme, variant, disabled, labelPosition]
    );

    const finalClassNames = useMemo<TrkInputClassNames>(
        () => resolveFinalClassNames<TrkInputClassNames>(baseClassNames, modClassNames, classNames),
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <TrkField label={label} labelPosition={labelPosition} htmlFor={id}>
            <input
                id={id}
                name={name}
                type={type ?? 'text'}
                value={value}
                disabled={disabled}
                placeholder={placeholder ?? ''}
                className={finalClassNames.input}
                onChange={(e) => onChange?.(e)}
            />
        </TrkField>
    );
};
