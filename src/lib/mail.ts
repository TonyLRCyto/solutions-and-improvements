/**
 * Mail provider adapter. Only server-side code imports this file.
 *
 * Supported now: MAIL_PROVIDER="resend" (https://resend.com/docs/api-reference/emails/send-email).
 * Set MAIL_PROVIDER="none" (default) to keep the form in honest "not connected" mode.
 * Another provider can be added as a new case in sendMail without touching the page or endpoint.
 */
export interface MailEnv {
  MAIL_PROVIDER?: string;
  MAIL_API_KEY?: string;
  MAIL_FROM_VERIFIED?: string;
  CONSULTATION_TO?: string;
}

export interface MailMessage {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  idempotencyKey?: string;
}

export const mailConfigured = (e: MailEnv) =>
  e.MAIL_PROVIDER === 'resend' && !!e.MAIL_API_KEY && !!e.MAIL_FROM_VERIFIED && !!e.CONSULTATION_TO;

export async function sendMail(e: MailEnv, m: MailMessage): Promise<{ ok: boolean; code?: number | string }> {
  switch (e.MAIL_PROVIDER) {
    case 'resend': {
      const headers: Record<string, string> = {
        authorization: `Bearer ${e.MAIL_API_KEY}`,
        'content-type': 'application/json',
      };
      if (m.idempotencyKey) headers['idempotency-key'] = `consult-${m.idempotencyKey}`;
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            from: e.MAIL_FROM_VERIFIED,
            // Destination comes only from server configuration, never from the request.
            to: [e.CONSULTATION_TO],
            subject: m.subject,
            text: m.text,
            html: m.html,
            ...(m.replyTo ? { reply_to: m.replyTo } : {}),
          }),
          signal: AbortSignal.timeout(10_000),
        });
        return { ok: res.ok, code: res.status };
      } catch {
        return { ok: false, code: 'network' };
      }
    }
    default:
      return { ok: false, code: 'not_configured' };
  }
}
