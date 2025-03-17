import { JSX, ReactElement, useEffect, useMemo } from 'react';
import { TrkTabsButton } from './tabs-button';
import { TrkTabsContent } from './tabs-content';
import { resolveFinalClassNames } from '../util/selectors';
import { PropConst } from '../prop-const';
import { useTrkTabs } from './tabs-provider';

export type TrkTabsProps = {
    tabs: ReactElement<typeof TrkTabsButton>[];
    content: ReactElement<typeof TrkTabsContent>[];
    theme?: PropConst<typeof TrkTabsThemes>;
    activeTab?: string;
    onTabChange?: (tabId: string) => void;
    classNames?: Partial<TrkTabsClassNames>;
};

export type TrkTabsClassNames = {
    tabs: string;
    tabsButtons: string;
    tabsContent: string;
};

export type TrkTabsModClassNames = {
    [Key in keyof Partial<TrkTabsClassNames>]: Record<string, boolean>;
};

export const TrkTabsThemes = {
    DEFAULT: 'default'
} as const;

export const TrkTabs: React.FC<TrkTabsProps> = ({
    tabs,
    content,
    activeTab,
    onTabChange,
    classNames,
    theme = TrkTabsThemes.DEFAULT
}): JSX.Element => {
    const { active, setActive } = useTrkTabs();

    const baseClassNames = useMemo<TrkTabsClassNames>(
        () => ({
            tabs: 'block w-full',
            tabsButtons: 'relative w-auto flex items-center justify-center gap-x-1 p-2 justify-self-center',
            tabsContent: 'block w-full p-2'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTabsModClassNames>>(
        () => ({
            tabsButtons: {
                'bg-stone-100 rounded-lg border border-stone-300': theme === TrkTabsThemes.DEFAULT
            },
            tabsContent: {}
        }),
        [theme]
    );

    const finalClassNames = useMemo(() => {
        return resolveFinalClassNames(baseClassNames, modClassNames, classNames);
    }, [baseClassNames, modClassNames, classNames]);

    useEffect(() => {
        if (activeTab) {
            setActive(activeTab);
        }
    }, [activeTab, setActive]);

    useEffect(() => {
        if (onTabChange) {
            onTabChange(active);
        }
    }, [active, onTabChange]);

    return (
        <div className={finalClassNames.tabs}>
            <div className={finalClassNames.tabsButtons}>{tabs.map((t) => t)}</div>
            <div className={finalClassNames.tabsContent}>{content.map((c) => c)}</div>
        </div>
    );
};
