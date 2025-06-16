import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request) {
    //set cookie 
     const { pathname } = request.nextUrl
    
    const token = request.cookies.get('token');
    console.log(token , "jksjflkdjfl")
     const isPublicPath = pathname === '/login' || pathname.startsWith('/api/login')

    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return //NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!_next/|static/|favicon.ico).*)'],
}

