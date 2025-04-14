import { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PropConst } from '../prop-const';
import { TrkField, TrkFieldLabelPositions } from '../field/field';
import { resolveFinalClassNames } from '../util/selectors';

export type TrkTextareaProps = {
    id?: string;
    value?: string;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    labelPosition?: PropConst<typeof TrkFieldLabelPositions>;
    theme?: PropConst<typeof TrkTextareThemes>;
    variant?: PropConst<typeof TrkTextareaVariants>;
    classNames?: Partial<TrkTextareaClassNames>;
    onChange?: (value: string) => void;
};

export type TrkTextareaClassNames = {
    textarea: string;
};

export type TrkTextareaModClassNames = {
    [Key in keyof Partial<TrkTextareaClassNames>]: Record<string, boolean>;
};

export const TrkTextareThemes = {
    DEFAULT: 'default'
} as const;

export const TrkTextareaVariants = {
    DEFAULT: 'default'
} as const;

export const TrkTextarea: React.FC<TrkTextareaProps> = ({
    id,
    value,
    placeholder,
    onChange,
    classNames,
    label,
    disabled = false,
    labelPosition = TrkFieldLabelPositions.DEFAULT,
    theme = TrkTextareThemes.DEFAULT,
    variant = TrkTextareaVariants.DEFAULT
}): JSX.Element => {
    const [height, setHeight] = useState<number>(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const baseClassNames = useMemo<TrkTextareaClassNames>(
        () => ({
            textarea:
                'appearance-none outline-none w-full min-h-24 p-2 text-base leading-tight border rounded transition-all duration-200 focus:ring-2 focus:ring-primary-500/50'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTextareaModClassNames>>(
        () => ({
            textarea: {
                'bg-white/60 border-gray-300 text-gray-700 placeholder:text-gray-300 focus:bg-white/80 focus:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-500/20':
                    variant === TrkTextareaVariants.DEFAULT && theme === TrkTextareThemes.DEFAULT && !disabled,
                'bg-gray-200/60 text-gray-500 cursor-not-allowed': disabled,
                'pt-4': labelPosition === TrkFieldLabelPositions.Inside
            }
        }),
        [theme, variant, disabled, labelPosition]
    );

    const finalClassNames = useMemo<TrkTextareaClassNames>(
        () => resolveFinalClassNames(baseClassNames, modClassNames, classNames),
        [baseClassNames, modClassNames, classNames]
    );

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (onChange) {
                onChange(event.target.value);
            }
        },
        [onChange]
    );

    useEffect(() => {
        if (textareaRef.current) {
            setHeight(textareaRef.current.scrollHeight);
        }
    }, [value]);

    return (
        <TrkField label={label} labelPosition={labelPosition} htmlFor={id}>
            <textarea
                id={id}
                disabled={disabled}
                className={finalClassNames.textarea}
                ref={textareaRef}
                style={{ height }}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
            />
        </TrkField>
    );
};
