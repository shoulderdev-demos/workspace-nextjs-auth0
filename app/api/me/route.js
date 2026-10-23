import { decodeJwt } from 'jose';

// Who the mobile app's bearer token says the caller is. The token is one Auth0 issued for this
// API (AUTH0_AUDIENCE).
export async function GET(request) {
  const match = /^Bearer\s+(.+)$/i.exec(request.headers.get('authorization') ?? '');
  if (!match) return Response.json({ error: 'a bearer token is needed' }, { status: 401 });
  let claims;
  try {
    claims = decodeJwt(match[1]);
  } catch {
    return Response.json({ error: 'not a token' }, { status: 401 });
  }
  return Response.json({ sub: claims.sub, email: claims.email, name: claims.name, api: process.env.AUTH0_AUDIENCE });
}
