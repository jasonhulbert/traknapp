import { PlanBlock, PlanExerciseBlock } from '@/types/plan';
import { FC, JSX } from 'react';
import { Settings01Icon } from 'hugeicons-react';
import { PlanBlocksItemExercise } from './plan-block-item-exercise';
import { TrkButton } from '@/components/ui/button/button';
import { TrkCard } from '@/components/ui/card/card';

export const PlanBlocksItem: FC<{ block: PlanBlock }> = ({ block }): JSX.Element => {
    return (
        <TrkCard>
            <div className="flex items-center justify-between flex-nowrap gap-x-2 w-full p-4">
                <div className="flex-shrink flex flex-col">
                    <span className="text-lg leading-tight text-neutral-600 font-semibold uppercase italic">
                        {block.description}
                    </span>
                    <span className="text-sm leading-tight text-neutral-400">{block.type}</span>
                </div>
                <div className="flex-1 flex items-center justify-end gap-x-2">
                    <TrkButton iconOnly={true}>
                        <Settings01Icon className="w-6 h-6 text-current" width={24} height={24} />
                    </TrkButton>
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col gap-y-2 text-sm">
                    {block.type === 'exercise' && <PlanBlocksItemExercise block={block as PlanExerciseBlock} />}
                </div>
            </div>
        </TrkCard>
    );
};
