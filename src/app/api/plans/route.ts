import { NextRequest } from 'next/server';

const mockPlans = [
    {
        id: crypto.randomUUID(),
        name: 'Long Plan Title to Test Line Wrapping and Truncating',
        blocks: [
            {
                id: crypto.randomUUID(),
                description: 'Push-Ups',
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
            },
            {
                id: crypto.randomUUID(),
                description: 'Pull-Ups',
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
            },
            {
                id: crypto.randomUUID(),
                description: 'Body-Weight Squats',
                setType: 'rep',
                sets: [
                    {
                        count: 30,
                        time: 0,
                        rest: 30
                    },
                    {
                        count: 30,
                        time: 0,
                        rest: 30
                    },
                    {
                        count: 30,
                        time: 0,
                        rest: 30
                    },
                    {
                        count: 30,
                        time: 0,
                        rest: 30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                description: 'Hanging Knee-to-Elbow Raises',
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

    return new Promise((resolve) => {
        setTimeout(() => {
            if (id) {
                resolve(Response.json(mockPlans.find((plan) => plan.id === id)));
            } else {
                resolve(Response.json(mockPlans));
            }
        }, 1000); // Mock delay
    });
}
