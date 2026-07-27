import { ImageResponse } from 'next/og';
import { loadDisplayFont } from '@/lib/og-font';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const INK = '#123d36';
const PAPER = '#fffcf6';
const GOLD = '#d6ad59';

/** Monogram app icon in the house palette — ink field, gold rule, TRB mark. */
export default async function AppleIcon() {
  const fontData = await loadDisplayFont();

  const element = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: INK,
        backgroundImage:
          'radial-gradient(100% 80% at 30% 10%, rgba(233,223,203,0.22) 0%, rgba(18,61,54,0) 62%)',
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          bottom: 12,
          border: `1px solid ${GOLD}`,
          opacity: 0.6,
          display: 'flex',
        }}
      />
      <div
        style={{
          display: 'flex',
          color: PAPER,
          fontSize: 74,
          letterSpacing: -2,
          lineHeight: 1,
        }}
      >
        TRB
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 14,
          width: 46,
          height: 2,
          backgroundColor: GOLD,
        }}
      />
    </div>
  );

  if (fontData) {
    return new ImageResponse(element, {
      ...size,
      fonts: [{ name: 'Playfair Display', data: fontData, style: 'normal', weight: 600 }],
    });
  }

  return new ImageResponse(element, { ...size });
}
