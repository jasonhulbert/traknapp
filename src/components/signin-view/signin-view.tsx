'use client';

import { FC, useCallback, useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Info, ShieldQuestion } from 'lucide-react';
import { useSupabase } from '@/providers/supabase/supabase-provider';
import { AppRoutes } from '@/app/routes';
import { TrkField } from '@/lib/ui/field/field';
import { TrkInput } from '@/lib/ui/input/input';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkView } from '@/lib/ui/view/view';
import { TrkLink } from '@/lib/ui/link/link';
import { TrkTitle } from '@/lib/ui/title/title';

export type SigninFormData = {
    email: string;
    password: string;
};

export const SigninView: FC = () => {
    const { client, session, setSession } = useSupabase();
    const router = useRouter();

    const redirectHome = useCallback(() => {
        router.push(AppRoutes.Home());
    }, [router]);

    const signin = useCallback(
        async (evt: FormEvent, formData: SigninFormData) => {
            evt.preventDefault();

            try {
                const { data } = (await client?.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password
                })) ?? { data: null };

                if (data && data.session) {
                    setSession(data?.session);
                }
            } catch (e) {
                throw e;
            }
        },
        [client, setSession]
    );

    const [signinFormData, setSigninFormData] = useState<SigninFormData>({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (session) {
            redirectHome();
        }
    }, [session, redirectHome]);

    return (
        <TrkView variant="inset">
            <form className="block mt-4" onSubmit={(evt: FormEvent) => signin(evt, signinFormData)}>
                <TrkCard
                    classNames={{ card: '!w-full !max-w-[calc(var(--spacing)*120)] !mx-auto' }}
                    slots={{
                        headerStart: (
                            <TrkTitle weight={700} size="lg" tag="h2">
                                Sign In
                            </TrkTitle>
                        ),
                        headerEnd: (
                            <TrkButton size="sm" theme="default" variant="ghost" iconOnly={true}>
                                <ShieldQuestion size={24} />
                            </TrkButton>
                        ),
                        footerStart: (
                            <div className="flex flex-col gap-1">
                                <div className="flex items-start gap-1 w-full text-xs">
                                    <Info size={16} className="w-4 h-4" />
                                    <span className="leading-4 flex-1">Need an account?</span>
                                </div>
                                <TrkLink href={AppRoutes.Signup()}>Sign up here</TrkLink>
                            </div>
                        ),
                        footerEnd: (
                            <div className="flex items-center gap-2">
                                <TrkButton type="submit" theme="primary">
                                    Submit
                                </TrkButton>
                            </div>
                        )
                    }}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <TrkField>
                                <TrkInput
                                    label="Email"
                                    value={signinFormData?.email}
                                    onChange={(evt) =>
                                        setSigninFormData((prev: SigninFormData) => ({
                                            ...prev,
                                            email: evt.target.value
                                        }))
                                    }
                                    type="email"
                                />
                            </TrkField>
                        </div>
                        <div className="col-span-2">
                            <TrkField>
                                <TrkInput
                                    label="Password"
                                    value={signinFormData?.password}
                                    onChange={(evt) =>
                                        setSigninFormData((prev: SigninFormData) => ({
                                            ...prev,
                                            password: evt.target.value
                                        }))
                                    }
                                    type="password"
                                />
                            </TrkField>
                        </div>
                    </div>
                </TrkCard>
            </form>
        </TrkView>
    );
};
