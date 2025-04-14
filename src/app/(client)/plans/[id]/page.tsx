'use server';

import { FC } from 'react';
import { PlanDetailView } from '@/components/plan-detail-view/plan-detail-view';

type PageProps = {
    params: Promise<{ id: string }>;
};

const Page: FC<PageProps> = async ({ params }) => {
    const id = (await params).id;
    const plan = await fetchPlan(id);

    return <>{plan ? <PlanDetailView plan={plan} /> : <div>Failed to load plan</div>}</>;
};

const fetchPlan = async (id: string) => {
    try {
        const response = await fetch(`${process.env.APP_API}/plans?id=${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch plan:\n ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching plan:\n', error);
    }
};

export default Page;
