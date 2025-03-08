'use client';

import { FC, JSX, useEffect } from 'react';
import { Plan } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import { TrkTitle } from '@/lib/ui/title/title';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkLink } from '@/lib/ui/link/link';
import { useNavBar } from '@/lib/ui/nav-bar/nav-bar-provider';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkView } from '@/lib/ui/view/view';
import { Plus } from 'lucide-react';

export type PlanListViewProps = {
    plans?: Plan[];
};

export const PlanListView: FC<PlanListViewProps> = ({ plans }): JSX.Element => {
    const setPlans = useAppStore((state) => state.setPlans);
    const { setTitle, setBreadcrumbs, setActions, resetNavbar } = useNavBar();

    useEffect(() => {
        setPlans(plans ?? []);
    }, [plans, setPlans]);

    useEffect(() => {
        setTitle('Plans');

        setBreadcrumbs(
            [{ label: 'Home', href: '/' }].map((b, i) => (
                <TrkLink key={i} href={b.href}>
                    {b.label}
                </TrkLink>
            ))
        );

        setActions(
            <>
                <TrkButton size="sm" theme="primary">
                    <Plus size={16} />
                    Add Plan
                </TrkButton>
            </>
        );

        return () => {
            resetNavbar();
        };
    }, [setTitle, setBreadcrumbs, setActions, resetNavbar]);

    return (
        <TrkView variant="inset">
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
        </TrkView>
    );
};
