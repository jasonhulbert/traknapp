import { ChangeEvent, FC, JSX, useMemo } from 'react';
import { v4 as uuid } from 'uuid';
import { PropConst } from '../prop-const';
import { joinClassNames } from '../util/selectors';
import { TrkField, TrkFieldLabelPositions } from '../field/field';

export type TrkInputProps = {
    classNames?: Partial<TrkInputClassNames>;
    id?: string;
    label?: string;
    labelPosition?: PropConst<typeof TrkFieldLabelPositions>;
    placeholder?: string;
    type?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    theme?: PropConst<typeof TrkInputThemes>;
    variant?: PropConst<typeof TrkInputVariants>;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export type TrkInputClassNames = {
    wrapper: string;
    input: string;
    label: string;
};

export type TrkInputModClassNames = {
    wrapper: Record<string, boolean>;
    input: Record<string, boolean>;
    label: Record<string, boolean>;
};

export const TrkInputThemes = {
    DEFAULT: 'default',
    Primary: 'primary'
} as const;

export const TrkInputVariants = {
    DEFAULT: 'default',
    Flat: 'flat',
    Ghost: 'ghost',
    Outline: 'outline'
} as const;

export const TrkInput: FC<TrkInputProps> = ({
    classNames,
    label,
    placeholder,
    type,
    name,
    value,
    disabled,
    onChange,
    id = uuid(),
    theme = TrkInputThemes.DEFAULT,
    variant = TrkInputVariants.DEFAULT,
    labelPosition = TrkFieldLabelPositions.DEFAULT
}): JSX.Element => {
    const baseClassNames: TrkInputClassNames = {
        wrapper: 'relative flex flex-col gap-y-1 w-full',
        input: 'appearance-none outline-hidden w-full h-12 px-3 text-lg leading-tight font-regular rounded border transition-all duration-200 focus-visible:ring-3 focus-visible:ring-primary-500 focus-visible:ring-opacity-30 selection:bg-primary-500 selection:bg-opacity-50',
        label: 'text-sm font-medium'
    };

    const modClassNames = useMemo<Partial<TrkInputModClassNames>>(
        () => ({
            input: {
                'bg-background border-neutral-200 text-neutral-500 placeholder:text-neutral-300 focus:border-neutral-500':
                    variant === TrkInputVariants.DEFAULT && theme === TrkInputThemes.DEFAULT,
                'bg-background border-primary-200 text-primary-500 placeholder:text-primary-300 focus:border-primary-500':
                    variant === TrkInputVariants.DEFAULT && theme === TrkInputThemes.Primary,
                'bg-neutral-500 bg-opacity-0 border-2 border-neutral-500 border-opacity-20 text-neutral-500 placeholder:text-neutral-300 focus:bg-opacity-10 focus:border-opacity-100':
                    variant === TrkInputVariants.Flat && theme === TrkInputThemes.DEFAULT,
                'bg-primary-500 bg-opacity-0 border-2 border-primary-500 border-opacity-20 text-primary-500 placeholder:text-primary-300 focus:bg-opacity-10 focus:border-opacity-100':
                    variant === TrkInputVariants.Flat && theme === TrkInputThemes.Primary,
                'bg-neutral-500 bg-opacity-0 text-neutral-500 border-neutral-500 placeholder:text-neutral-300 focus:bg-opacity-5':
                    variant === TrkInputVariants.Outline && theme === TrkInputThemes.DEFAULT,
                'bg-primary-500 bg-opacity-0 text-primary-500 border-primary-500 placeholder:text-primary-300 focus:bg-opacity-5':
                    variant === TrkInputVariants.Outline && theme === TrkInputThemes.Primary,
                'bg-neutral-500 bg-opacity-10 text-neutral-500 text-opacity-80 border-transparent placeholder:text-neutral-300 focus:bg-opacity-15 focus:text-opacity-100':
                    variant === TrkInputVariants.Ghost && theme === TrkInputThemes.DEFAULT,
                'bg-primary-500 bg-opacity-10 text-primary-500 text-opacity-80 border-transparent placeholder:text-primary-300 focus:bg-opacity-15 focus:text-opacity-100':
                    variant === TrkInputVariants.Ghost && theme === TrkInputThemes.Primary,
                'opacity-50 cursor-not-allowed': !!disabled
            },
            label: {
                'text-neutral-500': theme === TrkInputThemes.DEFAULT,
                'text-primary-500': theme === TrkInputThemes.Primary
            }
        }),
        [theme, variant, disabled]
    );

    return (
        <TrkField label={label} labelPosition={labelPosition} labelFor={id}>
            <input
                id={id}
                name={name}
                type={type ?? 'text'}
                value={value}
                disabled={disabled}
                placeholder={placeholder ?? ''}
                className={joinClassNames([baseClassNames.input, modClassNames.input, classNames?.input])}
                onChange={(e) => onChange?.(e)}
            />
        </TrkField>
    );
};
