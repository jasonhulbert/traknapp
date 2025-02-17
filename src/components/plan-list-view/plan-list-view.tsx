'use client';

import { FC, JSX, useEffect } from 'react';
import { Plan } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import { TrkTitle } from '@/lib/ui/title/title';
import { TrkCard } from '@/lib/ui/card/card';
import { AddSquareIcon } from 'hugeicons-react';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkTitleBar } from '@/lib/ui/title-bar/title-bar';
import { TrkLink } from '@/lib/ui/link/link';

export type PlanListViewProps = {
    plans?: Plan[];
};

export const PlanListView: FC<PlanListViewProps> = ({ plans }): JSX.Element => {
    const setPlans = useAppStore((state) => state.setPlans);

    useEffect(() => {
        setPlans(plans ?? []);
    }, [plans, setPlans]);

    return (
        <>
            <TrkTitleBar
                breadcrumbs={[{ label: 'Home', path: '/' }]}
                slots={{
                    title: (
                        <TrkTitle size="xl" tag="h1" truncate={true}>
                            Plans
                        </TrkTitle>
                    ),
                    actions: (
                        <>
                            <TrkButton size="sm" theme="primary" variant="flat" iconOnly={true}>
                                <AddSquareIcon className="w-6 h-6" width={24} height={24}></AddSquareIcon>
                            </TrkButton>
                        </>
                    )
                }}
            />
            <div className="flex flex-col gap-y-4 p-4">
                {plans?.map((plan: Plan) => (
                    <TrkCard key={plan.id}>
                        <div className="flex flex-col gap-y-1 items-start p-4">
                            <TrkTitle size="xl" tag="h2" classNames={{ title: 'block w-full' }}>
                                {plan.name}
                            </TrkTitle>
                            <TrkLink href={`/plans/${plan.id}`}>View/Edit Plan</TrkLink>
                        </div>
                    </TrkCard>
                ))}
            </div>
        </>
    );
};
