'use client';

import { FC, JSX } from 'react';
import { usePlan } from '@/providers/plan-provider';
import { PlanBlocksItem } from '@/components/plan-blocks/plan-blocks-item';

export const PlanBlocks: FC = (): JSX.Element => {
    const { plan } = usePlan();

    return (
        <>
            <div className="flex items-center">
            </div>
            <div className="grid grid-cols-1 gap-y-4">
                {plan?.blocks?.map((block) => <PlanBlocksItem key={block.id} block={block} />)}
            </div>
        </>
    );
};
