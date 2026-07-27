import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ondark';

const variants: Record<Variant, string> = {
  primary: 'btn btn-primary',
  outline: 'btn btn-outline',
  ondark: 'btn btn-ondark',
};

type ButtonLinkProps = {
  href: ComponentProps<typeof Link>['href'];
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Square-cornered, mono-labelled link button. */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`${variants[variant]} ${className ?? ''}`}>
      {children}
    </Link>
  );
}

type ExternalButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

/** Same styling for `tel:` / `mailto:` targets, which are not app routes. */
export function ButtonAnchor({
  href,
  children,
  variant = 'outline',
  className,
}: ExternalButtonProps) {
  return (
    <a href={href} className={`${variants[variant]} ${className ?? ''}`}>
      {children}
    </a>
  );
}
