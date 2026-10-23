import { publicProjects } from '../lib/data';

export default function Home() {
  return (
    <>
      <h1>Projects</h1>
      <ul>
        {publicProjects().map((p) => (
          <li key={p.slug}><a href={`/projects/${p.slug}`}>{p.name}</a>: {p.summary}</li>
        ))}
      </ul>
      <p>Board members see the board's projects too: <a href="/auth/login?returnTo=/dashboard">sign in</a>.</p>
    </>
  );
}
