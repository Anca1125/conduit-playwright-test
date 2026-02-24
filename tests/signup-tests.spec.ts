import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signup-page";
import { signUpData } from "../test-data/signUp-data";

test.describe("signup flow", () => {
  let signUpPage: SignUpPage;

  test.beforeEach(async ({ page }) => {
    signUpPage = new SignUpPage(page);
    await page.goto("/");
  });
  test("sign up - happy flow", async ({ page }) => {
    const randomUserName = `Misu${Date.now()}I`;
    const randomEmail = `misu${Date.now()}@test.com`;

    await signUpPage.openSignUpForm();
    await signUpPage.fillSignUpForm(
      randomUserName,
      randomEmail,
      signUpData.validUser.password,
    );
    await signUpPage.clickSignUpButton();

    await expect(page).toHaveURL("/");
    await expect(signUpPage.userProfileLink).toBeVisible();
  });

  test("sign up - invalid data(email)", async ({ page }) => {
    await signUpPage.openSignUpForm();
    await signUpPage.fillSignUpForm(
      signUpData.invalidUser.username,
      signUpData.invalidUser.email,
      signUpData.invalidUser.password,
    );
    await signUpPage.clickSignUpButton();

    await expect(signUpPage.errorMessage).toBeVisible();
  });
  test("sign up - blanck fields", async ({ page }) => {
    await signUpPage.openSignUpForm();
    await signUpPage.fillSignUpForm(
      signUpData.blankFields.username,
      signUpData.blankFields.email,
      signUpData.blankFields.password,
    );

    await expect(signUpPage.signUpSubmitButton).toBeDisabled();
  });

  test("sign up - data already used", async ({ page }) => {
    await signUpPage.openSignUpForm();
    await signUpPage.fillSignUpForm(
      signUpData.dataAlreadyUsed.username,
      signUpData.dataAlreadyUsed.email,
      signUpData.dataAlreadyUsed.password,
    );
    await signUpPage.clickSignUpButton();

    await expect(signUpPage.errorMessage).toBeVisible();
  });
});
