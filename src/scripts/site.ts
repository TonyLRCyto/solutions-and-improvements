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

/* ---------- Compact header ----------
 * The outer sticky slot keeps its height, so changing the header never shifts page content.
 */
const updateHeader = () => document.documentElement.classList.toggle('header-compact', window.scrollY > 40);
let headerFrame = 0;
window.addEventListener('scroll', () => {
  if (headerFrame) return;
  headerFrame = requestAnimationFrame(() => {
    updateHeader();
    headerFrame = 0;
  });
}, { passive: true });
window.addEventListener('pageshow', updateHeader);
updateHeader();

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
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey && !menu.hidden) {
      e.preventDefault();
      const items = menu.querySelectorAll<HTMLElement>('a, button');
      items[items.length - 1]?.focus();
    }
  });
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
  matchMedia('(min-width: 70.01em)').addEventListener('change', (m) => m.matches && setOpen(false));
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

/* ---------- Before / after comparison ----------
 * A native range input sits over two stacked photos, so keyboard and screen readers get a real slider.
 * Without JavaScript the "after" photo shows with the "before" photo beside it as a plain link.
 */
document.querySelectorAll<HTMLElement>('[data-compare]').forEach((box) => {
  const input = box.querySelector<HTMLInputElement>('input[type="range"]');
  const stage = box.querySelector<HTMLElement>('.compare__stage');
  if (!input || !stage) return;
  box.classList.add('is-ready');
  const set = (v: string) => stage.style.setProperty('--pos', `${v}%`);
  let interacted = false;
  set(input.value);
  input.addEventListener('input', () => {
    interacted = true;
    box.classList.remove('is-hinting');
    set(input.value);
  });
  // One gentle nudge the first time it scrolls into view, so people see it moves.
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      if (interacted) return;
      box.classList.add('is-hinting');
      box.addEventListener('animationend', () => box.classList.remove('is-hinting'), { once: true });
    }, { threshold: 0.6 });
    io.observe(box);
  }
});

/* ---------- Scroll reveals and the plan-to-built drawing ----------
 * Content is visible by default. Only when JS runs and motion is allowed do below-the-fold items
 * start hidden and reveal once, as they enter the viewport.
 */
const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window;
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal], [data-draw]');
if (motionOK) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight * 0.85) {
      el.classList.add('is-in');
      return;
    }
    el.classList.add('is-waiting');
    io.observe(el);
  });
} else {
  revealables.forEach((el) => el.classList.add('is-in'));
}
