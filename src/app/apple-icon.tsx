import { ImageResponse } from 'next/og';
import { loadDisplayFont } from '@/lib/og-font';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

const INK = '#000000';
const BEIGE = '#e3caab';
const BRAND = '#cf0044';

/** Monogram app icon in the house palette — beige field, black monogram, pink rule. */
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
        backgroundColor: BEIGE,
        backgroundImage:
          'radial-gradient(100% 80% at 30% 10%, rgba(255,255,255,0.45) 0%, rgba(227,202,171,0) 62%)',
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
          border: `1px solid ${BRAND}`,
          opacity: 0.7,
          display: 'flex',
        }}
      />
      <div
        style={{
          display: 'flex',
          color: INK,
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
          backgroundColor: BRAND,
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
