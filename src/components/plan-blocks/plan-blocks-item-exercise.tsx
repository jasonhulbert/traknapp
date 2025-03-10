import { FC, Fragment, JSX } from 'react';
import { PlanExerciseBlock } from '@/types/plan';
import { TrkTitle } from '@/lib/ui/title/title';
import { PlanExerciseBlockSetType } from '@/models/plan';

export const PlanBlocksItemExercise: FC<{ block: PlanExerciseBlock }> = ({ block }): JSX.Element => {
    return (
        <div className="grid grid-cols-3 gap-2">
            <TrkTitle tag="h3" size="sm">
                Reps
            </TrkTitle>
            <TrkTitle tag="h3" size="sm">
                Time
            </TrkTitle>
            <TrkTitle tag="h3" size="sm">
                Rest
            </TrkTitle>
            {block.sets.map((set, i) => (
                <Fragment key={i}>
                    <TrkTitle size="3xl" weight={800}>
                        {block.setType === PlanExerciseBlockSetType.Reps ? (
                            set.reps
                        ) : (
                            <span className="text-stone-300">-</span>
                        )}
                    </TrkTitle>
                    <TrkTitle size="3xl" weight={800}>
                        {block.setType === PlanExerciseBlockSetType.Time ? (
                            set.time
                        ) : (
                            <span className="text-stone-300">-</span>
                        )}
                    </TrkTitle>
                    <TrkTitle size="3xl" weight={800}>
                        {set.rest}
                    </TrkTitle>
                </Fragment>
            ))}
        </div>
    );
};
