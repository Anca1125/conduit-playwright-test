import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AddNewArticlePage extends BasePage {
  readonly newArticleLink: Locator;
  readonly articleTitleInput: Locator;
  readonly articleDescriptionInput: Locator;
  readonly articleTextBodyInput: Locator;
  readonly articleTagsInput: Locator;
  readonly publishArticleButton: Locator;

  constructor(page: Page) {
    super(page);

    this.newArticleLink = page.getByRole("link", { name: "New Article" });
    this.articleTitleInput = page.locator('[placeholder="Article Title"]');
    this.articleDescriptionInput = page.locator(
      '[formcontrolname="description"]',
    );
    this.articleTextBodyInput = page.locator('[formcontrolname="body"]');
    this.articleTagsInput = page.locator('[placeholder="Enter tags"]');
    this.publishArticleButton = page.getByRole("button", {
      name: "Publish Article",
    });
  }

  async openNewArticleLink() {
    await this.newArticleLink.click();
  }
  async completeArticleTitle(title: string) {
    await this.articleTitleInput.fill(title);
  }
  async completeArticleDescription(description: string) {
    await this.articleDescriptionInput.fill(description);
  }
  async completeArticleTextBody(textbody: string) {
    await this.articleTextBodyInput.fill(textbody);
  }
  async completeTagsArticle(tags: string) {
    await this.articleTagsInput.fill(tags);
  }
  async publishArticle() {
    await this.publishArticleButton.click();
  }
}
