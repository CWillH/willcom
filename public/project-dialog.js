import { createDocumentReader } from './document-reader.js';

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function renderImage(block, context) {
  const figure = element('figure', 'project-detail-image');
  const size = ['wide', 'medium', 'small'].includes(block.size) ? block.size : 'wide';
  const align = ['left', 'center', 'right'].includes(block.align) ? block.align : 'center';
  figure.classList.add(`image-${size}`, `image-${align}`);
  if (block.tall) figure.classList.add('image-tall');

  const image = element('img');
  image.src = block.src;
  image.alt = block.alt || '';
  if (block.width && block.height) {
    image.width = block.width;
    image.height = block.height;
  }
  image.loading = 'lazy';
  image.decoding = 'async';
  if (block.zoomable !== false) {
    const enlarge = element('button', 'project-image-button');
    enlarge.type = 'button';
    enlarge.setAttribute('aria-label', `Enlarge image: ${block.alt || context.title}`);
    enlarge.setAttribute('aria-haspopup', 'dialog');
    enlarge.append(image);
    enlarge.addEventListener('click', () => context.openProject({
      title: 'Image detail', purpose: context.title,
      content: [{ ...block, size: 'wide', zoomable: false }]
    }, enlarge));
    figure.append(enlarge);
  } else figure.append(image);
  if (block.caption) figure.append(element('figcaption', '', block.caption));
  return figure;
}

function renderBlock(block, context) {
  if (!block || typeof block !== 'object') return null;
  switch (block.type) {
    case 'lead':
      return element('p', 'project-detail-lead', block.text);
    case 'heading':
      return element('h3', 'project-detail-heading', block.text);
    case 'text':
      return element('p', 'project-detail-text', block.text);
    case 'image':
      return block.src ? renderImage(block, context) : null;
    case 'video': {
      if (!block.src) return null;
      const figure = element('figure', 'project-detail-image project-detail-video');
      const size = ['wide', 'medium', 'small'].includes(block.size) ? block.size : 'wide';
      const align = ['left', 'center', 'right'].includes(block.align) ? block.align : 'center';
      figure.classList.add(`image-${size}`, `image-${align}`);
      const video = element('video');
      video.src = block.src;
      video.controls = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', block.label || 'Project demonstration video');
      if (block.poster) video.poster = block.poster;
      const fallback = element('a', 'text-link', 'Download the video');
      fallback.href = block.src;
      fallback.download = '';
      video.append(fallback);
      figure.append(video);
      if (block.caption) figure.append(element('figcaption', '', block.caption));
      return figure;
    }
    case 'gallery': {
      const gallery = element('div', 'project-detail-gallery');
      if (block.layout === 'showcase') gallery.classList.add('project-media-showcase');
      if (block.layout === 'drawings') gallery.classList.add('project-drawing-gallery');
      for (const media of block.media || (block.images || []).map(image => ({ ...image, type: 'image' }))) {
        if (!['image', 'video'].includes(media?.type)) continue;
        const rendered = renderBlock(media, context);
        if (rendered) gallery.append(rendered);
      }
      return gallery;
    }
    case 'tags': {
      const tags = element('ul', 'project-detail-tags');
      tags.setAttribute('aria-label', 'Tools and methods');
      for (const item of block.items || []) tags.append(element('li', '', item));
      return tags;
    }
    case 'feature': {
      const feature = element('section', 'project-detail-feature');
      const media = renderBlock(block.media, context);
      const copy = element('div', 'project-feature-copy');
      if (block.heading) copy.append(element('h3', 'project-detail-heading', block.heading));
      for (const item of block.content || []) {
        const rendered = renderBlock(item, context);
        if (rendered) copy.append(rendered);
      }
      if (media) feature.append(media);
      feature.append(copy);
      return feature;
    }
    case 'callout': {
      const callout = element('aside', 'project-detail-callout');
      if (block.label) callout.append(element('h3', 'project-callout-label', block.label));
      callout.append(element('p', 'project-detail-text', block.text));
      return callout;
    }
    case 'project-links': {
      const links = element('div', 'related-projects');
      for (const item of block.items || []) {
        const project = context.projects.find(project => project.id === item.projectId);
        if (!project) continue;
        const card = element('button', 'related-project');
        card.type = 'button';
        card.dataset.projectId = project.id;
        card.setAttribute('aria-label', `Learn more about ${project.title} — ${item.label}`);
        const image = element('img', 'related-project-image');
        image.src = project.image;
        image.alt = '';
        image.loading = 'lazy';
        image.decoding = 'async';
        const copy = element('span', 'related-project-copy');
        copy.append(
          element('span', 'related-project-year', item.label),
          element('span', 'related-project-title', project.title),
          element('span', 'related-project-description', item.description),
          element('span', 'related-project-action', 'View project →')
        );
        card.append(image, copy);
        card.addEventListener('click', () => context.openProject(project, card));
        links.append(card);
      }
      return links;
    }
    case 'links': {
      const links = element('div', 'project-detail-links');
      for (const item of block.items || []) {
        // Readers accept local assets or HTTPS sources, never executable URLs.
        let url;
        try { url = new URL(item.newTab ? item.href : item.reader || item.href, location.href); } catch { continue; }
        if (url.origin !== location.origin && url.protocol !== 'https:') continue;
        if (item.newTab) {
          const link = element('a', 'project-detail-link', item.label);
          link.href = url.href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.setAttribute('aria-label', `${item.label} (opens in a new tab)`);
          if (item.featured) {
            link.classList.add('project-featured-link');
            const copy = element('span', 'project-link-copy');
            copy.append(element('span', 'project-link-title', item.label));
            if (item.description) copy.append(element('span', 'project-link-description', item.description));
            link.replaceChildren(copy);
          }
          const arrow = element('span', '', '↗');
          arrow.setAttribute('aria-hidden', 'true');
          link.append(arrow);
          links.append(link);
          continue;
        }
        const link = element('button', 'project-detail-link', item.label);
        link.type = 'button';
        link.setAttribute('aria-haspopup', 'dialog');
        link.addEventListener('click', () => context.openProject({
          title: item.label, purpose: context.title, reader: url.href
        }, link));
        const arrow = element('span', '', '→');
        arrow.setAttribute('aria-hidden', 'true');
        link.append(arrow);
        links.append(link);
      }
      return links;
    }
    case 'list': {
      const list = element('ul', 'project-detail-list');
      for (const item of block.items || []) list.append(element('li', '', item));
      return list;
    }
    default:
      return null;
  }
}

export function createDetailDialog(dialog, projects = [], { onChange = () => {} } = {}) {
  const title = dialog.querySelector('#project-dialog-title');
  const purpose = dialog.querySelector('#project-dialog-purpose');
  const dates = dialog.querySelector('#detail-dialog-dates');
  const logo = dialog.querySelector('#detail-dialog-logo');
  const content = dialog.querySelector('#project-detail-content');
  const history = [];
  let trigger = null;
  let currentEntry = null;
  let cleanup = null;
  let pointerStartedOutside = false;

  function entries() {
    return dialog.open ? [...history.map(frame => frame.entry), currentEntry] : [];
  }

  function close({ notify = false, kind = 'dismiss' } = {}) {
    if (!dialog.open) return;
    const depth = entries().length;
    dialog.close();
    clear();
    if (notify) onChange({ entries: [], kind, depth });
  }

  function open(project, opener, { notify = true } = {}) {
    if (dialog.open) {
      history.push({ entry: currentEntry, nodes: [...content.childNodes], cleanup,
        scrollTop: dialog.scrollTop, focus: opener || document.activeElement });
      cleanup = null;
      show(project);
      if (notify) onChange({ entries: entries(), kind: 'open' });
      return;
    }
    trigger = opener;
    history.length = 0;
    show(project);
    if (notify) onChange({ entries: entries(), kind: 'open' });
  }

  function show(project, previous) {
    content.querySelectorAll('video').forEach(video => video.pause());
    currentEntry = project;
    title.textContent = project.title;
    purpose.textContent = project.purpose || '';
    purpose.hidden = !project.purpose;
    dates.textContent = project.dates || '';
    dates.hidden = !project.dates;
    logo.hidden = !project.logo;
    logo.replaceChildren();
    if (project.logo) {
      const image = element('img');
      image.src = project.logo;
      image.alt = `${project.purpose} logo`;
      image.width = 90;
      image.height = 90;
      logo.style.setProperty('--logo-scale', project.logoScale || 1);
      logo.append(image);
    }

    // Content blocks appear in exactly the order written in content.js
    const blocks = Array.isArray(project.content) && project.content.length
      ? [...project.content]
      : [
          { type: 'image', src: project.image, alt: project.title },
          { type: 'text', text: 'Project details coming soon' }
        ];
    const context = {
      projects,
      title: project.title,
      openProject: open
    };
    if (previous) {
      content.replaceChildren(...previous.nodes);
      cleanup = previous.cleanup;
    } else if (project.reader) {
      const reader = element('div', 'document-reader');
      content.replaceChildren(reader);
      cleanup = createDocumentReader(reader, project.reader, project.title);
    } else {
      content.replaceChildren(...blocks.map(block => renderBlock(block, context)).filter(Boolean));
    }
    pointerStartedOutside = false;
    document.documentElement.classList.add('project-open');
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = previous?.scrollTop || 0;
    (previous?.focus?.isConnected ? previous.focus : title).focus({ preventScroll: true });
  }

  function dismiss({ notify = true } = {}) {
    const previous = history.pop();
    if (!previous) { close({ notify }); return; }
    cleanup?.();
    cleanup = null;
    show(previous.entry, previous);
    if (notify) onChange({ entries: entries(), kind: 'dismiss' });
  }

  // Restore existing parent DOM and scroll positions on Back. Forward can
  // rebuild the child from its entry without adding another history record.
  function sync(nextEntries) {
    const active = entries();
    let shared = 0;
    while (shared < active.length && shared < nextEntries.length
      && active[shared] === nextEntries[shared]) shared++;
    while (entries().length > shared) dismiss({ notify: false });
    for (const entry of nextEntries.slice(shared)) open(entry, null, { notify: false });
  }

  dialog.querySelector('#close-project').addEventListener('click', () => close({ notify: true, kind: 'close-all' }));
  dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
  // Native dialog supplies modal focus containment and an inert background.
  function clear() {
    content.querySelectorAll('video').forEach(video => video.pause());
    document.documentElement.classList.remove('project-open');
    if (trigger?.isConnected && !trigger.closest('[hidden]')) trigger.focus({ preventScroll: true });
    trigger = null;
    currentEntry = null;
    cleanup?.();
    cleanup = null;
    history.forEach(frame => frame.cleanup?.());
    history.length = 0;
    content.replaceChildren();
  }
  dialog.addEventListener('close', () => {
    // A queued close event may arrive after a new dialog has been opened.
    if (!dialog.open && currentEntry) { clear(); onChange({ entries: [], kind: 'dismiss' }); }
  });

  function outside(event) {
    if (event.target !== dialog) return false;
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom;
  }
  dialog.addEventListener('pointerdown', event => { pointerStartedOutside = outside(event); });
  dialog.addEventListener('click', event => {
    if (pointerStartedOutside && outside(event)) dismiss();
    pointerStartedOutside = false;
  });

  return { open, close, sync, entries };
}
