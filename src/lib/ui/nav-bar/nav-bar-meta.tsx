import { FC, Fragment, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/class-names';

export type TrkNavBarMetaProps = {
    slots: Partial<TrkNavBarMetaClassNamesSlots>;
    classNames?: Partial<TrkNavBarMetaClassNames>;
    breadcrumbs?: JSX.Element[];
};

export type TrkNavBarMetaClassNames = {
    context: string;
    contextTitle: string;
    contextTitleText: string;
    contextTitleBreadcrumbs: string;
    contextTitleBreadcrumbsLink: string;
    contextActions: string;
};

export type TrkNavBarMetaModClassNames = {
    [key in keyof TrkNavBarMetaClassNames]: Record<string, boolean>;
};

export type TrkNavBarMetaClassNamesSlots = {
    title: JSX.Element;
    actions: JSX.Element;
};

export const TrkNavBarMeta: FC<TrkNavBarMetaProps> = ({ slots, classNames, breadcrumbs }): JSX.Element => {
    const baseClassNames = useMemo<TrkNavBarMetaClassNames>(
        () => ({
            context: 'flex flex-nowrap items-center gap-x-3 px-4 w-full h-16',
            contextTitle: 'flex-1 min-w-0 truncate',
            contextTitleText: 'leading-none text-base',
            contextTitleBreadcrumbs: 'flex items-center gap-x-1 text-sm text-neutral-400 leading-none',
            contextTitleBreadcrumbsLink: '',
            contextActions: 'flex flex-none flex-nowrap items-center gap-x-3'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkNavBarMetaModClassNames>>(
        () => ({
            context: {
                'justify-between': !!slots.actions
            }
        }),
        [slots]
    );

    const finalClassNames = useMemo<TrkNavBarMetaClassNames>(
        () =>
            resolveFinalClassNames<TrkNavBarMetaClassNames>(
                baseClassNames,
                modClassNames,
                classNames
            ) as TrkNavBarMetaClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <div className={finalClassNames.context}>
            <div className={finalClassNames.contextTitle}>
                <nav className={finalClassNames.contextTitleBreadcrumbs}>
                    {breadcrumbs?.map((breadcrumb, i) => (
                        <Fragment key={i}>
                            {breadcrumb}
                            &nbsp;&rsaquo;&nbsp;
                        </Fragment>
                    ))}
                </nav>
                <div className={finalClassNames.contextTitleText}>{slots.title}</div>
            </div>
            <div className={finalClassNames.contextActions}>{slots.actions}</div>
        </div>
    );
};
