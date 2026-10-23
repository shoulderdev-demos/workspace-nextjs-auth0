import { auth0 } from '../lib/auth0';

export const metadata = { title: 'Workspace' };

export default async function RootLayout({ children }) {
  const session = await auth0.getSession();
  const user = session?.user;
  return (
    <html lang="en">
      <body style={{ font: '16px/1.5 system-ui, sans-serif', maxWidth: '48rem', margin: '2rem auto', padding: '0 1rem' }}>
        <header style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', color: '#555' }}>
          <a href="/"><strong>Workspace</strong></a>
          {user ? (
            <p>Signed in as {user.name} ({user.email}) · <a href="/dashboard">Dashboard</a> · <a href="/auth/logout">Sign out</a></p>
          ) : (
            <p><a href="/auth/login?returnTo=/dashboard">Sign in</a></p>
          )}
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
