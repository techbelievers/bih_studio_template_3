// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const host = req.headers.get('x-forwarded-host') || 'localhost:3000'; 
  const finalDomain =  host;
  const { pathname } = req.nextUrl;
  console.log(pathname)
  console.log('middleware : ',finalDomain);
  req.headers.set('x-website-domain', finalDomain);
  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  // const hostname = req.headers.get('x-forwarded-host');
  // const protocol = req.headers.get('x-forwarded-proto') || 'http';


  // console.log('middleware - hostname: ',hostname);
  // console.log('middleware - protocol: ',protocol);

  // const { pathname } = req.nextUrl;


  // console.log(pathname)
  // Exclude paths (e.g., API routes, static files, etc.)
  // if (
  //   pathname.startsWith('/_next') || // Exclude Next.js internal files
  //   pathname.startsWith('/api') || // Exclude API routes
  //   pathname.startsWith('/static') || // Exclude static files
  //   pathname.startsWith('/favicon.ico') || // Exclude favicon
  //   pathname.endsWith('.png') || // Exclude image assets
  //   pathname.endsWith('.jpg') ||
  //   pathname.endsWith('.css') ||
  //   pathname.endsWith('.js') ||
  //   pathname.endsWith('/AppTemplate/')
  // ) {
  //   return NextResponse.next();
  // }

   // If already https and www, skip redirect
  //  if (protocol === 'https' && hostname.startsWith('www.')) {
  //   return NextResponse.next();
  // }

  // // Redirect non-www to www
  // if (!hostname.startsWith('www.') && !hostname.startsWith('localhost')) {
  //   return NextResponse.redirect(`https://www.${hostname}${req.nextUrl.pathname}`, 301);
  // }
  // // Redirect HTTP to HTTPS
  // if (protocol !== 'https') {
  //   return NextResponse.redirect(`http://${hostname}${req.nextUrl.pathname}`, 301);
  // }
  // return NextResponse.next();
}

// Specify paths for which the middleware should apply
export const config = {
  matcher: ['/((?!api).*)'], // This will match all routes except those starting with '/api'
};