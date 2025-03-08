import { FC, JSX } from 'react';
import { PlanBlock } from '@/types/plan';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkTitle } from '@/lib/ui/title/title';
import { PlanBlocksItemExercise } from './plan-blocks-item-exercise';
import { Edit, Trash } from 'lucide-react';

export type PlanBlocksItemProps = {
    block: PlanBlock;
    onEdit?: (block: PlanBlock) => void;
    onDelete?: (block: PlanBlock) => void;
};

export const PlanBlocksItem: FC<PlanBlocksItemProps> = ({ block, onEdit, onDelete }): JSX.Element => {
    return (
        <TrkCard>
            <div className="flex items-center justify-between flex-nowrap gap-x-2 w-full p-4">
                <div className="shrink flex flex-col">
                    <TrkTitle size="lg">{block.description}</TrkTitle>
                </div>
                <div className="flex-1 flex items-center justify-end gap-x-3">
                    <TrkButton
                        variant="ghost"
                        size="sm"
                        iconOnly={true}
                        radiusSize="full"
                        onClick={() => onEdit?.(block)}
                    >
                        <Edit size={32} />
                    </TrkButton>
                    <TrkButton
                        variant="ghost"
                        size="sm"
                        iconOnly={true}
                        radiusSize="full"
                        theme="danger"
                        onClick={() => onDelete?.(block)}
                    >
                        <Trash size={32} />
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
