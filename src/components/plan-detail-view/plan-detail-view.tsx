'use client';

import { FC, JSX, useCallback, useEffect, useRef, useState } from 'react';
import { TrkButton } from '@/lib/ui/button/button';
import { useTrkDialog } from '@/lib/ui/dialog';
import { Plan, PlanBlock } from '@/types/plan';
import { useAppStore } from '@/store/app-store';
import { PlanBlocks } from '../plan-blocks/plan-blocks';
import { useNavBar } from '@/lib/ui/nav-bar/nav-bar-provider';
import { TrkLink } from '@/lib/ui/link/link';
import { TrkView } from '@/lib/ui/view/view';
import { Plus } from 'lucide-react';
import { PlanBlockFormDialog } from '../plan-block-form-dialog/plan-block-form-dialog';

export type PlanDetailViewProps = {
    plan: Plan;
};

export const PlanDetailView: FC<PlanDetailViewProps> = ({ plan }): JSX.Element => {
    const { updatePlan } = useAppStore((state) => state);
    const { dialogState, setDialogState } = useTrkDialog();
    const [editingBlock, setEditingBlock] = useState<Partial<PlanBlock> | null>(null);
    const { setTitle, setBreadcrumbs, setActions, resetNavbar } = useNavBar();
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

    const deleteBlock = useCallback(
        (block: PlanBlock) => {
            plan.blocks = plan.blocks.filter((b) => b.id !== block.id);

            updatePlan(plan);
        },
        [plan, updatePlan]
    );

    const onBlockFormSubmit = useCallback(
        (block: Partial<PlanBlock> | null | undefined) => {
            console.log('onBlockFormSubmit', block);

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

    useEffect(() => {
        setTitle(plan.name);

        setBreadcrumbs(
            [
                { label: 'Home', href: '/' },
                { label: 'Plans', href: '/plans' }
            ].map((b, i) => (
                <TrkLink key={i} href={b.href}>
                    {b.label}
                </TrkLink>
            ))
        );

        setActions(
            <>
                <TrkButton size="sm" theme="primary" onClick={() => openBlockFormDialog()}>
                    <Plus size={16} />
                    Add Block
                </TrkButton>
            </>
        );

        return () => {
            resetNavbar();
        };
    }, [plan, setTitle, setBreadcrumbs, setActions, resetNavbar, openBlockFormDialog]);

    return (
        <TrkView variant="inset">
            <PlanBlocks
                blocks={plan?.blocks}
                onEdit={(block: PlanBlock) => openBlockFormDialog(block)}
                onDelete={(block) => deleteBlock(block)}
            ></PlanBlocks>

            {editingBlock && (
                <PlanBlockFormDialog
                    dialogId={blockFormDialogId.current}
                    block={editingBlock ?? {}}
                    onSubmit={(block) => onBlockFormSubmit(block)}
                    onCancel={() => closeBlockFormDialog()}
                ></PlanBlockFormDialog>
            )}
        </TrkView>
    );
};
