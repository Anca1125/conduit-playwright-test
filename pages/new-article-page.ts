import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class NewArticlePage extends BasePage {
  readonly editArticle: Locator;
  readonly deleteArticle: Locator;
  readonly writeAComment: Locator;
  readonly postAcomment: Locator;

  constructor(page: Page) {
    super(page);
    this.editArticle = page.locator(".ion-edit");
    this.deleteArticle = page.locator(".ion-trash-a");
    this.writeAComment = page.locator('[placeholder="Write a comment..."]');
    this.postAcomment = page.locator('[type="submit"]');
  }
  async editAnArticle() {
    await this.editArticle.click();
  }
  async deleteAnArticle() {
    await this.deleteArticle.click();
  }
  async AddAComment(comment: string) {
    await this.writeAComment.fill(comment);
  }
  async postTheComment() {
    await this.postAcomment.click();
  }
}
