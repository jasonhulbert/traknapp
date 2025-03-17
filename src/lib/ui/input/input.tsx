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
            input: 'appearance-none outline-hidden w-full h-14 px-2 text-base leading-tight font-regular rounded border transition-all duration-200 focus:ring-2 focus:ring-primary-500/50'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkInputModClassNames>>(
        () => ({
            input: {
                'bg-stone-50 border-stone-400 text-stone-700 placeholder:text-stone-300 focus:border-stone-700':
                    variant === TrkInputVariants.DEFAULT && theme === TrkInputThemes.DEFAULT && !disabled,
                'bg-stone-200 text-stone-500 cursor-not-allowed': disabled,
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
