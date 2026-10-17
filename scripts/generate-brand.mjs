import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const PLATE_BG = { r: 254, g: 254, b: 254, alpha: 1 };
const OG_BG = { r: 254, g: 245, b: 228, alpha: 1 };
const CREAM = { r: 254, g: 245, b: 228, alpha: 1 };

await mkdir("public/brand", { recursive: true });
await mkdir("public/og", { recursive: true });

/* 1. Brand logo lockup: the authentic emblem + wordmark from logo.png,
   composed into a single transparent horizontal asset (no colour plate,
   no separate monogram badge). A cream-wordmark variant is produced for the
   navy footer. */
const meta = await sharp("logo.png").metadata();
const split = Math.round((meta.height ?? 0) * 0.645);

// sharp cannot chain `.extract().trim()`, so round-trip through buffers.
const emblemRegion = await sharp("logo.png")
  .extract({ left: 0, top: 0, width: meta.width, height: split })
  .png()
  .toBuffer();
const wordmarkRegion = await sharp("logo.png")
  .extract({ left: 0, top: split, width: meta.width, height: (meta.height ?? 0) - split })
  .png()
  .toBuffer();

const emblem = await sharp(emblemRegion).trim({ threshold: 1 }).png().toBuffer();
const wordmark = await sharp(wordmarkRegion).trim({ threshold: 1 }).png().toBuffer();

const wm = await sharp(wordmark).metadata();
const wmWidth = wm.width ?? 0;
const wmHeight = wm.height ?? 0;

const emblemScaled = await sharp(emblem)
  .resize({ height: wmHeight, fit: "inside" })
  .png()
  .toBuffer();
const em = await sharp(emblemScaled).metadata();
const emWidth = em.width ?? 0;
const emHeight = em.height ?? 0;

const gap = Math.round(wmHeight * 0.4);
const lockWidth = emWidth + gap + wmWidth;
const lockHeight = wmHeight;
const emblemTop = Math.round((lockHeight - emHeight) / 2);
const canvas = {
  width: lockWidth,
  height: lockHeight,
  channels: 4,
  background: { r: 0, g: 0, b: 0, alpha: 0 },
};

const lightLockup = await sharp({ create: canvas })
  .composite([
    { input: emblemScaled, left: 0, top: emblemTop },
    { input: wordmark, left: emWidth + gap, top: 0 },
  ])
  .png()
  .toBuffer();
await sharp(lightLockup).trim({ threshold: 1 }).toFile("public/brand/logo.png");

// Cream wordmark: reuse the glyph alpha as a fill mask.
const alpha = await sharp(wordmark).extractChannel("alpha").toBuffer();
const creamFill = await sharp({
  create: { width: wmWidth, height: wmHeight, channels: 3, background: CREAM },
})
  .png()
  .toBuffer();
const creamWordmark = await sharp(creamFill).joinChannel(alpha).png().toBuffer();

const darkLockup = await sharp({ create: canvas })
  .composite([
    { input: emblemScaled, left: 0, top: emblemTop },
    { input: creamWordmark, left: emWidth + gap, top: 0 },
  ])
  .png()
  .toBuffer();
await sharp(darkLockup).trim({ threshold: 1 }).toFile("public/brand/logo-on-dark.png");
console.log("wrote public/brand/logo.png, public/brand/logo-on-dark.png");

/* 2. Favicon / app icons: emblem from logo-bg.png on a light square. */
const emblemIcon = await sharp("logo-bg.png")
  .extract({ left: 505, top: 104, width: 580, height: 536 })
  .resize(512, 512, { fit: "contain", background: PLATE_BG })
  .png()
  .toBuffer();
await sharp(emblemIcon).png().toFile("src/app/icon.png");
await sharp(emblemIcon).resize(180, 180).png().toFile("src/app/apple-icon.png");
console.log("wrote src/app/icon.png, src/app/apple-icon.png");

/* 3. OG image: the logo lockup centred on the warm cream canvas. */
const ogLogo = await sharp("public/brand/logo.png")
  .resize({ width: 820 })
  .png()
  .toBuffer();
const ogLogoMeta = await sharp(ogLogo).metadata();
const ogLogoWidth = ogLogoMeta.width ?? 820;
const ogLogoHeight = ogLogoMeta.height ?? 320;
const og = await sharp({
  create: { width: 1200, height: 630, channels: 4, background: OG_BG },
})
  .composite([
    {
      input: ogLogo,
      left: Math.round((1200 - ogLogoWidth) / 2),
      top: Math.round((630 - ogLogoHeight) / 2),
    },
  ])
  .png()
  .toBuffer();
await sharp(og).png().toFile("public/og/lana-luxe-events.png");
console.log("wrote public/og/lana-luxe-events.png");
