// The workspace's projects, and who may see the board's. In a real app these live in a database;
// here they are fixed, so a run needs nothing but the app.
export const projects = [
  { slug: 'atrium-refit', name: 'Atrium refit', summary: 'New lighting and seating for the ground floor atrium.', visibility: 'public', budget: 42000, notes: 'Quotes from three fitters; decision in the open meeting.', due: '14 November' },
  { slug: 'rooftop-garden', name: 'Rooftop garden', summary: 'Planting and a shaded seating area on the roof.', visibility: 'public', budget: 18500, notes: 'Residents voted for it in September.', due: '28 November' },
  { slug: 'meridian-sale', name: 'Meridian sale', summary: 'Offer received for the Meridian building.', visibility: 'private', budget: 4800000, notes: 'Board only: Halcyon offered 4.8m, answer due 3 November.', due: '3 November' },
  { slug: 'exchange-lease', name: 'Exchange lease', summary: 'Renewal terms for the Exchange tenants.', visibility: 'private', budget: 125000, notes: 'Board only: the landlord wants a 12% rise; counter at 6%.', due: '21 November' },
];

// Who runs the workspace, and who sits on the board for each private project, by the email
// address Auth0 gives.
export const admins = ['hiro.tanaka@acme.test'];
export const boards = {
  'meridian-sale': ['leo.novak@acme.test'],
  'exchange-lease': ['leo.novak@acme.test'],
};

export const publicProjects = () => projects.filter((p) => p.visibility === 'public');
export const projectBySlug = (slug) => projects.find((p) => p.slug === slug);
export const isAdmin = (email) => admins.includes(String(email ?? '').toLowerCase());
export const onTheBoard = (project, email) => (boards[project.slug] ?? []).includes(String(email ?? '').toLowerCase());
export const maySee = (project, email) => project.visibility === 'public' || onTheBoard(project, email);
export const visibleTo = (email) => projects.filter((p) => maySee(p, email));
