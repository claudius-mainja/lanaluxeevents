import { expect, test } from "@playwright/test";

const widths = [360, 390, 768, 1024, 1440];
const pages = ["/", "/collection", "/contact"];

test.describe("responsive layout", () => {
  for (const width of widths) {
    test(`no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      for (const path of pages) {
        await page.goto(path, { waitUntil: "domcontentloaded" });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${path} overflows by ${overflow}px at ${width}px`).toBeLessThanOrEqual(1);
      }
    });
  }

  test("brand logo is visible and sized responsively", async ({ page }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const logo = page.locator('header img[alt="Lana Luxe Events"]');
      await expect(logo).toBeVisible();
      const box = await logo.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(80);
      expect(box!.width).toBeLessThan(200);
    }
  });
});
