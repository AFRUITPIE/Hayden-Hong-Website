import { test, expect } from "@playwright/test";

test("searches for Favorite Reads and navigates to the first result", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  // Open the search and type the query
  const searchInput = page.locator('input[type="search"]').first();
  await searchInput.fill("Favorite Reads");

  // Select the first result
  const firstResult = page.getByRole("option").first();
  await firstResult.click();

  await expect(page).toHaveURL(/\/favorite-reads$/);
  await expect(page.locator("h1")).toContainText("My Favorite Reads");
});
