import { JSX, ReactNode, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';

export type TrkTabsContentProps = {
    id: string;
    children: ReactNode;
    active?: boolean;
    classNames?: Partial<TrkTabsContentClassNames>;
};

export type TrkTabsContentClassNames = {
    content: string;
};

export type TrkTabsContentModClassNames = {
    [Key in keyof Partial<TrkTabsContentClassNames>]: Record<string, boolean>;
};

export const TrkTabsContent: React.FC<TrkTabsContentProps> = ({
    id,
    children,
    classNames,
    active = false
}): JSX.Element => {
    const baseClassNames = useMemo<TrkTabsContentClassNames>(
        () => ({
            content: 'block w-full'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTabsContentModClassNames>>(
        () => ({
            content: {
                hidden: !active,
                block: active
            }
        }),
        [active]
    );

    const finalClassNames = useMemo<TrkTabsContentClassNames>(() => {
        return resolveFinalClassNames(baseClassNames, modClassNames, classNames);
    }, [baseClassNames, modClassNames, classNames]);

    return (
        <div id={id} className={finalClassNames.content}>
            {children}
        </div>
    );
};
