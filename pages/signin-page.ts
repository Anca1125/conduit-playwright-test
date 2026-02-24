import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignInPage extends BasePage {
  readonly signInLink: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  readonly userProfileLink: Locator;
  constructor(page: Page) {
    super(page);
    this.signInLink = page.getByRole("link", { name: "Sign in" });
    this.emailInput = page.locator('[placeholder="Email"]');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.signInButton = page.getByRole("button", { name: "Sign in" });
    this.userProfileLink = page.locator(".user-pic");
    this.errorMessage = page.locator(".error-messages");
  }

  async openSignInForm() {
    await this.signInLink.click();
  }
  async completeSignInForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }
  async clickSignInButton() {
    await this.signInButton.click();
  }
}
