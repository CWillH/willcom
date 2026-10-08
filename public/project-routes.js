export const routes = ['home', 'experience', 'projects', 'resume', 'contact'];

export function readLocation(hash, projects) {
  const [page, slug] = hash.replace(/^#/, '').split('/');
  const route = routes.includes(page) ? page : 'home';
  const project = routes.includes(page) && slug
    ? projects.find(item => item.slug === slug) || null
    : null;
  return { route, project };
}

export function projectHash(project, route = 'projects') {
  return `#${routes.includes(route) ? route : 'projects'}/${project.slug}`;
}
