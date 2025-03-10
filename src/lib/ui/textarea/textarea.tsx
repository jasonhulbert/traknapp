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
    value,
    placeholder,
    onChange,
    classNames,
    label,
    id = crypto.randomUUID(),
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
                'appearance-none outline-none w-full min-h-24 p-2 text-base leading-tight border rounded transition-all duration-200 focus:ring-2 focus:ring-violet-500/50'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTextareaModClassNames>>(
        () => ({
            textarea: {
                'bg-stone-50 border-stone-400 text-stone-700 placeholder:text-stone-300 focus:border-stone-700':
                    variant === TrkTextareaVariants.DEFAULT && theme === TrkTextareThemes.DEFAULT && !disabled,
                'bg-stone-200 text-stone-500 cursor-not-allowed': disabled,
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
