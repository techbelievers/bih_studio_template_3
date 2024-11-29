// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // const host = req.headers.get('x-forwarded-host') || 'localhost:3000'; 
  // const finalDomain =  host;
  // console.log('middleware : ',finalDomain);
  // req.headers.set('x-website-domain', finalDomain);
  // return NextResponse.next({
  //   request: {
  //     headers: req.headers,
  //   },
  // });

  const hostname = req.headers.get('host');
  const protocol = req.headers.get('x-forwarded-proto') || 'http';
  // Redirect non-www to www
  if (!hostname.startsWith('www.') && !hostname.startsWith('localhost')) {
    return NextResponse.redirect(`https://www.${hostname}${req.nextUrl.pathname}`, 301);
  }
  // Redirect HTTP to HTTPS
  if (protocol !== 'https') {
    return NextResponse.redirect(`https://${hostname}${req.nextUrl.pathname}`, 301);
  }
  return NextResponse.next();
}

// Specify paths for which the middleware should apply
export const config = {
  matcher: ['/((?!api).*)'], // This will match all routes except those starting with '/api'
};