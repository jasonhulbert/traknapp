import { FC, JSX } from 'react';
import { PlanBlock } from '@/types/plan';

export const PlanBlocksItemExercise: FC<{ block: PlanBlock }> = ({ block }): JSX.Element => {
    return (
        <table className="table-fixed">
            <thead>
                <tr>
                    <th className="w-1/3 p-1 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                        Count
                    </th>
                    <th className="w-1/3 p-1 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                        Time
                    </th>
                    <th className="w-1/3 p-1 text-left text-xs font-medium uppercase tracking-wide text-neutral-400">
                        Rest
                    </th>
                </tr>
                {block.sets.map((set, i) => (
                    <tr key={i} className="border-b border-neutral-100 last:border-b-0">
                        <td className="w-1/3 p-1 text-left text-3xl font-semibold">
                            {block.setType === 'rep' ? set.count : <span className="text-neutral-300">-</span>}
                        </td>
                        <td className="w-1/3 p-1 text-left text-3xl font-semibold">
                            {block.setType === 'time' ? set.time : <span className="text-neutral-300">-</span>}
                        </td>
                        <td className="w-1/3 p-1 text-left text-3xl font-semibold">{set.rest}</td>
                    </tr>
                ))}
            </thead>
        </table>
    );
};
