'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Loader2, Send } from 'lucide-react';
import { contactSubjects } from '@/content/site';
import { realEmail } from '@/lib/placeholder';

type FieldName = 'naam' | 'email' | 'onderwerp' | 'bericht';
type FieldErrors = Partial<Record<FieldName, string>>;
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unavailable';

type ApiResponse = {
  ok?: boolean;
  error?: string;
  unavailable?: boolean;
  fields?: FieldErrors;
};

const GENERIC_FAILURE =
  'Uw bericht kon niet worden verzonden. Er is dus nog geen contact met ons — probeer het opnieuw of stuur ons rechtstreeks een e-mail.';

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
        className="rounded-xl border border-rose/15 bg-white px-7 py-12 text-center sm:px-12"
      >
        <p className="text-[0.8rem] font-semibold tracking-[3px] text-rose-light uppercase">
          Bericht verzonden
        </p>
        <h2 className="mt-6 font-serif text-title text-rose">Dank u wel</h2>
        <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-text-medium">
          Uw bericht is bij ons aangekomen. U ontvangt binnen één werkdag antwoord van de
          jurist die uw vraag oppakt.
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
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Status region — announced whether the send succeeded or failed. */}
      <div aria-live="polite" aria-atomic="true">
        {failed ? (
          <div
            ref={alertRef}
            tabIndex={-1}
            className="rounded-xl border border-rose bg-rose-soft px-5 py-5"
          >
            <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-text-dark">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-rose-dark"
              />
              <span>
                <strong className="font-semibold">Niet verzonden.</strong> {message}
              </span>
            </p>

            {status === 'unavailable' ? (
              <div className="mt-4 flex flex-col gap-2 border-t border-rose/25 pt-4 text-[0.85rem] font-semibold">
                {email ? (
                  <a href={`mailto:${email}`} className="link-rule-in w-fit text-rose-dark">
                    Mail {email}
                  </a>
                ) : (
                  <span className="text-text-medium">
                    De contactgegevens worden vóór livegang ingevuld.
                  </span>
                )}
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

      {/* No phone field: we reply by e-mail only for now. */}
      <div className="grid gap-x-4 sm:grid-cols-2">
        <Field
          label="Naam"
          name="naam"
          placeholder="Uw volledige naam"
          autoComplete="name"
          error={fieldErrors.naam}
          fieldId={fieldId}
          errorId={errorId}
        />
        <Field
          label="E-mailadres"
          name="email"
          type="email"
          placeholder="uw@email.nl"
          autoComplete="email"
          error={fieldErrors.email}
          fieldId={fieldId}
          errorId={errorId}
        />
      </div>

      <div>
        <label htmlFor={fieldId('onderwerp')} className={LABEL}>
          Waar gaat het over?
        </label>
        <select
          id={fieldId('onderwerp')}
          name="onderwerp"
          defaultValue=""
          className="field"
          aria-invalid={fieldErrors.onderwerp ? true : undefined}
          aria-describedby={fieldErrors.onderwerp ? errorId('onderwerp') : undefined}
        >
          <option value="">Kies een onderwerp</option>
          {contactSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        {fieldErrors.onderwerp ? (
          <p id={errorId('onderwerp')} className="mt-2 text-sm font-medium text-rose-dark">
            {fieldErrors.onderwerp}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId('bericht')} className={LABEL}>
          Uw bericht
          <RequiredMark />
        </label>
        <textarea
          id={fieldId('bericht')}
          name="bericht"
          rows={5}
          className="field min-h-[120px] resize-y"
          placeholder="Beschrijf kort uw juridische vraag of situatie…"
          aria-invalid={fieldErrors.bericht ? true : undefined}
          aria-describedby={
            fieldErrors.bericht
              ? `${errorId('bericht')} ${hintId('bericht')}`
              : hintId('bericht')
          }
        />
        <p id={hintId('bericht')} className="mt-2 text-[0.8rem] text-text-medium">
          Minimaal 20 tekens. Deel nog geen vertrouwelijke bijlagen — die bespreken wij
          liever persoonlijk.
        </p>
        {fieldErrors.bericht ? (
          <p id={errorId('bericht')} className="mt-2 text-sm font-medium text-rose-dark">
            {fieldErrors.bericht}
          </p>
        ) : null}
      </div>

      <div>
        <button type="submit" className="btn btn-primary w-full" disabled={busy}>
          {busy ? (
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="h-4 w-4" />
          )}
          {busy ? 'Versturen…' : 'Verstuur bericht'}
        </button>
        <p className="mt-4 text-center text-[0.8rem] text-text-medium">
          Wij nemen binnen 24 uur contact met u op. Uw gegevens worden vertrouwelijk
          behandeld — zie onze{' '}
          <Link href="/privacyverklaring" className="link-rule text-rose">
            privacyverklaring
          </Link>
          .
        </p>
      </div>
    </form>
  );
}

const LABEL = 'mb-2 block text-[0.85rem] font-semibold text-text-dark';

/**
 * The asterisk is decorative. "verplicht" is appended to the accessible name
 * instead, because a screen reader announcing "Naam ster" tells the user
 * nothing about the field being required.
 */
function RequiredMark() {
  return (
    <>
      <span aria-hidden="true"> *</span>
      <span className="sr-only"> verplicht</span>
    </>
  );
}

type FieldProps = {
  label: string;
  name: FieldName;
  type?: string;
  optional?: boolean;
  placeholder?: string;
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
  placeholder,
  autoComplete,
  error,
  fieldId,
  errorId,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={fieldId(name)} className={LABEL}>
        {label}
        {optional ? null : <RequiredMark />}
      </label>
      <input
        id={fieldId(name)}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId(name) : undefined}
      />
      {error ? (
        <p id={errorId(name)} className="mt-2 text-sm font-medium text-rose-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}
