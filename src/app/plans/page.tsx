import { PlanList } from '@/components/plan-list/plan-list';
import { Plan } from '@/types/plan';
import { FC } from 'react';

const Page: FC = async () => {
    const response = await fetch('http://localhost:3000/mock-plans.json');
    const plans: Plan[] = await response.json();

    return <PlanList plans={plans} />;
};

export default Page;
