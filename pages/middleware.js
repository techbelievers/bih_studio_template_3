// middleware.js
import { NextResponse } from 'next/server';
import config from './config';

export function middleware(req) {
  const host = req.headers.get('host');

  // Set default website domain
  let websiteDomain = 'default.domain.com'; // Fallback

  // Check if the host exists in the configuration
  if (config[host]) {
    websiteDomain = host;
  }

  // Add the website domain to the request headers or context
  req.headers.set('X-Website-Domain', websiteDomain);

  return NextResponse.next();
}
