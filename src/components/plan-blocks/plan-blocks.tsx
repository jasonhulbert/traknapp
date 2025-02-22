import { FC, JSX } from 'react';
import { PlanBlocksItem } from './plan-blocks-item';
import { PlanBlock } from '@/types/plan';

export type PlanBlocksProps = {
    blocks: PlanBlock[];
    onEdit?: (block: PlanBlock) => void;
    onDelete?: (block: PlanBlock) => void;
};

export const PlanBlocks: FC<PlanBlocksProps> = ({ blocks, onEdit, onDelete }): JSX.Element => {
    return (
        <div className="grid grid-cols-1 gap-y-4">
            {blocks?.map((block) => (
                <PlanBlocksItem key={block.id} block={block} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
};
