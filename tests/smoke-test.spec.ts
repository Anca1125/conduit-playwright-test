import { test } from "@playwright/test";
import { HomePage } from "../pages/home-page";

test.describe("homepage smoke test", () => {
  test("verify if the page is loaded successfully", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await homePage.verifyHomePageLoaded();
  });
});
