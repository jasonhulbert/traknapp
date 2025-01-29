import { PlanBlock } from '@/types/plan';
import { FC, JSX } from 'react';
import { Settings01Icon } from 'hugeicons-react';
import { TrkButton } from '@/components/common/button/button';
import { TrkCard } from '@/components/common/card/card';
import { TrkTitle } from '../common/title/title';
import { PlanBlocksItemExercise } from './plan-blocks-item-exercise';

export const PlanBlocksItem: FC<{ block: PlanBlock }> = ({ block }): JSX.Element => {
    return (
        <TrkCard>
            <div className="flex items-center justify-between flex-nowrap gap-x-2 w-full p-4">
                <div className="flex-shrink flex flex-col">
                    <TrkTitle size="lg" variant="subtle">
                        {block.description}
                    </TrkTitle>
                </div>
                <div className="flex-1 flex items-center justify-end gap-x-2">
                    <TrkButton variant="flat" size="sm" iconOnly={true} radiusSize="full">
                        <Settings01Icon className="w-6 h-6" width={24} height={24} />
                    </TrkButton>
                </div>
            </div>
            <div className="p-4">
                <div className="flex flex-col gap-y-2 text-sm">
                    <PlanBlocksItemExercise block={block} />
                </div>
            </div>
        </TrkCard>
    );
};
