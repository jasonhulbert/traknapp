'use client';

import { useRouter } from 'next/navigation';
import { Info, ShieldQuestion } from 'lucide-react';
import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { AppRoutes } from '@/app/routes';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkField } from '@/lib/ui/field/field';
import { TrkInput } from '@/lib/ui/input/input';
import { TrkLink } from '@/lib/ui/link/link';
import { TrkTitle } from '@/lib/ui/title/title';
import { TrkView } from '@/lib/ui/view/view';
import { useSupabase } from '@/providers/supabase/supabase-provider';

export type SignupFormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
};

export const SignupView: FC = () => {
    const { client, session, setSession } = useSupabase();
    const router = useRouter();

    const [signupFormData, setSignupFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: ''
    });

    const redirectHome = useCallback(() => {
        router.push(AppRoutes.Home());
    }, [router]);

    const signup = useCallback(
        async (evt: FormEvent, formData: SignupFormData) => {
            evt.preventDefault();

            try {
                const { data } = (await client?.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            first_name: formData.firstName,
                            last_name: formData.lastName,
                            dob: formData.dob
                        }
                    }
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

    useEffect(() => {
        if (session) {
            redirectHome();
        }
    }, [session, redirectHome]);

    return (
        <TrkView variant="inset">
            <form className="block mt-4" onSubmit={(evt: FormEvent) => signup(evt, signupFormData)}>
                <TrkCard
                    classNames={{ card: '!w-full !max-w-[calc(var(--spacing)*120)] !mx-auto' }}
                    slots={{
                        headerStart: (
                            <TrkTitle weight={700} size="lg" tag="h2">
                                Sign Up
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
                                    <span className="leading-4 flex-1">Already have an account?</span>
                                </div>
                                <TrkLink href={AppRoutes.Signin()}>Sign in here</TrkLink>
                            </div>
                        ),
                        footerEnd: (
                            <div className="flex items-center gap-2">
                                <TrkButton type="submit" theme="primary">
                                    Continue
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
                                    value={signupFormData?.email}
                                    onChange={(evt) =>
                                        setSignupFormData((prev: SignupFormData) => ({
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
                                    value={signupFormData?.password}
                                    onChange={(evt) =>
                                        setSignupFormData((prev: SignupFormData) => ({
                                            ...prev,
                                            password: evt.target.value
                                        }))
                                    }
                                    type="password"
                                />
                            </TrkField>
                        </div>
                        <div className="col-span-2">
                            <TrkField>
                                <TrkInput
                                    label="First Name"
                                    value={signupFormData?.firstName}
                                    onChange={(evt) =>
                                        setSignupFormData((prev: SignupFormData) => ({
                                            ...prev,
                                            firstName: evt.target.value
                                        }))
                                    }
                                    type="text"
                                />
                            </TrkField>
                        </div>
                        <div className="col-span-2">
                            <TrkField>
                                <TrkInput
                                    label="Last Name"
                                    value={signupFormData?.lastName}
                                    onChange={(evt) =>
                                        setSignupFormData((prev: SignupFormData) => ({
                                            ...prev,
                                            lastName: evt.target.value
                                        }))
                                    }
                                    type="text"
                                />
                            </TrkField>
                        </div>
                        <div className="col-span-2">
                            <TrkField>
                                <TrkInput
                                    label="DOB"
                                    value={signupFormData?.dob}
                                    onChange={(evt) =>
                                        setSignupFormData((prev: SignupFormData) => ({
                                            ...prev,
                                            dob: evt.target.value
                                        }))
                                    }
                                    type="text"
                                />
                            </TrkField>
                        </div>
                    </div>
                </TrkCard>
            </form>
        </TrkView>
    );
};
