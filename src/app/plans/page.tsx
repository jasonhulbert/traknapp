import { FC } from 'react';
import { PlanListView } from '@/components/plan-list-view/plan-list-view';

const Page: FC = async () => {
    const plans = await fetchPlans();

    return <>{plans ? <PlanListView plans={plans} /> : <div>Failed to load plans</div>}</>;
};

const fetchPlans = async () => {
    try {
        const response = await fetch(`${process.env.APP_API}/plans`);

        if (!response.ok) {
            throw new Error(`Failed to fetch plans:\n ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching plans:', error);
    }
};

export default Page;
