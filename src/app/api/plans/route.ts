import { NextRequest } from 'next/server';

// export type Plan = {
//     id: string;
//     name: string;
//     blocks: PlanBlock[];
// };

// export type PlanBlock = {
//     id: string;
//     description: string;
//     setType: PlanBlockSetType;
//     sets: Array<Partial<PlanBlockSet>>;
// };

// export type PlanBlockSet = {
//     count: number;
//     time: number;
//     rest: number;
// };

const mockPlans = [
    {
        id: '1',
        name: 'Plan 1',
        blocks: [
            {
                id: 'b1',
                description: 'Push-ups',
                setType: 'rep',
                sets: [
                    {
                        count: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        count: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        count: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        count: 10,
                        time: 0,
                        rest: 30
                    }
                ]
            }
        ]
    }
];

export async function GET(request: NextRequest): Promise<Response> {
    const id = request.nextUrl.searchParams.get('id');

    console.log(id);

    if (id) {
        return Response.json(mockPlans.find((plan) => plan.id === id));
    } else {
        return Response.json(mockPlans);
    }
}
