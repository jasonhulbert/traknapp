import { FC, Fragment, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { Slash } from 'lucide-react';

export type TrkNavBarMetaProps = {
    slots: Partial<TrkNavBarMetaClassNamesSlots>;
    classNames?: Partial<TrkNavBarMetaClassNames>;
    breadcrumbs?: JSX.Element[] | null;
};

export type TrkNavBarMetaClassNames = {
    meta: string;
    metaTitle: string;
    metaTitleText: string;
    metaTitleBreadcrumbs: string;
    metaTitleBreadcrumbsLink: string;
    metaActions: string;
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
            meta: 'flex flex-nowrap items-center gap-x-3 px-4 w-full h-16',
            metaTitle: 'flex-1 w-auto mr-auto truncate',
            metaTitleText: 'leading-none text-base',
            metaTitleBreadcrumbs: 'flex items-center gap-x-1 text-sm text-neutral-300 leading-none',
            metaTitleBreadcrumbsLink: '',
            metaActions: 'flex flex-none flex-nowrap items-center gap-x-3'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkNavBarMetaModClassNames>>(
        () => ({
            meta: {
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
        <div className={finalClassNames.meta}>
            <div className={finalClassNames.metaTitle}>
                {breadcrumbs && (
                    <nav className={finalClassNames.metaTitleBreadcrumbs}>
                        {breadcrumbs?.map((breadcrumb, i) => (
                            <Fragment key={i}>
                                {breadcrumb}
                                <Slash size={12} />
                            </Fragment>
                        ))}
                    </nav>
                )}
                {slots.title && <div className={finalClassNames.metaTitleText}>{slots.title}</div>}
            </div>
            <div className={finalClassNames.metaActions}>{slots.actions}</div>
        </div>
    );
};
