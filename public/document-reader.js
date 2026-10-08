// A single-page PDF reader keeps long binders responsive on phones.
export function createDocumentReader(container, url, title) {
  const node = (tag, className, text) => {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (text !== undefined) item.textContent = text;
    return item;
  };
  const toolbar = node('div', 'reader-toolbar');
  toolbar.setAttribute('role', 'group');
  toolbar.setAttribute('aria-label', 'Document controls');
  const previous = node('button', 'reader-button', '←');
  previous.type = 'button';
  previous.setAttribute('aria-label', 'Previous page');
  const next = node('button', 'reader-button', '→');
  next.type = 'button';
  next.setAttribute('aria-label', 'Next page');
  const label = node('label', 'reader-page-label', 'Page ');
  const input = node('input', 'reader-page-input');
  input.type = 'number';
  input.min = '1';
  input.value = '1';
  input.setAttribute('aria-label', 'Page number');
  const count = node('span', '', ' of …');
  label.append(input, count);
  const zoom = node('select', 'reader-zoom');
  zoom.setAttribute('aria-label', 'Document zoom');
  for (const [value, text] of [[1, 'Fit width'], [1.25, '125%'], [1.5, '150%'], [2, '200%']]) {
    const option = node('option', '', text);
    option.value = value;
    zoom.append(option);
  }
  toolbar.append(previous, label, next, zoom);
  const status = node('p', 'reader-status', 'Loading document…');
  status.setAttribute('role', 'status');
  const viewport = node('div', 'reader-viewport');
  viewport.tabIndex = 0;
  viewport.setAttribute('role', 'region');
  viewport.setAttribute('aria-label', `${title} page`);
  const retry = node('button', 'button secondary-button', 'Try again');
  retry.type = 'button';
  retry.hidden = true;
  container.append(toolbar, status, retry, viewport);

  let pdfjs, loadingTask, pdf, disposed = false, pageNumber = 1;
  let rendering = false, revision = 0, timer, observedWidth = 0;
  const controls = [previous, next, input, zoom];
  function updateControls() {
    controls.forEach(control => { control.disabled = !pdf; });
    previous.disabled = !pdf || pageNumber <= 1;
    next.disabled = !pdf || pageNumber >= pdf.numPages;
    input.value = pageNumber;
  }
  updateControls();

  async function render() {
    if (disposed || !pdf || !viewport.clientWidth || rendering) return;
    const version = revision;
    const number = pageNumber;
    rendering = true;
    viewport.setAttribute('aria-busy', 'true');
    status.textContent = `Loading page ${number}…`;
    retry.hidden = true;
    try {
      const page = await pdf.getPage(number);
      if (disposed) return;
      const width = Math.floor(viewport.clientWidth) * Number(zoom.value);
      const scale = width / page.getViewport({ scale: 1 }).width;
      const view = page.getViewport({ scale });
      const ratio = Math.min(devicePixelRatio || 1, 2);
      const sheet = node('div', 'pdf-sheet');
      sheet.style.width = `${width}px`;
      sheet.style.setProperty('--total-scale-factor', scale);
      sheet.setAttribute('role', 'group');
      sheet.setAttribute('aria-label', `${title}, page ${number} of ${pdf.numPages}`);
      const canvas = node('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      canvas.width = Math.ceil(view.width * ratio);
      canvas.height = Math.ceil(view.height * ratio);
      const text = node('div', 'pdf-text-layer');
      sheet.append(canvas, text);
      await page.render({ canvasContext: canvas.getContext('2d'), viewport: view,
        transform: [ratio, 0, 0, ratio, 0, 0] }).promise;
      if (disposed || version !== revision) return;
      await new pdfjs.TextLayer({ textContentSource: await page.getTextContent(),
        container: text, viewport: view }).render();
      if (disposed || version !== revision) return;
      viewport.replaceChildren(sheet);
      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
      status.textContent = `Page ${number} of ${pdf.numPages}`;
    } catch (error) {
      if (!disposed && version === revision) {
        viewport.replaceChildren();
        status.textContent = 'This page could not load. Please try again.';
        retry.hidden = false;
      }
    } finally {
      rendering = false;
      viewport.removeAttribute('aria-busy');
      if (!disposed && version !== revision) render();
    }
  }
  function requestRender() { revision++; render(); }
  function goTo(number) {
    if (!pdf) return;
    pageNumber = Math.max(1, Math.min(pdf.numPages, Math.trunc(number) || 1));
    updateControls();
    requestRender();
  }
  previous.addEventListener('click', () => goTo(pageNumber - 1));
  next.addEventListener('click', () => goTo(pageNumber + 1));
  input.addEventListener('change', () => goTo(Number(input.value)));
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') { event.preventDefault(); goTo(Number(input.value)); }
  });
  zoom.addEventListener('change', requestRender);

  async function load() {
    retry.hidden = true;
    status.textContent = 'Loading document…';
    try {
      pdfjs = await import('./vendor/pdfjs/pdf.min.js');
      if (disposed) return;
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.js', import.meta.url).href;
      loadingTask = pdfjs.getDocument({ url, isEvalSupported: false });
      pdf = await loadingTask.promise;
      if (disposed) return;
      count.textContent = ` of ${pdf.numPages}`;
      input.max = pdf.numPages;
      updateControls();
      requestRender();
    } catch (error) {
      if (disposed) return;
      status.textContent = 'The document could not load. Please try again.';
      retry.hidden = false;
    }
  }
  retry.addEventListener('click', () => { if (pdf) requestRender(); else load(); });
  const observer = new ResizeObserver(() => {
    const width = Math.floor(viewport.clientWidth);
    if (!width || width === observedWidth) return;
    observedWidth = width;
    clearTimeout(timer);
    timer = setTimeout(requestRender, 100);
  });
  observer.observe(viewport);
  load();
  return () => {
    disposed = true;
    clearTimeout(timer);
    observer.disconnect();
    loadingTask?.destroy().catch(() => {});
  };
}
