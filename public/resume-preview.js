// PDF.js 5.6.205 is served locally; its Apache license is in vendor/pdfjs.
export function createResumePreview(container, url) {
  const status = document.createElement('p');
  status.className = 'pdf-status';
  status.setAttribute('role', 'status');
  status.textContent = 'Loading resume…';
  const pages = document.createElement('div');
  pages.className = 'pdf-pages';
  container.replaceChildren(status, pages);

  let documentPromise;
  let pdfjs;
  let renderedWidth = 0;
  let rendering = false;
  let resizeTimer;

  async function renderImages(width) {
    const response = await fetch(new URL('./resume-preview.json', import.meta.url), { cache: 'no-store' });
    if (!response.ok) throw new Error('Resume images are unavailable');
    const preview = await response.json();
    if (preview.source !== url || !preview.pages.length) throw new Error('Resume preview does not match the PDF');
    const nextPages = document.createDocumentFragment();
    for (const [index, page] of preview.pages.entries()) {
      const sheet = document.createElement('div');
      sheet.className = 'pdf-sheet';
      const image = document.createElement('img');
      image.alt = `Resume page ${index + 1} of ${preview.pages.length}`;
      image.width = page.width;
      image.height = page.height;
      image.decoding = 'async';
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = () => reject(new Error('Resume image could not load'));
        image.src = page.src;
      });
      sheet.append(image);
      nextPages.append(sheet);
    }
    pages.replaceChildren(nextPages);
    renderedWidth = width;
    status.hidden = true;
  }

  async function render() {
    const width = Math.floor(container.clientWidth);
    if (!width || width === renderedWidth || rendering) return;
    rendering = true;
    container.setAttribute('aria-busy', 'true');
    try {
      if (matchMedia('(max-width: 700px)').matches) {
        await renderImages(width);
        return;
      }
      if (!documentPromise) {
        documentPromise = import('./vendor/pdfjs/pdf.min.js').then(library => {
          pdfjs = library;
          pdfjs.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdfjs/pdf.worker.min.js', import.meta.url).href;
          return pdfjs.getDocument({ url, isEvalSupported: false }).promise;
        });
      }
      const pdf = await documentPromise;
      const nextPages = document.createDocumentFragment();
      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const scale = width / page.getViewport({ scale: 1 }).width;
        const viewport = page.getViewport({ scale });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const sheet = document.createElement('div');
        sheet.className = 'pdf-sheet';
        sheet.setAttribute('role', 'group');
        sheet.setAttribute('aria-label', `Resume page ${pageNumber} of ${pdf.numPages}`);
        sheet.style.setProperty('--total-scale-factor', scale);
        const canvas = document.createElement('canvas');
        canvas.setAttribute('aria-hidden', 'true');
        canvas.width = Math.ceil(viewport.width * pixelRatio);
        canvas.height = Math.ceil(viewport.height * pixelRatio);
        const text = document.createElement('div');
        text.className = 'pdf-text-layer';
        sheet.append(canvas, text);
        await page.render({
          canvasContext: canvas.getContext('2d'),
          viewport,
          transform: [pixelRatio, 0, 0, pixelRatio, 0, 0]
        }).promise;
        const textLayer = new pdfjs.TextLayer({
          textContentSource: await page.getTextContent(), container: text, viewport
        });
        await textLayer.render();
        nextPages.append(sheet);
      }
      pages.replaceChildren(nextPages);
      renderedWidth = width;
      status.hidden = true;
    } catch (error) {
      console.error('Resume preview could not load:', error);
      documentPromise = undefined;
      try {
        await renderImages(width);
      } catch {
        status.textContent = 'The preview could not load. You can still download the resume above.';
        status.hidden = false;
      }
    } finally {
      container.removeAttribute('aria-busy');
      rendering = false;
      if (container.clientWidth && Math.floor(container.clientWidth) !== width) render();
    }
  }

  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 100);
  }).observe(container);
  render();
}
