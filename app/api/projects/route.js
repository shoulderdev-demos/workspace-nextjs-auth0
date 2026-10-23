import { projects } from '../../../lib/data';

// The mobile app's list of projects.
export async function GET() {
  return Response.json({ projects });
}
