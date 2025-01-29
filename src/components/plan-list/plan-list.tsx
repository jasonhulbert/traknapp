'use client';

import { FC, JSX, useEffect } from 'react';
import { Plan } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import Link from 'next/link';
import { TrkTitle } from '@/components/common/title/title';
import { TrkCard } from '@/components/common/card/card';

export type PlanListProps = {
    plans: Plan[];
};

export const PlanList: FC<PlanListProps> = ({ plans }): JSX.Element => {
    const setPlans = useAppStore((state) => state.setPlans);

    useEffect(() => {
        setPlans(plans);
    }, [plans, setPlans]);

    return (
        <div className="flex flex-col gap-y-2">
            <TrkTitle size="2xl" tag="h1">
                Plans
            </TrkTitle>

            {plans.map((plan: Plan) => (
                <TrkCard key={plan.id}>
                    <div className="p-4">
                        <TrkTitle size="xl" tag="h2">
                            {plan.name}
                        </TrkTitle>
                        <Link href={`/plans/${plan.id}`}>View Plan</Link>
                    </div>
                </TrkCard>
            ))}
        </div>
    );
};
