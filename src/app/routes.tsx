export const AppRoutes: Record<string, (...params: Array<{ [param: string]: string }>) => string> = {
    Home: () => '/',
    Login: () => '/login',
    Plans: () => '/plans',
    PlanDetails: (id) => `/plans/${id}`
} as const;
