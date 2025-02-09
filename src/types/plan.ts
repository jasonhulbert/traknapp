import { PlanBlockSetType } from '@/models/plan';

export type Plan = {
    id: string;
    name: string;
    blocks: PlanBlock[];
};

export type PlanBlock = {
    id: string;
    description: string;
    setType: PlanBlockSetType;
    sets: Array<Partial<PlanBlockSet>>;
};

export type PlanBlockSet = {
    count: number;
    time: number;
    rest: number;
};
