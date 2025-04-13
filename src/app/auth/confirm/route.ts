import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';
import { createClient } from '@/util/supabase/server';
import { redirect } from 'next/navigation';
import { AppRoutes } from '@/app/routes';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const next = searchParams.get('next') ?? '/';

    if (token_hash && type) {
        const supabase = await createClient();
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash
        });
        if (!error) {
            redirect(next);
        }
    }

    redirect(AppRoutes.Error());
}
