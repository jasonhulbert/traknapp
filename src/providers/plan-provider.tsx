'use client';

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo, useState } from 'react';
import { Plan, PlanExerciseBlock } from '@/types/plan';

const defaultPlan: Plan = {
    id: '1',
    name: 'Full Body Weight',
    blocks: [
        {
            id: '1',
            description: 'Push Up',
            type: 'exercise',
            setType: 'rep',
            sets: [
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                }
            ]
        } as PlanExerciseBlock,
        {
            id: '2',
            description: 'Pull Up',
            type: 'exercise',
            setType: 'rep',
            sets: [
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                }
            ]
        } as PlanExerciseBlock,
        {
            id: '3',
            description: 'Squat',
            type: 'exercise',
            setType: 'rep',
            sets: [
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                }
            ]
        } as PlanExerciseBlock,
        {
            id: '4',
            description: 'Step-Through Lunges',
            type: 'exercise',
            setType: 'rep',
            sets: [
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                }
            ]
        } as PlanExerciseBlock,
        {
            id: '5',
            description: 'Hanging Leg Raises',
            type: 'exercise',
            setType: 'rep',
            sets: [
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                },
                {
                    count: 10,
                    time: 0,
                    rest: 60
                }
            ]
        } as PlanExerciseBlock
    ]
};

export type PlanProviderProps = {
    plan: Partial<Plan> | null;
    setPlan: Dispatch<SetStateAction<Partial<Plan> | null>>;
};

export const PlanContext = createContext<PlanProviderProps>({
    plan: null,
    setPlan: (prevState: SetStateAction<Partial<Plan> | null>) => prevState
});

export const PlanProvider = ({ children }: PropsWithChildren) => {
    const [plan, setPlan] = useState<Partial<Plan> | null>(defaultPlan);

    const value = useMemo(() => ({ plan, setPlan }), [plan, setPlan]);

    return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export const PlanConsumer = PlanContext.Consumer;

export const usePlan = () => useContext(PlanContext);
