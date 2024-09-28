// middleware.js
import { NextResponse } from 'next/server';
import config from './config';

export function middleware(req) {
  const host = req.headers.get('host');
  const finalDomain = host === 'localhost:3000' ? 'buyindiahomes.in' : host;

  // Add the website domain to the request headers or context
  req.headers.set('X-Website-Domain', finalDomain);

  return NextResponse.next();
}
