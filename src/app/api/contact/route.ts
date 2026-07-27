import { NextResponse } from 'next/server';
import { services, site } from '@/content/site';

export const runtime = 'nodejs';

/* ── Rate limiting ─────────────────────────────────────────────────────────
   In-memory and therefore per instance — enough to stop a single script from
   hammering the endpoint, not a substitute for a shared store.            */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);

  if (recent.length >= MAX_REQUESTS) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(key);
    }
  }

  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0];
    if (first && first.trim().length > 0) return first.trim();
  }
  return request.headers.get('x-real-ip') ?? 'onbekend';
}

/* ── Validation ────────────────────────────────────────────────────────── */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[0-9+()\-.\s]{6,40}$/;

const SUBJECTS: readonly string[] = [
  ...services.map((service) => service.title),
  'Anders / weet ik nog niet',
];

export type ContactFieldErrors = Partial<
  Record<'naam' | 'email' | 'telefoon' | 'onderwerp' | 'bericht', string>
>;

type ValidPayload = {
  naam: string;
  email: string;
  telefoon: string;
  onderwerp: string;
  bericht: string;
};

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function validate(body: Record<string, unknown>): {
  errors: ContactFieldErrors;
  data: ValidPayload;
} {
  const errors: ContactFieldErrors = {};

  const naam = asString(body.naam);
  const email = asString(body.email);
  const telefoon = asString(body.telefoon);
  const onderwerp = asString(body.onderwerp);
  const bericht = asString(body.bericht);

  if (naam.length < 2) {
    errors.naam = 'Vul uw naam in (minimaal 2 tekens).';
  } else if (naam.length > 100) {
    errors.naam = 'Uw naam mag maximaal 100 tekens bevatten.';
  }

  if (email.length === 0) {
    errors.email = 'Vul uw e-mailadres in.';
  } else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Dit lijkt geen geldig e-mailadres.';
  }

  if (telefoon.length > 0 && !PHONE_PATTERN.test(telefoon)) {
    errors.telefoon = 'Dit lijkt geen geldig telefoonnummer.';
  }

  if (onderwerp.length > 0 && !SUBJECTS.includes(onderwerp)) {
    errors.onderwerp = 'Kies een onderwerp uit de lijst.';
  }

  if (bericht.length < 20) {
    errors.bericht = 'Beschrijf uw vraag in minimaal 20 tekens.';
  } else if (bericht.length > 5000) {
    errors.bericht = 'Uw bericht mag maximaal 5000 tekens bevatten.';
  }

  return { errors, data: { naam, email, telefoon, onderwerp, bericht } };
}

/* ── Mail rendering ────────────────────────────────────────────────────── */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(data: ValidPayload) {
  const rows: ReadonlyArray<[string, string]> = [
    ['Naam', data.naam],
    ['E-mail', data.email],
    ['Telefoon', data.telefoon || '—'],
    ['Onderwerp', data.onderwerp || '—'],
  ];

  const text = [
    `Nieuw bericht via het contactformulier op ${site.url}`,
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Bericht:',
    data.bericht,
  ].join('\n');

  const html = `<div style="font-family:Georgia,serif;color:#0b2d27;line-height:1.6">
  <p style="font:500 11px/1 monospace;letter-spacing:.2em;text-transform:uppercase;color:#a2452a">
    Contactformulier — ${escapeHtml(site.name)}
  </p>
  <table cellpadding="0" cellspacing="0" style="margin:20px 0;border-collapse:collapse">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 24px 6px 0;color:#62726a;font-size:13px">${escapeHtml(label)}</td><td style="padding:6px 0;font-size:15px">${escapeHtml(value)}</td></tr>`,
      )
      .join('')}
  </table>
  <p style="margin:0 0 8px;color:#62726a;font-size:13px">Bericht</p>
  <p style="white-space:pre-wrap;font-size:15px">${escapeHtml(data.bericht)}</p>
</div>`;

  return { text, html };
}

/* ── Handler ───────────────────────────────────────────────────────────── */

const UNAVAILABLE =
  'Het contactformulier is op dit moment niet beschikbaar, waardoor uw bericht niet is verzonden. ' +
  'Neem telefonisch of per e-mail contact met ons op, dan pakken wij het direct op.';

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Never pretend a message was delivered when it cannot be.
  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { ok: false, unavailable: true, error: UNAVAILABLE },
      { status: 503 },
    );
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        error:
          'U heeft in korte tijd meerdere berichten verstuurd. Probeer het over tien minuten opnieuw of bel ons.',
      },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== 'object' || parsed === null) throw new Error('invalid body');
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Het bericht kon niet worden gelezen. Probeer het opnieuw.' },
      { status: 400 },
    );
  }

  // Honeypot: real visitors never fill this in. The field name avoids anything
  // a password manager would recognise and autofill.
  if (asString(body.bericht_ref).length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { errors, data } = validate(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Controleer de gemarkeerde velden en probeer het opnieuw.',
        fields: errors,
      },
      { status: 400 },
    );
  }

  const { text, html } = buildEmail(data);

  let response: Response;
  try {
    response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Contactformulier — ${data.naam}${data.onderwerp ? ` (${data.onderwerp})` : ''}`,
        text,
        html,
      }),
    });
  } catch {
    return NextResponse.json({ ok: false, unavailable: true, error: UNAVAILABLE }, { status: 502 });
  }

  if (!response.ok) {
    return NextResponse.json({ ok: false, unavailable: true, error: UNAVAILABLE }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: 'Gebruik POST om het contactformulier te versturen.' },
    { status: 405, headers: { Allow: 'POST' } },
  );
}
