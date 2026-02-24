import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
  readonly signUpLink: Locator;
  readonly userNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpSubmitButton: Locator;
  readonly errorMessage: Locator;
  readonly userProfileLink: Locator;
  constructor(page: Page) {
    super(page);

    this.signUpLink = page.getByRole("link", { name: "Sign up" });
    this.userNameInput = page.locator('[placeholder="Username"]');
    this.emailInput = page.locator('[placeholder="Email"]');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.signUpSubmitButton = page.getByRole("button", { name: " Sign up " });
    this.errorMessage = page.locator(".error-messages");
    //this.errorMessageFoDataAlreadyUsed = page.locator(".error-messages");

    this.userProfileLink = page.locator(".user-pic");
  }
  async openSignUpForm() {
    await this.signUpLink.click();
  }
  async fillSignUpForm(username: string, email: string, password: string) {
    await this.userNameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
  async clickSignUpButton() {
    await this.signUpSubmitButton.click();
  }
}
