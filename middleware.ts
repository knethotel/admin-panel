import { NextResponse } from 'next/server';

export function middleware(req: any) {
  const adminData = req.cookies.get('admin'); // Alternatively, use session storage

  // Redirect unauthenticated users trying to access protected routes
  if (!adminData?.token && req.nextUrl.pathname.startsWith('/super-admin')) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}
