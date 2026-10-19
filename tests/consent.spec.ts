import { expect, test } from "@playwright/test";

// These tests need a clean first visit with no stored consent choice.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("cookie consent", () => {
  test("first visit shows the banner; accepting stores the choice and hides it", async ({
    page,
  }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /cookie notice/i });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("button", { name: /accept analytics/i })).toBeVisible();
    await expect(banner.getByRole("button", { name: /^decline$/i })).toBeVisible();
    await expect(banner.getByRole("link", { name: /cookie policy/i })).toBeVisible();

    await banner.getByRole("button", { name: /accept analytics/i }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem("lle:consent"))).toBe("accepted");

    await page.reload();
    await expect(page.getByRole("dialog", { name: /cookie notice/i })).toBeHidden();
  });

  test("declining stores the choice and hides the banner", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /cookie notice/i });
    await banner.getByRole("button", { name: /^decline$/i }).click();
    await expect(banner).toBeHidden();
    expect(await page.evaluate(() => localStorage.getItem("lle:consent"))).toBe("declined");
  });

  test("footer cookie settings reopens the banner after a decision", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /cookie notice/i });
    await banner.getByRole("button", { name: /^decline$/i }).click();
    await expect(banner).toBeHidden();

    await page.getByRole("button", { name: /cookie settings/i }).click();
    await expect(page.getByRole("dialog", { name: /cookie notice/i })).toBeVisible();
  });

  test("no analytics scripts load while consent is declined", async ({ page }) => {
    await page.goto("/");
    const banner = page.getByRole("dialog", { name: /cookie notice/i });
    await banner.getByRole("button", { name: /^decline$/i }).click();
    const scripts = await page.evaluate(() =>
      Array.from(document.scripts).map((s) => s.src).filter(Boolean),
    );
    expect(scripts.some((src) => src.includes("googletagmanager.com"))).toBe(false);
    expect(scripts.some((src) => src.includes("facebook.net"))).toBe(false);
  });
});

test.describe("cookies page", () => {
  test("explains essential storage, analytics and choices", async ({ page }) => {
    await page.goto("/cookies");
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/cookie policy/i);
    await expect(page.getByRole("heading", { name: /essential storage/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /optional analytics/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /changing your choice/i })).toBeVisible();
    await expect(
      page.locator("#main").getByRole("button", { name: /cookie settings/i }),
    ).toBeVisible();
  });

  test("privacy page links to the cookie policy", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.getByRole("link", { name: /cookie policy/i }).first()).toBeVisible();
  });
});
