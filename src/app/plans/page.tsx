import { PlanProvider } from '@/providers/plan-provider';
import { PlanBlocks } from '@/components/plan-blocks/plan-blocks';
import { PlanBlockEditor } from '@/components/plan-block-editor/plan-block-editor';

export default function Page() {
    return (
        <PlanProvider>
            <PlanBlocks></PlanBlocks>
            <PlanBlockEditor />
        </PlanProvider>
    );
}
