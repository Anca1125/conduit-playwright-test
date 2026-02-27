import { test, expect } from "@playwright/test";
import { SettingsPage } from "../pages/settings-page";
import { SignInPage } from "../pages/signin-page";
import { signInData } from "../test-data/signin-data";
import { createUserAndLogin } from "../utils/auth-helper";

test.describe("settings", () => {
  let settingsPage: SettingsPage;
  test.beforeEach(async ({ page }) => {
    settingsPage = new SettingsPage(page);
    await createUserAndLogin(page);
  });

  test("settings - happy flow - update profile with valid data", async ({
    page,
  }) => {
    const signInPage = new SignInPage(page);
    const newBio = `QA Bio ${Date.now()}`;
    const uniqueUsername = `Mishu${Date.now()}`;

    await settingsPage.clickAndEditProfileSettings(
      "https://www.istockphoto.com/ro/fotografii/%C3%AEn-aer-liber-fotografii",
      uniqueUsername,
      newBio,
      `mish${Date.now()}@test.com`,
      "mishuMotanulCelMaiTare1!",
    );
    await Promise.all([
      page.waitForURL(/profile/),
      settingsPage.clickUpdateSettings(),
    ]);

    await expect(page).toHaveURL(/\/profile\//);
  });
  test("settings - user is able to logout", async ({ page }) => {
    await page.getByRole("link", { name: "Settings" }).click();
    await expect(page).toHaveURL(/settings/);
    await settingsPage.logoutUser();
    await expect(
      page.getByRole("link", { name: "Sign in", exact: true }),
    ).toBeVisible();
  });
});
