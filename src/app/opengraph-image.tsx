import { ImageResponse } from 'next/og';
import { site } from '@/content/site';
import { loadDisplayFont } from '@/lib/og-font';

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#0b2d27';
const PAPER = '#fffcf6';
const GOLD = '#d6ad59';
const RUST = '#bd5d3e';

export default async function OpengraphImage() {
  const fontData = await loadDisplayFont();

  const element = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        backgroundColor: INK,
        backgroundImage: `radial-gradient(120% 90% at 12% 0%, rgba(233,223,203,0.16) 0%, rgba(11,45,39,0) 60%), radial-gradient(80% 70% at 95% 100%, rgba(189,93,62,0.28) 0%, rgba(11,45,39,0) 65%)`,
        fontFamily: '"Playfair Display", Georgia, serif',
      }}
    >
      {/* Hairline frame */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
          right: 30,
          bottom: 30,
          border: `1px solid rgba(214,173,89,0.45)`,
          display: 'flex',
        }}
      />

      {/* Arch motif */}
      <div
        style={{
          position: 'absolute',
          right: 96,
          bottom: 30,
          width: 300,
          height: 430,
          borderTopLeftRadius: 260,
          borderTopRightRadius: 260,
          border: `1px solid rgba(214,173,89,0.4)`,
          display: 'flex',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 136,
          bottom: 30,
          width: 220,
          height: 350,
          borderTopLeftRadius: 200,
          borderTopRightRadius: 200,
          border: `1px solid rgba(255,252,246,0.16)`,
          display: 'flex',
        }}
      />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          height: '100%',
          width: 780,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 20,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: GOLD,
            fontFamily: 'monospace',
          }}
        >
          Juridisch adviesbureau
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 34,
            color: PAPER,
            fontSize: 92,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          <span>The Recht</span>
          <span>Boutique</span>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 40,
            width: 140,
            height: 2,
            backgroundColor: RUST,
          }}
        />

        <div
          style={{
            display: 'flex',
            marginTop: 34,
            fontSize: 34,
            color: 'rgba(255,252,246,0.78)',
          }}
        >
          {site.tagline}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 96,
          bottom: 74,
          display: 'flex',
          fontSize: 18,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: 'rgba(255,252,246,0.55)',
          fontFamily: 'monospace',
        }}
      >
        Ondernemingsrecht · Contractenrecht · Privaatrecht · Geschillen
      </div>
    </div>
  );

  if (fontData) {
    return new ImageResponse(element, {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: fontData,
          style: 'normal',
          weight: 600,
        },
      ],
    });
  }

  return new ImageResponse(element, { ...size });
}
