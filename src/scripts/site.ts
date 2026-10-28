/**
 * Small progressive enhancements. Every page works without this file.
 */

/* ---------- Analytics hook (disabled until a provider is chosen) ----------
 * Events carry a name and a non-personal label only. Never pass form values, names, addresses or messages.
 * To enable, define window.siTrack = (name, detail) => { ... } in a provider snippet.
 */
type TrackFn = (name: string, detail?: Record<string, string>) => void;
declare global {
  interface Window {
    siTrack?: TrackFn;
  }
}
export const track: TrackFn = (name, detail) => {
  try {
    window.siTrack?.(name, detail);
  } catch {
    /* analytics must never break the page */
  }
};

document.addEventListener('click', (e) => {
  const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
  if (el) track(el.dataset.track!, { path: location.pathname });
});

/* ---------- Mobile menu ---------- */
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const menu = document.getElementById('mobile-menu');
if (toggle && menu) {
  toggle.hidden = false;
  const setOpen = (open: boolean, returnFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) menu.querySelector<HTMLElement>('a')?.focus();
    else if (returnFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setOpen(false, true);
  });
  // Keep keyboard focus inside the open menu (header toggle + menu).
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [toggle, ...menu.querySelectorAll<HTMLElement>('a, button')];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === menu.querySelector('a')) {
      e.preventDefault();
      first.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
  matchMedia('(min-width: 60.01em)').addEventListener('change', (m) => m.matches && setOpen(false));
}

/* ---------- Camera Settle (home opening photo) ----------
 * The complete photo is visible from the first paint. When the image is ready, the plane eases from
 * scale 1.026 / 8px lower to rest over ~0.7s with uniform transforms only, then stops.
 */
const root = document.documentElement;
const plane = document.querySelector<HTMLElement>('[data-settle]');
if (plane && root.classList.contains('settle-pending')) {
  const img = plane.querySelector('img');
  const start = () => {
    if (!root.classList.contains('settle-pending')) return; // safety timeout already restored it
    const from = getComputedStyle(plane).transform;
    root.classList.remove('settle-pending');
    try {
      sessionStorage.setItem('si-settled', '1');
    } catch {
      /* private mode */
    }
    if (!plane.animate || from === 'none') return;
    plane.animate([{ transform: from }, { transform: 'none' }], {
      duration: 700,
      easing: 'cubic-bezier(0.22, 0.61, 0.2, 1)',
    });
  };
  if (!img || img.complete) requestAnimationFrame(start);
  else {
    img.addEventListener('load', () => (img.decode ? img.decode().catch(() => {}).then(start) : start()), { once: true });
    img.addEventListener('error', () => root.classList.remove('settle-pending'), { once: true });
  }
}

/* ---------- Editorial service list: swap preview on hover / focus ---------- */
document.querySelectorAll<HTMLElement>('[data-svc-feature]').forEach((wrap) => {
  const links = wrap.querySelectorAll<HTMLAnchorElement>('[data-svc]');
  const slides = wrap.querySelectorAll<HTMLElement>('[data-slide]');
  const caption = wrap.querySelector<HTMLElement>('[data-svc-caption]');
  const activate = (key: string) => {
    links.forEach((l) => l.classList.toggle('is-active', l.dataset.svc === key));
    slides.forEach((s) => s.classList.toggle('is-active', s.dataset.slide === key));
    const active = wrap.querySelector<HTMLElement>(`[data-slide="${key}"]`);
    if (caption && active?.dataset.caption) caption.textContent = active.dataset.caption;
  };
  // Inactive preview images are only fetched once someone interacts with the list (never on touch-only scrolling).
  let hydrated = false;
  const hydrate = () => {
    if (hydrated) return;
    hydrated = true;
    wrap.querySelectorAll<HTMLTemplateElement>('template[data-deferred]').forEach((t) => t.replaceWith(t.content.cloneNode(true)));
  };
  wrap.addEventListener('pointerenter', hydrate, { once: true });
  wrap.addEventListener('focusin', hydrate, { once: true });
  links.forEach((l) => {
    l.addEventListener('mouseenter', () => activate(l.dataset.svc!));
    l.addEventListener('focus', () => activate(l.dataset.svc!));
  });
});
