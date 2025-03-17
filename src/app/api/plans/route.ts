import { NextRequest } from 'next/server';

const mockPlans = [
    {
        id: crypto.randomUUID(),
        name: 'Long Plan Title to Test Line Wrapping and Truncating',
        blocks: [
            {
                id: crypto.randomUUID(),
                type: 'exercise',
                description: 'Push-Ups',
                setType: 'reps',
                sets: [
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                type: 'exercise',
                description: 'Pull-Ups',
                setType: 'reps',
                sets: [
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                type: 'exercise',
                description: 'Body-Weight Squats',
                setType: 'reps',
                sets: [
                    {
                        reps: 30,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 30,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 30,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 30,
                        time: 0,
                        rest: 30
                    }
                ]
            },
            {
                id: crypto.randomUUID(),
                type: 'exercise',
                description: 'Hanging Knee-to-Elbow Raises',
                setType: 'reps',
                sets: [
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
                        time: 0,
                        rest: 30
                    },
                    {
                        reps: 10,
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
        if (id) {
            resolve(Response.json(mockPlans.find((plan) => plan.id === id)));
        } else {
            resolve(Response.json(mockPlans));
        }
    });
}
