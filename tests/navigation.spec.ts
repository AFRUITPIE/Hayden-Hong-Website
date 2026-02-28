import { test, expect } from "@playwright/test";

test("navigates between core pages from the sidebar", async ({
  page,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);

  const sidebar = page.locator("#nd-sidebar");
  await expect(sidebar).toBeVisible();

  const contactLink = sidebar.getByRole("link", { name: "Contact Me" });
  await expect(contactLink).toBeVisible();

  await contactLink.first().click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Contact Me" }),
  ).toBeVisible();

  await page.goBack();
  await expect(page.getByRole("heading", { level: 1, name: "Home" })).toBeVisible();

  const workExperienceToggle = sidebar.getByRole("button", {
    name: /Work Experience/i,
  });
  await workExperienceToggle.click();

  const amazonToggle = sidebar.getByRole("button", { name: "Amazon" });
  await expect(amazonToggle).toBeVisible();
  await amazonToggle.click();

  const alexaShoppingLink = sidebar.getByRole("link", {
    name: "Alexa Shopping",
  });
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
