import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly signUpLink: Locator;
  readonly signInLink: Locator;
  constructor(page: Page) {
    super(page);
    this.signUpLink = page.getByRole("link", { name: "Sign up" });
    this.signInLink = page.getByRole("link", { name: "Sign in" });
  }
  async navigate() {
    await this.navigateTo("/");
  }
  async verifyHomePageLoaded() {
    await expect(this.signInLink).toBeVisible();
    await expect(this.signUpLink).toBeVisible();
  }
}
