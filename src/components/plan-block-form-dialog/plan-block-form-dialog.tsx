import { FC, JSX, useCallback, useEffect, useState } from 'react';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkDialog } from '@/lib/ui/dialog/dialog';
import { PlanBlock } from '@/types/plan';
import { PlanBlockType } from '@/models/plan';
import { PlanBlockExerciseForm } from '../plan-block-exercise-form/plan-block-exercise-form';
import { TrkSelect } from '@/lib/ui/select/select';

export type PlanBlockFormDialogProps = {
    dialogId: string;
    initBlock?: Partial<PlanBlock>;
    onSubmit?: (block: Partial<PlanBlock> | undefined) => void;
    onCancel?: () => void;
};

export const PlanBlockFormDialog: FC<PlanBlockFormDialogProps> = ({
    dialogId,
    initBlock,
    onSubmit,
    onCancel
}): JSX.Element => {
    const [blockData, setBlockData] = useState<Partial<PlanBlock>>();

    const onBlockUpdate = useCallback(
        (block: Partial<PlanBlock>) => {
            setBlockData(block);
        },
        [setBlockData]
    );

    useEffect(() => {
        setBlockData(initBlock);

        return () => {
            setBlockData(undefined);
        };
    }, [initBlock]);

    return (
        <TrkDialog
            id={dialogId}
            title={blockData?.id ? 'Edit Block' : 'Add Block'}
            size="default"
            slots={{
                footer: (
                    <div className="flex items-center gap-3">
                        <TrkButton
                            classNames={{ button: 'flex-1' }}
                            theme="primary"
                            onClick={() => onSubmit?.(blockData)}
                        >
                            {blockData?.id ? 'Save Changes' : 'Save & Add'}
                        </TrkButton>
                        <TrkButton classNames={{ button: 'flex-1' }} onClick={() => onCancel?.()}>
                            Cancel
                        </TrkButton>
                    </div>
                )
            }}
            onClose={() => onCancel?.()}
        >
            <div className="grid grid-cols-1 gap-4">
                <TrkSelect
                    label="Block Type"
                    value={blockData?.type}
                    onChange={(e) => onBlockUpdate({ ...blockData, type: e.target.value as PlanBlockType })}
                >
                    <option value="">Select a Block Type...</option>
                    {Object.entries(PlanBlockType).map(([key, value]) => (
                        <option value={value} key={key}>
                            {key}
                        </option>
                    ))}
                </TrkSelect>

                {blockData?.type === PlanBlockType.Exercise && (
                    <PlanBlockExerciseForm initBlock={blockData} onUpdate={onBlockUpdate} />
                )}
            </div>
        </TrkDialog>
    );
};
