import { FC, Fragment, JSX, useMemo } from 'react';
import { resolveFinalClassNames } from '../util/selectors';
import { ChevronRight } from 'lucide-react';

export type TrkMetaBarProps = {
    slots: Partial<TrkMetaBarClassNamesSlots>;
    classNames?: Partial<TrkMetaBarClassNames>;
};

export type TrkMetaBarClassNames = {
    meta: string;
    metaTitle: string;
    metaTitleText: string;
    metaTitleBreadcrumbs: string;
    metaActions: string;
};

export type TrkMetaBarModClassNames = {
    [key in keyof TrkMetaBarClassNames]: Record<string, boolean>;
};

export type TrkMetaBarClassNamesSlots = {
    title: JSX.Element;
    actions: JSX.Element;
    breadcrumbs: JSX.Element[];
};

export const TrkMetaBar: FC<TrkMetaBarProps> = ({ slots, classNames }): JSX.Element => {
    const baseClassNames = useMemo<TrkMetaBarClassNames>(
        () => ({
            meta: 'z-40 flex flex-nowrap items-center gap-x-3 w-full h-16 mb-4',
            metaTitle: 'flex-1 w-auto mr-auto truncate',
            metaTitleText: 'leading-none text-base font-medium',
            metaTitleBreadcrumbs: 'flex items-center gap-x-1 text-sm font-bold text-gray-500 leading-none',
            metaActions: 'flex flex-none flex-nowrap items-center gap-x-3'
        }),
        []
    );

    const modClassNames = useMemo<Partial<TrkMetaBarModClassNames>>(
        () => ({
            meta: {
                'justify-between': !!slots.actions
            }
        }),
        [slots]
    );

    const finalClassNames = useMemo<TrkMetaBarClassNames>(
        () =>
            resolveFinalClassNames<TrkMetaBarClassNames>(
                baseClassNames,
                modClassNames,
                classNames
            ) as TrkMetaBarClassNames,
        [baseClassNames, modClassNames, classNames]
    );

    return (
        <div className={finalClassNames.meta}>
            <div className={finalClassNames.metaTitle}>
                {slots.breadcrumbs && (
                    <nav className={finalClassNames.metaTitleBreadcrumbs}>
                        {slots.breadcrumbs?.map((breadcrumb, i) => (
                            <Fragment key={i}>
                                {breadcrumb}
                                <ChevronRight size={12} />
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
