// Sign-in through Auth0. The SDK reads AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET,
// AUTH0_SECRET and APP_BASE_URL from the environment; the API's audience is asked for so the
// session holds an access token the mobile app can send to /api/me.
import { Auth0Client } from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client({
  authorizationParameters: {
    scope: 'openid profile email',
    audience: process.env.AUTH0_AUDIENCE,
  },
});
