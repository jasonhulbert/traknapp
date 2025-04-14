'use client';

import { FC, JSX, useEffect } from 'react';
import { Plan } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import { Plus } from 'lucide-react';
import { TrkTitle } from '@/lib/ui/title/title';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkLink } from '@/lib/ui/link/link';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkLayoutView } from '@/lib/ui/layout/layout-view/layout-view';
import { TrkMetaBar } from '@/lib/ui/meta-bar/meta-bar';

export type PlanListViewProps = {
    plans?: Plan[];
};

export const PlanListView: FC<PlanListViewProps> = ({ plans }): JSX.Element => {
    const setPlans = useAppStore((state) => state.setPlans);

    useEffect(() => {
        setPlans(plans ?? []);
    }, [plans, setPlans]);

    return (
        <TrkLayoutView variant="inset">
            <TrkMetaBar
                slots={{
                    title: (
                        <TrkTitle weight={700} size="lg" tag="h1" truncate={true}>
                            Plans
                        </TrkTitle>
                    ),
                    breadcrumbs: [{ label: 'Home', href: '/' }].map((b, i) => (
                        <TrkLink key={i} href={b.href}>
                            {b.label}
                        </TrkLink>
                    )),
                    actions: (
                        <TrkButton size="sm" theme="primary">
                            <Plus size={16} />
                            <span>Add Plan</span>
                        </TrkButton>
                    )
                }}
            />
            <div className="flex flex-col gap-y-4">
                {plans?.map((plan: Plan) => (
                    <TrkCard
                        key={plan.id}
                        slots={{
                            headerStart: (
                                <TrkTitle weight={700} size="lg" tag="h2">
                                    {plan.name}
                                </TrkTitle>
                            )
                        }}
                    >
                        <div className="flex flex-col gap-y-1 items-start">
                            <TrkLink href={`/plans/${plan.id}`}>View/Edit Plan</TrkLink>
                        </div>
                    </TrkCard>
                ))}
            </div>
        </TrkLayoutView>
    );
};
