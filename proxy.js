import { auth0 } from './lib/auth0';

// The SDK answers /auth/login, /auth/callback, /auth/logout and /auth/profile here, and keeps the
// session fresh on every other page. The API under /api takes bearer tokens, not the session.
export async function proxy(request) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
};
