export type Plan = {
    id: string;
    name: string;
    blocks: PlanBlock[];
};

export type PlanBlock = {
    id: string;
    description: string;
    type: 'exercise' | 'rest' | 'recovery';
};

export type PlanExerciseBlock = PlanBlock & {
    setType: 'rep' | 'time';
    sets: Array<{
        count: number;
        time: number;
        rest: number;
    }>;
};
