import { FC, Fragment, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/class-names';
import { TrkLink } from '../link/link';

export type TrkTitleBarProps = {
    slots: Partial<TrkTitleBarSlots>;
    classNames?: Partial<TrkTitleBarClassNames>;
    breadcrumbs?: Array<{ label: string; path: string }>;
};

export type TrkTitleBarClassNames = {
    titleBar: string;
    titleBarTitle: string;
    titleBarActions: string;
    titleBarTitleText: string;
    titleBarTitleBreadcrumbs: string;
    titleBarTitleBreadcrumbsLink: string;
};

export type TrkTitleBarModClassNames = {
    [key in keyof TrkTitleBarClassNames]: Record<string, boolean>;
};

export type TrkTitleBarSlots = {
    title: JSX.Element;
    actions: JSX.Element;
};

export const TrkTitleBar: FC<TrkTitleBarProps> = ({ slots, classNames, breadcrumbs }): JSX.Element => {
    const baseClassNames = useMemo<TrkTitleBarClassNames>(
        () => ({
            titleBar:
                'sticky top-0 left-0 right-0 flex flex-nowrap items-center gap-x-2 px-4 w-full h-16 bg-neutral-100/60 backdrop-blur-md shadow-md',
            titleBarTitle: 'flex-1 min-w-0 truncate',
            titleBarTitleText: 'leading-none',
            titleBarTitleBreadcrumbs: 'flex items-center gap-x-2 text-base text-neutral-300 leading-none',
            titleBarTitleBreadcrumbsLink: '',
            titleBarActions: 'flex flex-none flex-nowrap items-center gap-x-2'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkTitleBarModClassNames>>(
        () => ({
            titleBar: {
                'justify-between': !!slots.actions
            }
        }),
        [slots]
    );

    const finalClassNames = useMemo<TrkTitleBarClassNames>(
        () =>
            resolveFinalClassNames<TrkTitleBarClassNames>(
                baseClassNames,
                modClassNames,
                classNames
            ) as TrkTitleBarClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <div className={finalClassNames.titleBar}>
            {slots?.title && (
                <div className={finalClassNames.titleBarTitle}>
                    <nav className={finalClassNames.titleBarTitleBreadcrumbs}>
                        {breadcrumbs?.map((breadcrumb) => (
                            <Fragment key={breadcrumb.path}>
                                <TrkLink
                                    href={breadcrumb.path}
                                    classNames={{ link: finalClassNames.titleBarTitleBreadcrumbsLink }}
                                >
                                    {breadcrumb.label}
                                </TrkLink>
                                <span>/</span>
                            </Fragment>
                        ))}
                    </nav>
                    <div className={finalClassNames.titleBarTitleText}>{slots.title}</div>
                </div>
            )}
            {slots?.actions && <div className={finalClassNames.titleBarActions}>{slots.actions}</div>}
        </div>
    );
};
