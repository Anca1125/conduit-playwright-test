import { Page, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signup-page";

export async function createUserAndLogin(page: Page) {
  const signUpPage = new SignUpPage(page);

  const uniqueUsername = `qaUser${Date.now()}`;
  const uniqueEmail = `qa${Date.now()}@test.com`;
  const password = "QaTest123!";

  await page.goto("/");
  await signUpPage.openSignUpForm();
  await signUpPage.fillSignUpForm(uniqueUsername, uniqueEmail, password);
  await signUpPage.clickSignUpButton();

  await expect(page).toHaveURL("/");
  await expect(signUpPage.userProfileLink).toBeVisible();

  return {
    username: uniqueUsername,
    email: uniqueEmail,
    password,
  };
}
