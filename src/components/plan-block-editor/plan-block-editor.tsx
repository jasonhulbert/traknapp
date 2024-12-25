import { PlanBlock } from '@/types/plan';
import { FC, JSX } from 'react';
import { PlanBlockEditorMetadata } from './plan-block-editor-metadata';
import { PlanBlockEditorExercise } from './plan-block-editor-exercise';

export const PlanBlockEditor: FC<{ block?: PlanBlock }> = ({ block }): JSX.Element => {
    return (
        <>
            <h2>Editing: {block?.description}</h2>
            <PlanBlockEditorMetadata />
            <PlanBlockEditorExercise />
        </>
    );
};
