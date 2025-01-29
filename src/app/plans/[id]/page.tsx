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
    const fetchResponse = await fetch(`http://localhost:3000/mock-plan-${id}.json`);
    return await fetchResponse.json();
};

export default Page;
