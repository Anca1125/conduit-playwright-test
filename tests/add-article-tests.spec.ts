import { test, expect } from "@playwright/test";
import { AddNewArticlePage } from "../pages/add-article-page";
import { NewArticlePage } from "../pages/new-article-page";
import { SignInPage } from "../pages/signin-page";
import { signInData } from "../test-data/signin-data";
import { createUserAndLogin } from "../utils/auth-helper";

test.describe("new article", () => {
  let addNewArticlePage: AddNewArticlePage;
  let newArticlePage: NewArticlePage;
  test.beforeEach(async ({ page }) => {
    await createUserAndLogin(page);

    addNewArticlePage = new AddNewArticlePage(page);
    newArticlePage = new NewArticlePage(page);
  });

  test("user is able to add a new article", async ({ page }) => {
    const uniqueTitle = `Playwright${Date.now()}`;

    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle(uniqueTitle);
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(page).toHaveURL(/article/);
  });
  test("user is able to write and post a comment", async ({ page }) => {
    const uniqueTitle = `Playwright ${Date.now()}`;

    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle(uniqueTitle);
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(page).toHaveURL(/article/);

    await newArticlePage.AddAComment("Playwright is more than awesome!");
    await newArticlePage.postTheComment();

    await expect(
      page.getByText("Playwright is more than awesome!"),
    ).toBeVisible();
  });
  test("user is able to edit the article", async ({ page }) => {
    const uniqueTitle = `Playwright ${Date.now()}`;

    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle(uniqueTitle);
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(page).toHaveURL(/article/);

    await newArticlePage.editAnArticle();
    await addNewArticlePage.completeArticleDescription(
      "About Playwright and automation tools",
    );
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing and useful automation tool",
    );
    await addNewArticlePage.publishArticle();

    await expect(page.locator(".row.article-content")).toHaveText(
      "Playwright is an amaizing and useful automation tool",
    );
  });
  test("user is able to delete the article", async ({ page }) => {
    const uniqueTitle = `Playwright ${Date.now()}`;

    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle(uniqueTitle);
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(page).toHaveURL(/article/);

    await newArticlePage.deleteAnArticle();

    await expect(page).toHaveURL("/");
  });
  test("user is able to like the article", async ({ page }) => {
    const uniqueTitle = `Playwright ${Date.now()}`;

    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle(uniqueTitle);
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(page).toHaveURL(/article/);

    await page.getByText("Home").click();

    await newArticlePage.giveAHeartForTheArticle();

    await expect(newArticlePage.likeTheArticle).toHaveCount(1);
  });
});
