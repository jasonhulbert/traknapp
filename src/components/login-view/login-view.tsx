'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrkField } from '@/lib/ui/field/field';
import { TrkInput } from '@/lib/ui/input/input';
import { TrkButton } from '@/lib/ui/button/button';
import { TrkCard } from '@/lib/ui/card/card';
import { TrkView } from '@/lib/ui/view/view';
import { useSupabase } from '@/providers/supabase/supabase-provider';
import { TrkLink } from '@/lib/ui/link/link';
import { Info, ShieldQuestion } from 'lucide-react';
import { TrkTitle } from '@/lib/ui/title/title';
import { TrkTabsButton, TrkTabsButtonProps } from '@/lib/ui/tabs/tabs-button';
import { TrkTabs } from '@/lib/ui/tabs/tabs';
import { TrkTabsContent, TrkTabsContentProps } from '@/lib/ui/tabs/tabs-content';
import { useTrkTabs } from '@/lib/ui/tabs/tabs-provider';

export type SignupFormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
};

export type SigninFormData = {
    email: string;
    password: string;
};

export const LoginView: FC = () => {
    const { client, session, setSession } = useSupabase();
    const { active } = useTrkTabs();
    const router = useRouter();

    const redirectHome = useCallback(() => {
        router.push('/');
    }, [router]);

    const signin = useCallback(
        async (formData: SigninFormData) => {
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

    const signup = useCallback(
        async (formData: SignupFormData) => {
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

    const [signupFormData, setSignupFormData] = useState<SignupFormData>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: ''
    });

    const [signinFormData, setSigninFormData] = useState<SigninFormData>({
        email: '',
        password: ''
    });

    const trkTabsButtonsProps = useMemo<TrkTabsButtonProps[]>(
        () => [
            {
                label: <TrkTitle weight={700}>Sign Up</TrkTitle>,
                id: 'signup-tab',
                active: active === 'signup-tab'
            },
            {
                label: <TrkTitle weight={700}>Sign In</TrkTitle>,
                id: 'signin-tab',
                active: active === 'signin-tab'
            }
        ],
        [active]
    );

    const trkTabsContentProps = useMemo<TrkTabsContentProps[]>(
        () => [
            {
                id: 'signup-tab',
                active: active === 'signup-tab',
                children: (
                    <div className="mt-4">
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
                                        <TrkLink href="#signin">Sign in here</TrkLink>
                                    </div>
                                ),
                                footerEnd: (
                                    <div className="flex items-center gap-2">
                                        <TrkButton theme="primary" onClick={() => signup(signupFormData)}>
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
                    </div>
                )
            },
            {
                id: 'signin-tab',
                active: active === 'signin-tab',
                children: (
                    <div className="mt-4">
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
                                        <TrkLink href="#signup">Sign up here</TrkLink>
                                    </div>
                                ),
                                footerEnd: (
                                    <div className="flex items-center gap-2">
                                        <TrkButton theme="primary" onClick={() => signin(signinFormData)}>
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
                    </div>
                )
            }
        ],
        [signupFormData, setSignupFormData, signinFormData, setSigninFormData, active, signin, signup]
    );

    const trkTabsButtons = useMemo(
        () => trkTabsButtonsProps.map((props, i) => <TrkTabsButton key={i} {...props} />),
        [trkTabsButtonsProps]
    );

    const trkTabsContent = useMemo(
        () => trkTabsContentProps.map((props, i) => <TrkTabsContent key={i} {...props} />),
        [trkTabsContentProps]
    );

    useEffect(() => {
        if (session) {
            redirectHome();
        }
    }, [session, redirectHome]);

    return (
        <TrkView variant="inset">
            <TrkTabs activeTab="signin-tab" tabs={trkTabsButtons} content={trkTabsContent} />
        </TrkView>
    );
};
