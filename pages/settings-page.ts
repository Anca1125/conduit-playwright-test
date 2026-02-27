import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SettingsPage extends BasePage {
  readonly userProfile: Locator;
  readonly myPosts: Locator;
  readonly favoritedPosts: Locator;
  readonly editProfileSettings: Locator;
  readonly settingsUrlOfProfilePicture: Locator;
  readonly settingsUsernameInput: Locator;
  readonly settingsShortBioAboutYou: Locator;
  readonly settingsEmailInput: Locator;
  readonly settingsNewPassword: Locator;
  readonly settingsUpdateSettings: Locator;
  readonly logout: Locator;

  constructor(page: Page) {
    super(page);
    this.userProfile = page.locator(".user-pic");
    this.myPosts = page.getByText(" My Posts ");
    this.favoritedPosts = page.getByRole("link", { name: " Favorited Posts " });
    this.editProfileSettings = page.locator(".ion-gear-a");
    this.settingsUrlOfProfilePicture = page.locator(
      '[placeholder="URL of profile picture"]',
    );
    this.settingsUsernameInput = page.locator('[placeholder="Username"]');
    this.settingsShortBioAboutYou = page.locator(
      '[placeholder="Short bio about you"]',
    );
    this.settingsEmailInput = page.locator('[placeholder="Email"]');
    this.settingsNewPassword = page.locator('[placeholder="New Password"]');
    this.settingsUpdateSettings = page.getByRole("button", {
      name: "Update Settings",
    });
    //this.logout = page.getByText("Or click here to logout.");
    this.logout = page.locator(".btn-outline-danger");
  }
  async clickOnUserProfile() {
    await this.userProfile.click();
  }
  async clickOnMyPosts() {
    await this.myPosts.click();
  }
  async clickOnfavoritedPosts() {
    await this.favoritedPosts.click();
  }
  async clickAndEditProfileSettings(
    urlOfPicture: string,
    username: string,
    shortBio: string,
    email: string,
    newPassword: string,
  ) {
    await this.editProfileSettings.click();
    await this.settingsUrlOfProfilePicture.fill(urlOfPicture);
    await this.settingsUsernameInput.fill(username);
    await this.settingsShortBioAboutYou.fill(shortBio);
    await this.settingsEmailInput.fill(email);
    await this.settingsNewPassword.fill(newPassword);
  }
  async clickUpdateSettings() {
    await this.settingsUpdateSettings.click();
  }
  async logoutUser() {
    this.logout.click();
  }
}
