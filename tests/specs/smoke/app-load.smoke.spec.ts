import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/home.page";

test("@smoke-01 home page loads correctly", async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await expect(homePage.welcomeText).toBeVisible();
    await expect(homePage.quote).toBeVisible();
});
