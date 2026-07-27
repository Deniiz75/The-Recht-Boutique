import type { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  /** `wide` for full editorial spreads, `narrow` for reading columns. */
  width?: 'default' | 'wide' | 'narrow';
  className?: string;
};

const widths = {
  default: 'max-w-[78rem]',
  wide: 'max-w-[92rem]',
  narrow: 'max-w-[46rem]',
} as const;

export function Container({ children, width = 'default', className }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-5 sm:px-8 lg:px-12 ${widths[width]} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
