# Workspace, with Auth0

A small team workspace: projects, some of them for the board only, people who sign in through Auth0, admins who run it, and a JSON API that takes Auth0's bearer tokens. Next.js 16 and the Auth0 Next.js SDK v4.

The flaws below are planted on purpose, to try tools and reviews against. Don't copy this code into anything real.

## Run it

Copy `.env.example` to `.env`, fill it from an Auth0 application and API of your own, then:

```
npm install
npm run dev
```

## Who is who

`lib/data.js` says who runs the workspace (the admins) and who sits on the board of each private project, by the email address Auth0 gives.

## What is planted

| Flaw | Where | The rule it breaks |
| --- | --- | --- |
| `/admin/members` opens for anyone signed in; the dashboard merely hides the link from non-admins | `app/admin/members/page.jsx` | OWASP ASVS V4.1.3: people reach only what they are specifically authorised for |
| `GET /api/projects` gives anyone every project, the two marked `"visibility": "private"` included, with their budgets and board notes | `app/api/projects/route.js` | CWE-306, missing authentication |
| `GET /api/me` decodes the bearer token without verifying it, so a token with the wrong algorithm, a bad signature or another audience is taken as good | `app/api/me/route.js` | RFC 8725, JSON Web Token best practices; CWE-347 |
| The session is kept whole in its cookie, the SDK's default, so a cookie kept from before signing out still signs in | `lib/auth0.js` | OWASP ASVS V3.3.1, CWE-613 |
