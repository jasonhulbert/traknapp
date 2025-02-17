'use client';

import { FC, JSX, useCallback, useState } from 'react';
import { AddSquareIcon } from 'hugeicons-react';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkTitle } from '@/lib/ui//title/title';
import { TrkTitleBar } from '@/lib/ui/title-bar/title-bar';
import { TrkDialog, useTrkDialog } from '@/lib/ui/dialog';
import { Plan, PlanBlock } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import { PlanBlocks } from '../plan-blocks/plan-blocks';
import { PlanBlockForm } from '../plan-block-form/plan-block-form';

export type PlanDetailViewProps = {
    plan: Plan;
};

export const PlanDetailView: FC<PlanDetailViewProps> = ({ plan }): JSX.Element => {
    const { updatePlan } = useAppStore((state) => state);
    const { dialogState, setDialogState } = useTrkDialog();
    const [editingBlock, setEditingBlock] = useState<PlanBlock | null>(null);
    const blockFormDialogId = 'block-editor-dialog';

    const openBlockFormDialog = useCallback(
        (block?: Partial<PlanBlock>) => {
            setEditingBlock(block as PlanBlock);

            if (dialogState[blockFormDialogId]) {
                return;
            }

            setDialogState((prevState) => ({
                ...prevState,
                [blockFormDialogId]: true
            }));
        },
        [dialogState, setDialogState]
    );

    const closeBlockFormDialog = useCallback(() => {
        setEditingBlock(null);

        if (!dialogState[blockFormDialogId]) {
            return;
        }

        setDialogState((prevState) => ({
            ...prevState,
            [blockFormDialogId]: false
        }));
    }, [dialogState, setDialogState]);

    const onBlockFormSubmit = useCallback(
        (block: Partial<PlanBlock>) => {
            console.log(block);

            if (editingBlock) {
                plan.blocks = plan.blocks.map((b) => (b.id === editingBlock.id ? { ...b, ...block } : b));
            } else {
                plan.blocks = [...plan.blocks, block as PlanBlock];
            }

            updatePlan(plan);
            closeBlockFormDialog();
        },
        [plan, updatePlan, editingBlock, closeBlockFormDialog]
    );

    return (
        <>
            <TrkTitleBar
                breadcrumbs={[
                    {
                        label: 'Home',
                        path: '/'
                    },
                    {
                        label: 'Plans',
                        path: '/plans'
                    }
                ]}
                slots={{
                    title: (
                        <TrkTitle size="xl" tag="h1" truncate={true}>
                            {plan?.name}
                        </TrkTitle>
                    ),
                    actions: (
                        <>
                            <TrkButton
                                size="sm"
                                theme="primary"
                                variant="flat"
                                iconOnly={true}
                                onClick={() => openBlockFormDialog()}
                            >
                                <AddSquareIcon className="w-6 h-6" width={24} height={24}></AddSquareIcon>
                            </TrkButton>
                        </>
                    )
                }}
            />
            <div className="flex flex-col gap-y-4 p-4">
                <PlanBlocks
                    blocks={plan?.blocks}
                    onEdit={(block: PlanBlock) => openBlockFormDialog(block)}
                ></PlanBlocks>

                <TrkDialog
                    id={blockFormDialogId}
                    title={editingBlock?.description ? 'Edit Block' : 'New Block'}
                    slots={{
                        headerUtils: (
                            <TrkButton size="sm" variant="flat" onClick={closeBlockFormDialog}>
                                Cancel
                            </TrkButton>
                        )
                    }}
                    onClose={closeBlockFormDialog}
                >
                    <PlanBlockForm block={editingBlock} onSubmit={(block) => onBlockFormSubmit(block)}></PlanBlockForm>
                </TrkDialog>
            </div>
        </>
    );
};
