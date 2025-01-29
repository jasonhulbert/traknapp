import { ChangeEvent, FC, JSX, ReactNode, useMemo } from 'react';
import { PropConst } from '../../../types/prop-const';
import { joinClassNames } from '../util/class-names';
import { ArrowDown01Icon } from 'hugeicons-react';
import { TrkField, TrkFieldLabelPositions } from '../field/field';
import { v4 as uuid } from 'uuid';

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
    DEFAULT: 'default',
    Primary: 'primary'
} as const;

export const TrkSelectVariants = {
    DEFAULT: 'default',
    Flat: 'flat',
    Ghost: 'ghost',
    Outline: 'outline'
} as const;

export const TrkSelect: FC<TrkSelectProps> = ({
    children,
    classNames,
    label,
    name,
    value,
    disabled,
    onChange,
    id = uuid(),
    theme = TrkSelectThemes.DEFAULT,
    variant = TrkSelectVariants.DEFAULT,
    labelPosition = TrkFieldLabelPositions.DEFAULT
}): JSX.Element => {
    const baseClassNames: TrkSelectClassNames = {
        wrapper: 'relative w-full',
        select: 'appearance-none outline-none w-full h-12 px-3 pr-12 text-lg leading-tight font-normal rounded border transition-all duration-200 focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-30 selection:bg-primary-500 selection:bg-opacity-50',
        selectArrow:
            'pointer-events-none absolute top-0 right-0 flex items-center justify-center w-12 h-full text-foreground *:w-6 *:h-6'
    };

    const modClassNames = useMemo<Partial<TrkSelectModClassNames>>(
        () => ({
            select: {
                'bg-background border-neutral-200 text-neutral-500 placeholder:text-neutral-300 focus:border-neutral-500':
                    variant === TrkSelectVariants.DEFAULT && theme === TrkSelectThemes.DEFAULT,
                'bg-background border-primary-200 text-primary-500 placeholder:text-primary-300 focus:border-primary-500':
                    variant === TrkSelectVariants.DEFAULT && theme === TrkSelectThemes.Primary,
                'bg-neutral-500 bg-opacity-0 border-2 border-neutral-500 border-opacity-20 text-neutral-500 placeholder:text-neutral-300 focus:bg-opacity-10 focus:border-opacity-100':
                    variant === TrkSelectVariants.Flat && theme === TrkSelectThemes.DEFAULT,
                'bg-primary-500 bg-opacity-0 border-2 border-primary-500 border-opacity-20 text-primary-500 placeholder:text-primary-300 focus:bg-opacity-10 focus:border-opacity-100':
                    variant === TrkSelectVariants.Flat && theme === TrkSelectThemes.Primary,
                'bg-neutral-500 bg-opacity-0 text-neutral-500 border-neutral-500 placeholder:text-neutral-300 focus:bg-opacity-5':
                    variant === TrkSelectVariants.Outline && theme === TrkSelectThemes.DEFAULT,
                'bg-primary-500 bg-opacity-0 text-primary-500 border-primary-500 placeholder:text-primary-300 focus:bg-opacity-5':
                    variant === TrkSelectVariants.Outline && theme === TrkSelectThemes.Primary,
                'bg-neutral-500 bg-opacity-10 text-neutral-500 text-opacity-80 border-transparent placeholder:text-neutral-300 focus:bg-opacity-15 focus:text-opacity-100':
                    variant === TrkSelectVariants.Ghost && theme === TrkSelectThemes.DEFAULT,
                'bg-primary-500 bg-opacity-10 text-primary-500 text-opacity-80 border-transparent placeholder:text-primary-300 focus:bg-opacity-15 focus:text-opacity-100':
                    variant === TrkSelectVariants.Ghost && theme === TrkSelectThemes.Primary,
                'opacity-50 cursor-not-allowed': !!disabled
            }
        }),
        [variant, theme, disabled]
    );

    return (
        <TrkField label={label} labelPosition={labelPosition} labelFor={id}>
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
                    <ArrowDown01Icon width={24} height={24} />
                </span>
            </div>
        </TrkField>
    );
};
