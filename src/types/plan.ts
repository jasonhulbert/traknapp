import { PlanExerciseBlockSetType, PlanBlockType } from '@/models/plan';

export type Plan = {
    id: string;
    name: string;
    blocks: PlanBlock[];
};

export type PlanBlock = {
    id: string;
    description: string;
    type: PlanBlockType;
};

export type PlanExerciseBlock = PlanBlock & {
    setType: PlanExerciseBlockSetType;
    sets: Array<Partial<PlanExerciseBlockSet>>;
    notes?: string;
};

export type PlanExerciseBlockSet = {
    reps: number;
    time: number;
    rest: number;
};
