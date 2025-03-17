import { ChangeEvent, FC, JSX, ReactNode, useMemo } from 'react';
import { PropConst } from '../prop-const';
import { joinClassNames } from '../util/selectors';
import { ChevronDown } from 'lucide-react';
import { TrkField, TrkFieldLabelPositions } from '../field/field';

export type TrkSelectProps = {
    children: ReactNode;
    classNames?: Partial<TrkSelectClassNames>;
    id?: string;
    name?: string;
    value?: string;
    disabled?: boolean;
    label?: string;
    labelPosition?: PropConst<typeof TrkFieldLabelPositions>;
    theme?: PropConst<typeof TrkSelectThemes>;
    variant?: PropConst<typeof TrkSelectVariants>;
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export type TrkSelectClassNames = {
    wrapper: string;
    select: string;
    selectArrow: string;
};

export type TrkSelectModClassNames = {
    wrapper: Record<string, boolean>;
    select: Record<string, boolean>;
    selectArrow: Record<string, boolean>;
};

export const TrkSelectThemes = {
    DEFAULT: 'default'
} as const;

export const TrkSelectVariants = {
    DEFAULT: 'default'
} as const;

export const TrkSelect: FC<TrkSelectProps> = ({
    id,
    children,
    classNames,
    label,
    name,
    value,
    disabled,
    onChange,
    theme = TrkSelectThemes.DEFAULT,
    variant = TrkSelectVariants.DEFAULT,
    labelPosition = TrkFieldLabelPositions.DEFAULT
}): JSX.Element => {
    const baseClassNames: TrkSelectClassNames = {
        wrapper: 'relative w-full',
        select: 'appearance-none outline-hidden w-full h-14 px-2 pr-10 text-base leading-tight font-normal rounded border transition-all duration-200 focus:ring-2 focus:ring-primary-500/50',
        selectArrow:
            'pointer-events-none absolute top-0 right-0 flex items-center justify-center w-10 h-full text-current *:w-4 *:h-4'
    };

    const modClassNames = useMemo<Partial<TrkSelectModClassNames>>(
        () => ({
            select: {
                'bg-stone-50 border-stone-400 text-stone-700 placeholder:text-stone-300 focus:border-stone-700':
                    variant === TrkSelectVariants.DEFAULT && theme === TrkSelectThemes.DEFAULT,
                'bg-stone-300/20 text-stone-500 cursor-not-allowed': !!disabled,
                'pt-4': labelPosition === TrkFieldLabelPositions.Inside
            }
        }),
        [variant, theme, disabled, labelPosition]
    );

    return (
        <TrkField label={label} labelPosition={labelPosition} htmlFor={id}>
            <div className={joinClassNames([baseClassNames.wrapper, modClassNames.wrapper, classNames?.wrapper])}>
                <select
                    id={id}
                    name={name}
                    value={value}
                    disabled={disabled}
                    className={joinClassNames([baseClassNames.select, modClassNames.select, classNames?.select])}
                    onChange={(e) => onChange?.(e)}
                >
                    {children}
                </select>
                <span
                    className={joinClassNames([
                        baseClassNames.selectArrow,
                        modClassNames.selectArrow,
                        classNames?.selectArrow
                    ])}
                >
                    <ChevronDown size={24} />
                </span>
            </div>
        </TrkField>
    );
};
