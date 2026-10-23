import { redirect } from 'next/navigation';
import { auth0 } from '../../lib/auth0';
import { visibleTo, isAdmin } from '../../lib/data';

export default async function Dashboard() {
  const session = await auth0.getSession();
  if (!session) redirect('/auth/login?returnTo=/dashboard');
  const { user } = session;
  return (
    <>
      <h1>Dashboard</h1>
      <p>Signed in as {user.name} ({user.email}).</p>
      <ul>
        {visibleTo(user.email).map((p) => (
          <li key={p.slug}><a href={`/projects/${p.slug}`}>{p.name}</a>{p.visibility === 'private' ? ' (board only)' : ''}</li>
        ))}
      </ul>
      {isAdmin(user.email) ? <p><a href="/admin/members">Members and admins</a></p> : null}
    </>
  );
}
