import { NextRequest } from 'next/server';

const mockPlans = [
    {
        id: '1',
        name: 'Long Plan Title to Test Line Wrapping and Truncating',
        blocks: [
            {
                id: '1',
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
                id: '2',
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
                id: '3',
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
                id: '4',
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

    console.log(id);

    if (id) {
        return Response.json(mockPlans.find((plan) => plan.id === id));
    } else {
        return Response.json(mockPlans);
    }
}
