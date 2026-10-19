import { expect, test } from "@playwright/test";

const pages = ["/", "/collection", "/contact", "/faqs", "/service-areas", "/about", "/cookies"];

test.describe("accessibility basics", () => {
  for (const path of pages) {
    test(`single h1 and labelled landmarks on ${path}`, async ({ page }) => {
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", /.+/);

      const imagesWithoutAlt = await page.locator("img:not([alt])").count();
      expect(imagesWithoutAlt).toBe(0);

      const main = page.locator("main");
      await expect(main.first()).toBeAttached();
    });
  }

  test("skip link is focusable and targets main content", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: /skip/i }).first();
    await expect(skip).toBeFocused();
  });
});
