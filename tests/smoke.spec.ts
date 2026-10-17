import { expect, test } from "@playwright/test";

test.describe("critical pages render", () => {
  test("home shows hero and key sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /get a quote|quote/i }).first()).toBeVisible();
  });

  test("primary navigation is present", async ({ page }, testInfo) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    if (testInfo.project.name === "mobile") {
      await expect(page.getByRole("button", { name: /open menu/i })).toBeAttached();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeAttached();
    }
  });

  test("collection lists hire items", async ({ page }) => {
    await page.goto("/collection");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /enquire/i }).first()).toBeVisible();
  });

  test("contact exposes the enquiry form", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("#quote-form-heading")).toBeVisible();
  });

  test("draft locale is served under its prefix", async ({ page }) => {
    await page.goto("/af");
    await expect(page.locator("html")).toHaveAttribute("lang", /^af/);
  });

  test("unknown page renders a not-found response", async ({ page }) => {
    const response = await page.goto("/this-page-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
