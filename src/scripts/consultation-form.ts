/**
 * Consultation form enhancement: inline validation, one submission at a time, honest status.
 * The server re-validates everything; this is only for faster feedback.
 */
import { validate, type FieldErrors } from '../lib/consultation';
import { track } from './site';

type Status = 'accepted' | 'mock' | 'invalid' | 'unavailable' | 'rate_limited' | 'rejected' | 'challenge_failed' | 'error';
interface ApiResponse {
  status: Status;
  message?: string;
  errors?: FieldErrors;
  alt?: { phone: string; phoneHref: string; email: string };
}

const uuid = () =>
  (crypto as Crypto & { randomUUID?: () => string }).randomUUID?.() ??
  `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;

declare global {
  interface Window {
    turnstile?: { reset(el?: Element): void };
  }
}

document.querySelectorAll<HTMLFormElement>('[data-consult-form]').forEach((form) => {
  const summary = form.querySelector<HTMLElement>('[data-summary]')!;
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const label = submit.querySelector<HTMLElement>('[data-label]')!;
  const defaultLabel = label.textContent;
  const started = form.querySelector<HTMLInputElement>('[data-started]')!;
  const idem = form.querySelector<HTMLInputElement>('[data-idem]')!;
  started.value = String(Date.now());
  idem.value = uuid();
  let busy = false;
  let startedTracked = false;

  // Preselect from ?service= (service pages link here with context). Only known values are accepted.
  const params = new URLSearchParams(location.search);
  const svc = params.get('service');
  const select = form.querySelector<HTMLSelectElement>('select[name="service"]');
  if (svc && select && [...select.options].some((o) => o.value === svc) && !form.dataset.preselect) select.value = svc;
  const topics = form.dataset.topics ? (JSON.parse(form.dataset.topics) as Record<string, string>) : {};
  const topic = params.get('topic');
  const topicInput = form.querySelector<HTMLInputElement>('input[name="topic"]');
  const topicNote = form.querySelector<HTMLElement>('[data-topic-note]');
  if (topic && topics[topic] && topicInput && topicNote && !topicInput.value) {
    topicInput.value = topic;
    topicNote.querySelector('strong')!.textContent = topics[topic];
    topicNote.hidden = false;
  }

  form.addEventListener('input', () => {
    if (!startedTracked) {
      startedTracked = true;
      track('form_start', { path: location.pathname });
    }
  });

  const field = (name: string) => form.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(`[name="${name}"]`);

  /** Inline errors only (no layout change above the button, so a click on Submit is never lost). */
  const showInline = (errors: FieldErrors) => {
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => (el.textContent = ''));
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    for (const [key, msg] of Object.entries(errors) as [keyof FieldErrors, string][]) {
      const el = form.querySelector<HTMLElement>(`[data-error-for="${key}"]`);
      if (el) el.textContent = msg;
      (key === 'contact' ? ['email', 'phone'] : [key]).forEach((t) => field(t)?.setAttribute('aria-invalid', 'true'));
    }
  };

  const showErrors = (errors: FieldErrors, focus: boolean) => {
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => (el.textContent = ''));
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    const list = summary.querySelector('ul')!;
    list.innerHTML = '';
    const entries = Object.entries(errors) as [keyof FieldErrors, string][];
    for (const [key, msg] of entries) {
      const el = form.querySelector<HTMLElement>(`[data-error-for="${key}"]`);
      if (el) el.textContent = msg;
      const targets = key === 'contact' ? ['email', 'phone'] : [key];
      targets.forEach((t) => field(t)?.setAttribute('aria-invalid', 'true'));
      const li = document.createElement('li');
      const a = document.createElement('a');
      const target = field(targets[0]);
      a.href = `#${target?.id ?? ''}`;
      a.textContent = msg;
      a.addEventListener('click', (ev) => {
        ev.preventDefault();
        target?.focus();
      });
      li.append(a);
      list.append(li);
    }
    summary.hidden = entries.length === 0;
    if (entries.length && focus) summary.focus();
  };

  // Once a field has been flagged, clear its message as soon as the visitor fixes it (while typing, so the
  // layout never shifts between pressing and releasing the Submit button).
  form.addEventListener('input', (ev) => {
    const t = ev.target as HTMLInputElement;
    const flaggedNow = [...form.querySelectorAll<HTMLInputElement>('[aria-invalid="true"]')].map((e) => e.name);
    if (!flaggedNow.length || !flaggedNow.includes(t.name)) return;
    const { errors } = validate(Object.fromEntries(new FormData(form)));
    const flagged = new Set(flaggedNow);
    const still = Object.fromEntries(
      Object.entries(errors).filter(([k]) => flagged.has(k) || (k === 'contact' && (flagged.has('email') || flagged.has('phone')))),
    ) as FieldErrors;
    showInline(still);
  });

  const setStatus = (tone: 'ok' | 'info' | 'error', html: string) => {
    status.dataset.tone = tone;
    status.innerHTML = html;
    status.hidden = false;
    status.focus();
  };

  const altHtml = (r?: ApiResponse) => {
    const phone = r?.alt?.phone ?? '219-433-4846';
    const href = r?.alt?.phoneHref ?? 'tel:+12194334846';
    const email = r?.alt?.email ?? 'office@solutionsandimprovements.com';
    return ` Please call <a href="${href}">${phone}</a> or email <a href="mailto:${email}">${email}</a>.`;
  };

  const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (busy) return;
    status.hidden = true;
    const data = Object.fromEntries(new FormData(form));
    const { errors } = validate(data);
    if (Object.keys(errors).length) {
      showErrors(errors, true);
      return;
    }
    showErrors({}, false);

    busy = true;
    submit.setAttribute('aria-disabled', 'true');
    submit.disabled = true;
    label.textContent = 'Sending…';

    let res: ApiResponse | undefined;
    try {
      const r = await fetch(form.action, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(data),
      });
      res = (await r.json()) as ApiResponse;
    } catch {
      res = undefined;
    }

    busy = false;
    submit.disabled = false;
    submit.removeAttribute('aria-disabled');
    label.textContent = defaultLabel;

    if (!res) {
      setStatus('error', `<h3>Not sent</h3><p>We couldn’t reach the server. Your details are still in the form, so you can try again.${altHtml()}</p>`);
      return;
    }
    switch (res.status) {
      case 'accepted':
        track('consultation_accepted', { path: location.pathname });
        form.reset();
        started.value = String(Date.now());
        idem.value = uuid();
        setStatus('ok', `<h3>Request received</h3><p>${esc(res.message ?? '')}</p>`);
        break;
      case 'mock':
        setStatus('info', `<h3>Development mock</h3><p>${esc(res.message ?? '')}</p>`);
        break;
      case 'invalid':
        if (res.errors) showErrors(res.errors, true);
        else setStatus('error', `<h3>Not sent</h3><p>${esc(res.message ?? '')}</p>`);
        break;
      case 'challenge_failed':
        window.turnstile?.reset(form.querySelector('.cf-turnstile') ?? undefined);
        setStatus('error', `<h3>Not sent</h3><p>${esc(res.message ?? '')}</p>`);
        break;
      case 'unavailable':
        setStatus('info', `<h3>Not sent</h3><p>${esc(res.message ?? '')}${altHtml(res)} Your details are still in the form.</p>`);
        break;
      default:
        setStatus('error', `<h3>Not sent</h3><p>${esc(res.message ?? 'Something went wrong.')}${altHtml(res)}</p>`);
    }
  });
});
