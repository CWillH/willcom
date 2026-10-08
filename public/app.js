import { portfolio } from './content.js';
import { createDetailDialog } from './project-dialog.js';
import { createResumePreview } from './resume-preview.js';
import { routes, readLocation, projectHash } from './project-routes.js';

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
history.scrollRestoration = 'manual';
const main = document.querySelector('main');
const backdrop = document.querySelector('.home-backdrop');
const backdropDrawing = document.querySelector('.home-backdrop-drawing');
const navigationSurfaces = [main, backdrop];
const savedEntries = new Map();
const entryKeys = new WeakMap();
const historySession = crypto.randomUUID();
let entrySequence = 0;
const detailDialog = createDetailDialog(document.querySelector('#project-dialog'), portfolio.projects, {
  onChange({ entries, kind, depth }) {
    if (kind === 'close-all') {
      if (history.state?.portfolio && depth > 0) history.go(-depth);
      else history.replaceState(null, '', `#${currentRoute}`);
    } else if (kind === 'dismiss') {
      // Each popup level owns one browser history entry, including readers.
      if (history.state?.portfolio) history.back();
      else history.replaceState(null, '', `#${currentRoute}`);
    } else {
      const keys = entries.map(entry => {
        if (!entryKeys.has(entry)) {
          const key = `${historySession}:${++entrySequence}`;
          entryKeys.set(entry, key);
          savedEntries.set(key, entry);
        }
        return entryKeys.get(entry);
      });
      const project = [...entries].reverse().find(entry => entry.slug);
      history.pushState({ portfolio: true, route: currentRoute, project: project?.slug || null, entries: keys }, '',
        project ? projectHash(project, currentRoute) : `#${currentRoute}`);
    }
    updateTitle();
  }
});
let currentRoute = 'home';
let navigationVersion = 0;
let locationVersion = 0;
let requestedRoute = 'home';

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function updateTitle() {
  const entry = detailDialog.entries().at(-1);
  const page = currentRoute === 'home' ? 'Mechanical Engineering Portfolio'
    : currentRoute[0].toUpperCase() + currentRoute.slice(1);
  document.title = `${entry?.title || page} — William Huang`;
}

async function applyLocation(animate = true) {
  if (location.hash === '#main') return;
  const version = ++locationVersion;
  const target = readLocation(location.hash, portfolio.projects);
  const state = history.state;
  const knownState = state?.portfolio && state.route === target.route
    && (state.project || null) === (target.project?.slug || null)
    && Array.isArray(state.entries) && state.entries.every(key => savedEntries.has(key));
  const entries = knownState ? state.entries.map(key => savedEntries.get(key)) : [];
  if (target.route !== currentRoute || target.route !== requestedRoute || !animate) await navigate(target.route, animate);
  if (version !== locationVersion) return;
  if (knownState) {
    detailDialog.sync(entries);
  } else {
    detailDialog.sync([]);
    // A directly loaded project gets a base-page entry so X, Escape and the
    // backdrop close to this portfolio even when there is no previous visit.
    history.replaceState({ portfolio: true, route: target.route, project: null, entries: [] }, '', `#${target.route}`);
    if (target.project) detailDialog.open(target.project);
  }
  updateTitle();
}

async function navigate(route, animate = true) {
  requestedRoute = route;
  detailDialog.close();
  const version = ++navigationVersion;
  const direction = routes.indexOf(route) >= routes.indexOf(currentRoute) ? 1 : -1;
  navigationSurfaces.forEach(surface => surface.getAnimations().forEach(animation => animation.cancel()));
  document.querySelectorAll('[data-route]').forEach(link => {
    if (link.dataset.route === route) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (animate && !reducedMotion.matches) {
    await Promise.all(navigationSurfaces.map(surface => surface.animate(
      [{ opacity: 1, transform: 'translateX(0)' }, { opacity: 0, transform: `translateX(${-direction * 16}px)` }],
      { duration: 85, easing: 'ease-in' }
    ).finished.catch(() => {})));
  }
  if (version !== navigationVersion) return;
  document.querySelectorAll('.page').forEach(page => { page.hidden = page.id !== `page-${route}`; });
  backdropDrawing.style.setProperty('--backdrop-page', routes.indexOf(route));
  currentRoute = route;
  updateTitle();
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (animate) document.querySelector(`#page-${route} h1`).focus({ preventScroll: true });
  if (animate && !reducedMotion.matches) {
    navigationSurfaces.forEach(surface => surface.animate(
      [{ opacity: 0, transform: `translateX(${direction * 25}px)` }, { opacity: 1, transform: 'translateX(0)' }],
      { duration: 220, easing: 'cubic-bezier(.22,1,.36,1)' }
    ));
  }
}

addEventListener('hashchange', () => applyLocation());
addEventListener('popstate', () => applyLocation());
document.querySelectorAll('[data-route]').forEach(link => link.addEventListener('click', () => {
  // Re-selecting a page cancels an in-flight route change too.
  if (location.hash === link.hash) applyLocation();
}));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#summary-content').replaceChildren(
  ...portfolio.summary.split(/\n\s*\n/).map(paragraph => element('p', 'body-copy', paragraph))
);

const timeline = document.querySelector('#timeline');
const experiencesByStartDate = [...portfolio.experience].sort((a, b) =>
  (b.startDate || '').localeCompare(a.startDate || '')
);
experiencesByStartDate.forEach((item, index) => {
  const entry = element('li', 'experience-item');
  const card = element('button', 'experience-card');
  card.type = 'button';
  card.setAttribute('aria-haspopup', 'dialog');
  card.setAttribute('aria-controls', 'project-dialog');
  card.setAttribute('aria-label', `${item.role} — ${item.organization} — ${item.dates}`);

  const logo = element('span', 'experience-logo');
  if (item.logo) {
    const image = element('img');
    image.src = item.logo;
    image.alt = `${item.organization} logo`;
    image.width = 160;
    image.height = 160;
    image.decoding = 'async';
    logo.style.setProperty('--logo-scale', item.logoScale || 1);
    logo.append(image);
  } else {
    logo.append(element('span', 'experience-initial', item.organization.slice(0, 1)));
  }

  const copy = element('span', 'experience-copy');
  copy.append(
    element('span', 'experience-date', item.dates),
    element('span', 'experience-role', item.role),
    element('span', 'experience-organization', item.organization)
  );
  if (item.description) {
    const summary = element('span', 'experience-description', item.description);
    summary.id = `experience-summary-${index}`;
    card.setAttribute('aria-describedby', summary.id);
    copy.append(summary);
  }
  const action = element('span', 'experience-action', '↗');
  action.setAttribute('aria-hidden', 'true');
  card.append(logo, copy, action);
  card.addEventListener('click', () => detailDialog.open({
    title: item.role,
    purpose: item.organization,
    dates: item.dates,
    logo: item.logo,
    logoScale: item.logoScale,
    content: [
      { type: 'heading', text: 'My role' },
      ...(item.content || [])
    ]
  }, card));
  entry.append(card);
  timeline.append(entry);
});

function createProjectCard(project) {
  const card = element('a', 'project-card');
  card.href = projectHash(project);
  card.dataset.projectId = project.id;
  card.dataset.category = project.category;
  card.setAttribute('aria-haspopup', 'dialog');
  card.setAttribute('aria-controls', 'project-dialog');
  card.setAttribute('aria-label', `${project.title} — ${project.purpose} — ${project.category}${project.placeholder ? ' — Layout placeholder' : ''}`);
  const media = element('span', 'project-card-media');
  const picture = element('img');
  picture.src = project.image;
  picture.alt = project.placeholder ? 'Illustrative mechanical engineering drawing' : project.title;
  picture.width = 600;
  picture.height = 600;
  picture.loading = 'lazy';
  media.append(picture);
  const copy = element('span', 'project-card-copy');
  copy.append(element('span', 'project-card-purpose', project.category),
    element('span', 'project-card-title', project.title),
    element('span', 'project-card-description', project.description),
    element('span', 'project-card-action', 'Explore →'));
  card.append(media, copy);
  card.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    detailDialog.open(project, card);
  });
  return card;
}

const grid = document.querySelector('#project-grid');
const cards = portfolio.projects.map(project => {
  const card = createProjectCard(project);
  grid.append(card);
  return card;
});

document.querySelector('#featured-project-grid').replaceChildren(
  ...portfolio.featuredProjects.map(id => portfolio.projects.find(project => project.id === id))
    .filter(Boolean).map(createProjectCard)
);

function updateEmptyState() {
  document.querySelector('#empty-projects').hidden = cards.some(card => !card.hidden);
}
updateEmptyState();
let activeFilter = 'All';
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  if (category === activeFilter) return;
  activeFilter = category;
  const before = new Map();
  cards.forEach(card => {
    card.getAnimations().forEach(animation => animation.cancel());
    if (!card.hidden) before.set(card, card.getBoundingClientRect());
  });
  document.querySelectorAll('[data-filter]').forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  cards.forEach(card => { card.hidden = category !== 'All' && card.dataset.category !== category; });
  if (!reducedMotion.matches) cards.filter(card => !card.hidden).forEach(card => {
    const old = before.get(card);
    const next = card.getBoundingClientRect();
    card.animate([
      { opacity: old ? 1 : 0, transform: old ? `translate(${old.left - next.left}px, ${old.top - next.top}px)` : 'translateY(12px) scale(.975)' },
      { opacity: 1, transform: 'translate(0, 0) scale(1)' }
    ], { duration: 210, easing: 'cubic-bezier(.22,1,.36,1)' });
  });
  updateEmptyState();
}));

if (portfolio.resume) {
  const download = element('a', 'button secondary-button', 'Download resume ↓');
  download.href = portfolio.resume;
  download.download = 'William-Huang-Resume.pdf';
  document.querySelector('#resume-download-container').replaceChildren(download);
  createResumePreview(document.querySelector('#resume-viewer'), portfolio.resume);
}

const copyEmail = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#contact-copy-status');
copyEmail.addEventListener('click', async () => {
  copyStatus.textContent = '';
  try {
    await navigator.clipboard.writeText(copyEmail.dataset.email);
    copyStatus.textContent = 'Email address copied!';
  } catch {
    copyStatus.textContent = 'Could not copy. Select the email address to copy it manually.';
  }
});

applyLocation(false);
