export enum AppRouteName {
    Api = 'Api',
    Auth = 'Auth',
    AuthCallback = 'AuthCallback',
    AuthConfirm = 'AuthConfirm',
    Error = 'Error',
    Home = 'Home',
    PlanDetails = 'PlanDetails',
    Plans = 'Plans',
    Signin = 'Signin',
    Signup = 'Signup'
}

export const AppRoutes: Record<AppRouteName, (...params: Array<{ [param: string]: string }>) => string> = {
    Api: () => '/api',
    Auth: () => '/auth',
    AuthConfirm: () => '/auth/confirm',
    AuthCallback: () => '/auth/callback',
    Error: () => '/error',
    Signin: () => '/signin',
    Signup: () => '/signup',
    Home: () => '/',
    Plans: () => '/plans',
    PlanDetails: (id) => `/plans/${id}`
} as const;
