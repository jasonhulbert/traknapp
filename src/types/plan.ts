import { PropConst } from '@/types/prop-const';
import { PlanBlockSetTypes } from '@/models/plan';

export type Plan = {
    id: string;
    name: string;
    blocks: PlanBlock[];
};

export type PlanBlock = {
    id: string;
    description: string;
    setType: PropConst<typeof PlanBlockSetTypes>;
    sets: Array<Partial<PlanBlockSet>>;
};

export type PlanBlockSet = {
    count: number;
    time: number;
    rest: number;
};
