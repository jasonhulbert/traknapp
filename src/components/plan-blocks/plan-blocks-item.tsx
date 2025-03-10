import { FC, JSX } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { PlanBlock, PlanExerciseBlock } from '@/types/plan';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkTitle } from '@/lib/ui/title/title';
import { PlanBlockType } from '@/models/plan';
import { PlanBlocksItemExercise } from './plan-blocks-item-exercise';
import { TrkBadge } from '@/lib/ui/badge/badge';

export type PlanBlocksItemProps = {
    block: PlanBlock;
    onEdit?: (block: PlanBlock) => void;
    onDelete?: (block: PlanBlock) => void;
};

export const PlanBlocksItem: FC<PlanBlocksItemProps> = ({ block, onEdit }): JSX.Element => {
    return (
        <TrkCard
            slots={{
                headerStart: (
                    <TrkTitle weight={700} size="lg" tag="h2">
                        {block.description}
                    </TrkTitle>
                ),
                headerEnd: (
                    <div className="flex-1 flex items-center justify-end gap-x-2">
                        <TrkButton
                            size="sm"
                            theme="primary"
                            variant="ghost"
                            iconOnly={true}
                            onClick={() => onEdit?.(block)}
                        >
                            <MoreHorizontal size={32} />
                        </TrkButton>
                    </div>
                ),
                footerStart: (
                    <div className="flex-1">
                        <TrkBadge>{block.type}</TrkBadge>
                    </div>
                )
            }}
        >
            <div className="pt-2">
                {block.type === PlanBlockType.Exercise && <PlanBlocksItemExercise block={block as PlanExerciseBlock} />}
            </div>
        </TrkCard>
    );
};
