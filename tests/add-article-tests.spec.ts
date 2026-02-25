import { test, expect } from "@playwright/test";
import { AddNewArticlePage } from "../pages/add-article-page";
import { NewArticlePage } from "../pages/new-article-page";
import { SignInPage } from "../pages/signin-page";
import { signInData } from "../test-data/signin-data";

test.describe("new article", () => {
  let addNewArticlePage: AddNewArticlePage;
  let newArticlePage: NewArticlePage;
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    addNewArticlePage = new AddNewArticlePage(page);
    newArticlePage = new NewArticlePage(page);
    const signInPage = new SignInPage(page);

    await signInPage.openSignInForm();
    await signInPage.completeSignInForm(
      signInData.validUser.email,
      signInData.validUser.password,
    );
    await signInPage.clickSignInButton();

    await expect(page).toHaveURL("/");
    await expect(signInPage.userProfileLink).toBeVisible();
  });

  test("user is able to add a new article", async ({ page }) => {
    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle("Playwright");
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(addNewArticlePage.articleTitleInput).toBeVisible();
  });
  test("user is able to write and post a comment", async ({ page }) => {
    await addNewArticlePage.openNewArticleLink();
    await addNewArticlePage.completeArticleTitle("Playwright");
    await addNewArticlePage.completeArticleDescription("About Playwright");
    await addNewArticlePage.completeArticleTextBody(
      "Playwright is an amaizing automation tool",
    );
    await addNewArticlePage.completeTagsArticle("Playwright");
    await addNewArticlePage.publishArticle();

    await expect(addNewArticlePage.articleTitleInput).toBeVisible();
    await newArticlePage.AddAComment("Playwright is more than awesome!");
    await newArticlePage.postTheComment();
  });
});
