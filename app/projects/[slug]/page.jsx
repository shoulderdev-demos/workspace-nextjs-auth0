import { notFound, redirect } from 'next/navigation';
import { auth0 } from '../../../lib/auth0';
import { projectBySlug, maySee, boards } from '../../../lib/data';

export default async function Project({ params }) {
  const { slug } = await params;
  const session = await auth0.getSession();
  if (!session) redirect(`/auth/login?returnTo=/projects/${encodeURIComponent(slug)}`);
  const project = projectBySlug(slug);
  if (!project || !maySee(project, session.user.email)) notFound();
  return (
    <>
      <h1>{project.name}</h1>
      <p>{project.summary}</p>
      {project.visibility === 'private' ? (
        <>
          <p><strong>Board only.</strong></p>
          <p>Budget: £{project.budget.toLocaleString('en-GB')}</p>
          <p>Decision due: {project.due}</p>
          <p>Notes: {project.notes}</p>
          <p>On the board: {(boards[project.slug] ?? []).join(', ')}</p>
        </>
      ) : (
        <p>Due: {project.due}</p>
      )}
    </>
  );
}
