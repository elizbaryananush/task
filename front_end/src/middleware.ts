import { NextRequest, NextResponse } from 'next/server';
import { EnumTokens } from './services/auth-token.service';
import { DASHBOARD_PAGES } from './config/pages-url.config';

export async function middleware(request: NextRequest) {
    const { url, cookies } = request;
    const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value;

    
    const isAuthPage = url.includes('/auth');
    const isDashboardPage = url.includes(DASHBOARD_PAGES.HOME);

    if (isAuthPage && refreshToken) {
        return NextResponse.redirect(new URL(DASHBOARD_PAGES.HOME, url));
    }

    if (!refreshToken && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/me/:path*', '/auth/:path*'],
};
