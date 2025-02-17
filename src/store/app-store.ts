import { create } from 'zustand';
import { Plan } from '@/types/plan';

export type AppState = {
    plans: Plan[];
};

export type AppActions = {
    setPlans: (plans: Plan[]) => void;
    addPlan: (plan: Plan) => void;
    updatePlan: (plan: Plan) => void;
    removePlan: (planId: string) => void;
};

export const useAppStore = create<AppState & AppActions>((set) => ({
    plans: [] as Plan[],
    setPlans: (plans): void => set({ plans }),
    addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
    updatePlan: (plan) => set((state) => ({ plans: state.plans.map((p) => (p.id === plan.id ? plan : p)) })),
    removePlan: (planId) => set((state) => ({ plans: state.plans.filter((plan) => plan.id !== planId) }))
}));
