'use client';

import { FC, JSX } from 'react';
import { AddSquareIcon, Cancel01Icon } from 'hugeicons-react';
import { PlanBlocks } from '../plan-blocks/plan-blocks';
import { TrkButton } from '../common/button/button';
import { TrkTitle } from '../common/title/title';
import { TrkDialog, useTrkDialog } from '../common/dialog';
import { PlanBlockForm } from '../plan-block-form/plan-block-form';
import { Plan, PlanBlock } from '@/types/plan';

export type PlanViewProps = {
    plan: Plan;
};

export const PlanView: FC<PlanViewProps> = ({ plan }): JSX.Element => {
    const { dialogState, setDialogState } = useTrkDialog();
    const blockFormDialogId = 'block-editor-dialog';

    const openBlockFormDialog = () => {
        if (dialogState[blockFormDialogId]) {
            return;
        }

        setDialogState((prevState) => ({
            ...prevState,
            [blockFormDialogId]: true
        }));
    };

    const closeBlockFormDialog = () => {
        if (!dialogState[blockFormDialogId]) {
            return;
        }

        setDialogState((prevState) => ({
            ...prevState,
            [blockFormDialogId]: false
        }));
    };

    const onBlockFormSubmit = (block: Partial<PlanBlock>) => {
        console.log('Submit...', block);
    };

    return (
        <>
            <div className="flex flex-col gap-y-4">
                <TrkTitle size="2xl" tag="h1">
                    {plan?.name}
                </TrkTitle>

                <PlanBlocks plan={plan}></PlanBlocks>

                <TrkButton variant="default" theme="primary" onClick={openBlockFormDialog}>
                    <AddSquareIcon className="w-6 h-6" width={24} height={24} />
                    Add Block
                </TrkButton>
            </div>

            <TrkDialog
                id={blockFormDialogId}
                title="New Block"
                variant="glass"
                slots={{
                    headerUtils: (
                        <TrkButton
                            size="sm"
                            variant="flat"
                            radiusSize="full"
                            iconOnly={true}
                            onClick={closeBlockFormDialog}
                        >
                            <Cancel01Icon className="w-6 h-6" width={24} height={24}></Cancel01Icon>
                        </TrkButton>
                    )
                }}
                onClose={closeBlockFormDialog}
            >
                <PlanBlockForm onSubmit={onBlockFormSubmit}></PlanBlockForm>
            </TrkDialog>
        </>
    );
};
