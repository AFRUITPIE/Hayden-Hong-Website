import { test, expect } from "@playwright/test";

test("searches for Favorite Reads and navigates to the first result", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const searchButton = page.locator("[data-search-full]").first();
  await expect(searchButton).toBeVisible();
  await searchButton.click();

  const searchDialog = page.getByRole("dialog");
  const searchInput = searchDialog.getByRole("textbox").first();
  const searchResponse = page.waitForResponse(
    (response) =>
      response.url().includes("/api/search") && response.request().method() === "GET",
  );

  await searchInput.fill("Favorite Reads");
  await searchResponse;
  await expect(searchDialog.locator('[data-empty="false"]')).toBeVisible();

  await searchInput.press("Enter");
  await expect(page).toHaveURL(/\/favorite-reads$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "My Favorite Reads" }),
  ).toBeVisible();
});
