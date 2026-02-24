import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/signin-page";
import { signInData } from "../test-data/signin-data";

test.describe("signin flow", () => {
  let signInPage: SignInPage;

  test.beforeEach(async ({ page }) => {
    signInPage = new SignInPage(page);

    await page.goto("/");
  });
  test("signin - happy flow", async ({ page }) => {
    await signInPage.openSignInForm();
    await signInPage.completeSignInForm(
      signInData.validUser.email,
      signInData.validUser.password,
    );
    await signInPage.clickSignInButton();

    await expect(page).toHaveURL("/");
    await expect(signInPage.userProfileLink).toBeVisible();
  });

  test("signin - signin with invalid data", async ({ page }) => {
    await signInPage.openSignInForm();
    await signInPage.completeSignInForm(
      signInData.invalidUser.email,
      signInData.invalidUser.password,
    );
    await signInPage.clickSignInButton();

    await expect(signInPage.errorMessage).toBeVisible();
  });

  test("signin - signin with blank fields", async ({ page }) => {
    await signInPage.openSignInForm();
    await signInPage.completeSignInForm(
      signInData.blankFields.email,
      signInData.blankFields.password,
    );

    await expect(signInPage.signInButton).toBeDisabled();
  });
});
