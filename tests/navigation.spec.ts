import { test, expect } from "@playwright/test";

test("roundtrip opens homepage, navigates to contact me, navigates back to homepage", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const sidebar = page.locator("aside.nextra-sidebar");
  await expect(sidebar).toBeVisible();
  const contactLink = sidebar.getByRole("link", { name: "Contact" });
  await expect(contactLink).toBeVisible();

  await contactLink.first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.locator("h1")).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
});
