import { FC } from 'react';
import { PlanView } from '@/components/plan-view/plan-view';

type PageProps = {
    params: Promise<{ id: string }>;
};

const Page: FC<PageProps> = async ({ params }) => {
    const id = (await params).id;
    const plan = await fetchPlan(id);

    return <PlanView plan={plan} />;
};

const fetchPlan = async (id: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/plans?id=${id}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch plans:\n ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching plan:\n', error);
    }
};

export default Page;
