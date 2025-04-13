import { AppRoutes } from '@/app/routes';
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const publicRoutes = [AppRoutes.Signin(), AppRoutes.Signup(), AppRoutes.Error(), AppRoutes.Auth(), AppRoutes.Api()];

export async function updateSession(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

    console.log('isPublicRoute', isPublicRoute, pathname);

    if (isPublicRoute) {
        return NextResponse.next();
    }

    let supabaseResponse = NextResponse.next({
        request
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

                    supabaseResponse = NextResponse.next({
                        request
                    });

                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                }
            }
        }
    );

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user && !isPublicRoute) {
        const url = request.nextUrl.clone();

        if (pathname.startsWith(AppRoutes.Signup())) {
            url.pathname = AppRoutes.Signup();
        } else {
            url.pathname = AppRoutes.Signin();
        }

        url.searchParams.set('redirect', pathname);

        return NextResponse.redirect(url);
    }

    // IMPORTANT: You *must* return the supabaseResponse object as it is.
    // If you're creating a new response object with NextResponse.next() make sure to:
    // 1. Pass the request in it, like so:
    //    const myNewResponse = NextResponse.next({ request })
    // 2. Copy over the cookies, like so:
    //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
    // 3. Change the myNewResponse object to fit your needs, but avoid changing
    //    the cookies!
    // 4. Finally:
    //    return myNewResponse
    // If this is not done, you may be causing the browser and server to go out
    // of sync and terminate the user's session prematurely!

    return supabaseResponse;
}
