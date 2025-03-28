import { JSX, ReactNode, useMemo, useEffect } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';
import { useTrkTabs } from './tabs-provider';

export type TrkTabsButtonProps = {
    id: string;
    label: string | ReactNode;
    active: boolean;
    theme?: PropConst<typeof TrkTabsButtonThemes>;
    classNames?: Partial<TrkTabsButtonClassNames>;
};

export type TrkTabsButtonClassNames = {
    button: string;
};

export type TrkTabsButtonModClassNames = {
    [Key in keyof Partial<TrkTabsButtonClassNames>]: Record<string, boolean>;
};

export const TrkTabsButtonThemes = {
    DEFAULT: 'default'
} as const;

export const TrkTabsButton: React.FC<TrkTabsButtonProps> = ({
    id,
    label,
    classNames,
    active = false,
    theme = TrkTabsButtonThemes.DEFAULT
}): JSX.Element => {
    const { setActive } = useTrkTabs();

    const baseClassNames = useMemo<TrkTabsButtonClassNames>(
        () => ({
            button: 'appearance-none outline-none cursor-pointer text-sm font-medium px-4 py-2 leading-tight truncate rounded transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary-500/50'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTabsButtonModClassNames>>(
        () => ({
            button: {
                'text-black': !active && theme === TrkTabsButtonThemes.DEFAULT,
                'text-primary-700 bg-primary-500/10': active && theme === TrkTabsButtonThemes.DEFAULT,
                'hover:bg-gray-500/10': !active && theme === TrkTabsButtonThemes.DEFAULT
            }
        }),
        [active, theme]
    );

    const finalClassNames = useMemo(() => {
        return resolveFinalClassNames(baseClassNames, modClassNames, classNames);
    }, [baseClassNames, modClassNames, classNames]);

    useEffect(() => {
        if (active) {
            setActive(id);
        }
    }, [active, id, setActive]);

    return (
        <button type="button" className={finalClassNames.button} onClick={() => setActive(id)}>
            {label}
        </button>
    );
};
