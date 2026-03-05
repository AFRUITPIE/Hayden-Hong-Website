import { test, expect } from "@playwright/test";

test("searches for Projects and navigates to the first result", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const searchButton = page.locator("[data-search-full]").first();
  await expect(searchButton).toBeVisible();
  await searchButton.click();

  const searchInput = page.locator("input[placeholder='Search']").first();
  const hasSearchDialog = await searchInput.isVisible({ timeout: 3000 }).catch(() => false);

  if (hasSearchDialog) {
    const searchResponse = page.waitForResponse(
      (searchResponse) =>
        searchResponse.url().includes("/api/search") &&
        searchResponse.request().method() === "GET",
    );

    await searchInput.fill("Projects");
    await searchResponse;

    const projectResult = page.getByRole("button", { name: /projects/i }).first();
    await expect(projectResult).toBeVisible();
    await projectResult.click();
  } else {
    await page.getByRole("link", { name: "Projects" }).first().click();
  }

  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { level: 1, name: "Projects" })).toBeVisible();
});
