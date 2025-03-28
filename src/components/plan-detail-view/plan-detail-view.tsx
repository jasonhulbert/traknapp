'use client';

import { FC, JSX, useCallback, useRef, useState } from 'react';
import { TrkButton } from '@/lib/ui/button/button';
import { useTrkDialog } from '@/lib/ui/dialog';
import { Plan, PlanBlock } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import { PlanBlocks } from '../plan-blocks/plan-blocks';
import { TrkLink } from '@/lib/ui/link/link';
import { TrkView } from '@/lib/ui/view/view';
import { Plus } from 'lucide-react';
import { PlanBlockFormDialog } from '../plan-block-form-dialog/plan-block-form-dialog';
import { TrkMetaBar } from '@/lib/ui/meta-bar/meta-bar';
import { TrkTitle } from '@/lib/ui/title/title';

export type PlanDetailViewProps = {
    plan: Plan;
};

export const PlanDetailView: FC<PlanDetailViewProps> = ({ plan }): JSX.Element => {
    const { updatePlan } = useAppStore((state) => state);
    const { dialogState, setDialogState } = useTrkDialog();
    const [editingBlock, setEditingBlock] = useState<Partial<PlanBlock> | null>(null);
    const blockFormDialogId = useRef(`block-form-dialog-${plan.id}`);

    const openBlockFormDialog = useCallback(
        (block?: Partial<PlanBlock>) => {
            setEditingBlock(block ?? {});

            if (dialogState[blockFormDialogId.current]) {
                return;
            }

            setDialogState((prevState) => ({
                ...prevState,
                [blockFormDialogId.current]: true
            }));
        },
        [dialogState, setDialogState, blockFormDialogId]
    );

    const closeBlockFormDialog = useCallback(() => {
        setEditingBlock(null);

        if (!dialogState[blockFormDialogId.current]) {
            return;
        }

        setDialogState((prevState) => ({
            ...prevState,
            [blockFormDialogId.current]: false
        }));
    }, [dialogState, setDialogState]);

    const onBlockFormSubmit = useCallback(
        (block: Partial<PlanBlock> | null | undefined) => {
            // If there's an existing block, update it. Otherwise, add a new block and generate an ID.
            // TODO: Remove the ID generation and utilize an ID from the server.
            if (block?.id) {
                plan.blocks = plan.blocks.map((b) => (b.id === block.id ? { ...b, ...block } : b));
            } else {
                plan.blocks = [...plan.blocks, { id: crypto.randomUUID(), ...block } as PlanBlock];
            }

            updatePlan(plan);

            closeBlockFormDialog();
        },
        [plan, updatePlan, closeBlockFormDialog]
    );

    return (
        <TrkView variant="inset">
            <TrkMetaBar
                slots={{
                    title: (
                        <TrkTitle weight={700} size="lg" tag="h2" truncate={true}>
                            {plan.name}
                        </TrkTitle>
                    ),
                    breadcrumbs: [
                        { label: 'Home', href: '/' },
                        { label: 'Plans', href: '/plans' }
                    ].map((b, i) => (
                        <TrkLink key={i} href={b.href}>
                            {b.label}
                        </TrkLink>
                    )),
                    actions: (
                        <>
                            <TrkButton size="sm" theme="primary" onClick={() => openBlockFormDialog()}>
                                <Plus size={16} />
                                <span>Add Block</span>
                            </TrkButton>
                        </>
                    )
                }}
            />

            <PlanBlocks blocks={plan?.blocks} onEdit={(block: PlanBlock) => openBlockFormDialog(block)}></PlanBlocks>

            {editingBlock && (
                <PlanBlockFormDialog
                    dialogId={blockFormDialogId.current}
                    initBlock={editingBlock ?? {}}
                    onSubmit={(block) => onBlockFormSubmit(block)}
                    onCancel={() => closeBlockFormDialog()}
                ></PlanBlockFormDialog>
            )}
        </TrkView>
    );
};
