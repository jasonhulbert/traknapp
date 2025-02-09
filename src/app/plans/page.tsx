import { FC } from 'react';
import { PlanList } from '@/components/plan-list/plan-list';

const Page: FC = async () => {
    const plans = await fetchPlans();

    return <>{plans ? <PlanList plans={plans} /> : <div>Failed to load plans</div>}</>;
};

const fetchPlans = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/plans');

        if (!response.ok) {
            throw new Error('Failed to fetch plans');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching plans:', error);
    }
};

export default Page;
