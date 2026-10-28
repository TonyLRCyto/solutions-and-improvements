/**
 * Projects gallery: category filters and an accessible lightbox (native <dialog>).
 * Without JavaScript every photo and caption is still visible in the page.
 */
const root = document.querySelector<HTMLElement>('[data-gallery]');
const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');

if (root && dialog) {
  const items = [...root.querySelectorAll<HTMLLIElement>('.gallery > li')];
  const filters = root.querySelector<HTMLElement>('[data-filters]')!;
  const status = root.querySelector<HTMLElement>('[data-gallery-status]')!;
  const media = dialog.querySelector<HTMLElement>('[data-lb-media]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lb-caption]')!;
  const count = dialog.querySelector<HTMLElement>('[data-lb-count]')!;
  let current = 0;
  let opener: HTMLElement | null = null;

  /* Filters */
  filters.hidden = false;
  const applyFilter = (cat: string, announce = true) => {
    filters.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    let shown = 0;
    items.forEach((li) => {
      const show = cat === 'all' || li.dataset.cat === cat;
      li.hidden = !show;
      if (show) shown++;
    });
    if (announce) status.textContent = `Showing ${shown} photo${shown === 1 ? '' : 's'}.`;
  };
  filters.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('[data-filter]');
    if (b) applyFilter(b.dataset.filter!);
  });
  const fromHash = location.hash.slice(1);
  if (fromHash && filters.querySelector(`[data-filter="${CSS.escape(fromHash)}"]`)) applyFilter(fromHash, false);

  /* Lightbox */
  const visible = () => items.filter((li) => !li.hidden);
  const show = (li: HTMLLIElement) => {
    const list = visible();
    current = Math.max(0, list.indexOf(li));
    const tpl = li.querySelector<HTMLTemplateElement>('template')!;
    media.replaceChildren(tpl.content.cloneNode(true));
    media.querySelectorAll('img').forEach((img) => img.setAttribute('loading', 'eager'));
    caption.textContent = li.dataset.caption ?? '';
    count.textContent = `${current + 1} of ${list.length}`;
  };
  const step = (d: number) => {
    const list = visible();
    if (!list.length) return;
    show(list[(current + d + list.length) % list.length]);
  };

  root.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('[data-open]');
    if (!b) return;
    opener = b;
    show(b.closest('li')!);
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('[data-lb-close]')!.focus();
  });
  dialog.querySelector('[data-lb-prev]')!.addEventListener('click', () => step(-1));
  dialog.querySelector('[data-lb-next]')!.addEventListener('click', () => step(1));
  dialog.querySelector('[data-lb-close]')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });
  // Click on the backdrop closes.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    media.replaceChildren();
    opener?.focus();
  });

  /* Swipe on touch screens */
  let x0: number | null = null;
  dialog.addEventListener('touchstart', (e) => (x0 = e.touches[0].clientX), { passive: true });
  dialog.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    x0 = null;
  });
}
