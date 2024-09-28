// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const host = req.headers.get('host');
  const finalDomain = host === 'localhost:3000' ? 'buyindiahomes.in' : host;

  // Add the website domain to the request headers
  req.headers.set('x-website-domain', finalDomain);

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
}
