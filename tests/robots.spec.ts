import { test, expect } from "@playwright/test";

test("robots.txt resolves", async ({ page }) => {
  const response = await page.goto("/robots.txt");
  expect(response?.status()).toBe(200);
});
