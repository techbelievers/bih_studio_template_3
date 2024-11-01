// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const host = req.headers.get('host');
  const finalDomain = host === 'localhost:3000' ? 'builderkonnect.com' : host;

  console.log(finalDomain)
  // Add the website domain to the request headers
  req.headers.set('x-website-domain', finalDomain);

  // console.log('middleware');
  // console.log(req.headers);

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}

// Specify paths for which the middleware should apply
export const config = {
  matcher: ['/((?!api).*)'], // This will match all routes except those starting with '/api'
};