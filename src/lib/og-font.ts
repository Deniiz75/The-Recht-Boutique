/**
 * Loads Playfair Display as a TrueType buffer for `next/og` image generation.
 *
 * Satori (the renderer behind `ImageResponse`) cannot read woff2, so we ask the
 * Google Fonts CSS endpoint with a legacy user agent — that variant serves TTF.
 * Every failure path returns `null`; callers must then omit the `fonts` option
 * entirely rather than passing an empty/undefined entry.
 */
const CSS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap';

const LEGACY_UA = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)';

export async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const cssResponse = await fetch(CSS_URL, { headers: { 'User-Agent': LEGACY_UA } });
    if (!cssResponse.ok) return null;

    const css = await cssResponse.text();
    const match = /src:\s*url\((https:[^)]+)\)\s*format\('truetype'\)/.exec(css);
    const fontUrl = match?.[1];
    if (!fontUrl) return null;

    const fontResponse = await fetch(fontUrl);
    if (!fontResponse.ok) return null;

    return await fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}
