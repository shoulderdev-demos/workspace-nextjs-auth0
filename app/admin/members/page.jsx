import { redirect } from 'next/navigation';
import { auth0 } from '../../../lib/auth0';
import { admins, boards, projects } from '../../../lib/data';

// Who runs the workspace and who sits on each board. The dashboard links here for admins only.
export default async function Members() {
  const session = await auth0.getSession();
  if (!session) redirect('/auth/login?returnTo=/admin/members');
  return (
    <>
      <h1>Members and admins</h1>
      <h2>Admins</h2>
      <ul>{admins.map((a) => <li key={a}>{a}</li>)}</ul>
      <h2>Boards</h2>
      <ul>
        {projects.filter((p) => p.visibility === 'private').map((p) => (
          <li key={p.slug}>{p.name}: {(boards[p.slug] ?? []).join(', ')}</li>
        ))}
      </ul>
    </>
  );
}
