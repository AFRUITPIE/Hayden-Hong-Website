import { test, expect } from "@playwright/test";

test("navigates between core pages from the sidebar", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const sidebar = page.locator("#nd-sidebar");
  await expect(sidebar).toBeVisible();

  const contactLink = sidebar.locator('a[href="/contact"]').first();
  await expect(contactLink).toBeVisible();

  await contactLink.click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Contact Me" }),
  ).toBeVisible();

  await page.goBack();
  await expect(
    page.getByRole("heading", { level: 1, name: "Hayden Hong" }),
  ).toBeVisible();

  const alexaShoppingLink = sidebar
    .locator('a[href="/work-experience/amazon/alexa-shopping"]')
    .first();
  await expect(alexaShoppingLink).toBeVisible();

  await alexaShoppingLink.click();
  await expect(page).toHaveURL(/\/work-experience\/amazon\/alexa-shopping$/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Alexa Shopping",
    }),
  ).toBeVisible();
});
