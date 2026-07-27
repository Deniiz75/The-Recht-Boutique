'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Loader2, Send } from 'lucide-react';
import { services } from '@/content/site';
import { realEmail, realPhone } from '@/lib/placeholder';

type FieldName = 'naam' | 'email' | 'telefoon' | 'onderwerp' | 'bericht';
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unavailable';

type ApiResponse = {
  ok?: boolean;
  error?: string;
  unavailable?: boolean;
  fields?: FieldErrors;
};

const SUBJECTS = [
  ...services.map((service) => service.title),
  'Anders / weet ik nog niet',
];

const GENERIC_FAILURE =
  'Uw bericht kon niet worden verzonden. Er is dus nog geen contact met ons — probeer het opnieuw of neem rechtstreeks contact op.';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const alertRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const uid = useId().replace(/:/g, '');
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-fout`;
  const hintId = (name: string) => `${uid}-${name}-hint`;

  const phone = realPhone();
  const email = realEmail();
  const busy = status === 'submitting';
  const failed = status === 'error' || status === 'unavailable';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setStatus('submitting');
    setMessage('');
    setFieldErrors({});

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let data: ApiResponse = {};
      try {
        data = (await response.json()) as ApiResponse;
      } catch {
        data = {};
      }

      if (response.ok && data.ok === true) {
        setStatus('success');
        form.reset();
        // The form unmounts on success, so focus would fall back to <body>.
        window.requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      setFieldErrors(data.fields ?? {});
      setMessage(data.error ?? GENERIC_FAILURE);
      setStatus(data.unavailable === true || response.status >= 500 ? 'unavailable' : 'error');
    } catch {
      setMessage(GENERIC_FAILURE);
      setStatus('unavailable');
    }

    window.requestAnimationFrame(() => alertRef.current?.focus());
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="border border-line bg-cream px-7 py-12 text-center sm:px-12"
        style={{ borderRadius: '160px 160px 0 0' }}
      >
        <p className="font-mono text-[0.625rem] tracking-[0.24em] text-rust-deep uppercase">
          Bericht verzonden
        </p>
        <h2 className="mt-6 font-display text-title">Dank u wel</h2>
        <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted">
          Uw bericht is bij ons aangekomen. U ontvangt binnen één werkdag antwoord van de
          jurist die uw vraag oppakt. Is er haast bij, bel ons dan gerust.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="btn btn-outline mt-9"
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      {/* Status region — announced whether the send succeeded or failed. */}
      <div aria-live="polite" aria-atomic="true">
        {failed ? (
          <div
            ref={alertRef}
            tabIndex={-1}
            className="border border-rust-deep bg-rust-deep/5 px-5 py-5"
          >
            <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-deep">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-rust-deep"
              />
              <span>
                <strong className="font-semibold">Niet verzonden.</strong> {message}
              </span>
            </p>

            {status === 'unavailable' ? (
              <div className="mt-4 flex flex-col gap-2 border-t border-rust-deep/25 pt-4 font-mono text-[0.6875rem] tracking-[0.14em] uppercase">
                {phone ? (
                  <a href={phone.href} className="link-rule-in w-fit text-rust-deep">
                    Bel {phone.display}
                  </a>
                ) : null}
                {email ? (
                  <a href={`mailto:${email}`} className="link-rule-in w-fit text-rust-deep">
                    Mail {email}
                  </a>
                ) : null}
                {!phone && !email ? (
                  <span className="text-muted">
                    De contactgegevens worden vóór livegang ingevuld.
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
        {busy ? <p className="sr-only">Bezig met verzenden…</p> : null}
      </div>

      {/* Honeypot. Named `bericht_ref` rather than something like `website`,
          which password managers happily autofill — a false positive would
          silently discard a real message. */}
      <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={fieldId('bericht_ref')}>Laat dit veld leeg</label>
        <input
          id={fieldId('bericht_ref')}
          name="bericht_ref"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          label="Naam"
          name="naam"
          autoComplete="name"
          error={fieldErrors.naam}
          fieldId={fieldId}
          errorId={errorId}
        />
        <Field
          label="E-mailadres"
          name="email"
          type="email"
          autoComplete="email"
          error={fieldErrors.email}
          fieldId={fieldId}
          errorId={errorId}
        />
        <Field
          label="Telefoonnummer"
          name="telefoon"
          type="tel"
          optional
          autoComplete="tel"
          error={fieldErrors.telefoon}
          fieldId={fieldId}
          errorId={errorId}
        />

        <div>
          <label
            htmlFor={fieldId('onderwerp')}
            className="font-mono text-[0.625rem] tracking-[0.2em] text-ink uppercase"
          >
            Onderwerp{' '}
            <span className="text-muted normal-case">(optioneel)</span>
          </label>
          <select
            id={fieldId('onderwerp')}
            name="onderwerp"
            defaultValue=""
            className="field mt-3"
            aria-invalid={fieldErrors.onderwerp ? true : undefined}
            aria-describedby={fieldErrors.onderwerp ? errorId('onderwerp') : undefined}
          >
            <option value="">Kies een praktijkgebied</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {fieldErrors.onderwerp ? (
            <p id={errorId('onderwerp')} className="mt-2 text-sm text-rust-deep">
              {fieldErrors.onderwerp}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label
          htmlFor={fieldId('bericht')}
          className="font-mono text-[0.625rem] tracking-[0.2em] text-ink uppercase"
        >
          Uw vraag of situatie
        </label>
        <textarea
          id={fieldId('bericht')}
          name="bericht"
          rows={7}
          className="field mt-3 resize-y"
          placeholder="Beschrijf kort wat er speelt en wat u zou willen bereiken."
          aria-invalid={fieldErrors.bericht ? true : undefined}
          aria-describedby={
            fieldErrors.bericht
              ? `${errorId('bericht')} ${hintId('bericht')}`
              : hintId('bericht')
          }
        />
        <p id={hintId('bericht')} className="mt-2 text-sm text-muted">
          Minimaal 20 tekens. Deel nog geen vertrouwelijke bijlagen — die bespreken wij
          liever persoonlijk.
        </p>
        {fieldErrors.bericht ? (
          <p id={errorId('bericht')} className="mt-2 text-sm text-rust-deep">
            {fieldErrors.bericht}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Wij gebruiken uw gegevens uitsluitend om uw vraag te beantwoorden. Lees hoe wij
          daarmee omgaan in onze{' '}
          <Link href="/privacyverklaring" className="link-rule text-rust-deep">
            privacyverklaring
          </Link>
          .
        </p>
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="h-4 w-4" />
          )}
          {busy ? 'Versturen…' : 'Bericht versturen'}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: FieldName;
  type?: string;
  optional?: boolean;
  autoComplete?: string;
  error?: string;
  fieldId: (name: string) => string;
  errorId: (name: string) => string;
};

function Field({
  label,
  name,
  type = 'text',
  optional = false,
  autoComplete,
  error,
  fieldId,
  errorId,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={fieldId(name)}
        className="font-mono text-[0.625rem] tracking-[0.2em] text-ink uppercase"
      >
        {label}{' '}
        {optional ? <span className="text-muted normal-case">(optioneel)</span> : null}
      </label>
      <input
        id={fieldId(name)}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="field mt-3"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(name) : undefined}
      />
      {error ? (
        <p id={errorId(name)} className="mt-2 text-sm text-rust-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
