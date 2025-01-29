import { FC, JSX } from 'react';
import { PlanBlocksItem } from './plan-blocks-item';
import { Plan } from '@/types/plan';

export type PlanBlocksProps = {
    plan: Plan;
};

export const PlanBlocks: FC<PlanBlocksProps> = ({ plan }): JSX.Element => {
    return (
        <div className="grid grid-cols-1 gap-y-4">
            {plan.blocks?.map((block) => <PlanBlocksItem key={block.id} block={block} />)}
        </div>
    );
};
