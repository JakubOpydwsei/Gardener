import { test, expect } from "@playwright/test";
import { PlantPage } from "../../pages/plant.page";

test("@smoke-04 user can open plant details", async ({ page }) => {
  const plantPage = new PlantPage(page);

  await plantPage.open();
  await plantPage.waitForData();

  const card = plantPage.getPlantCardByName("Róża ogrodowa");
  await card.openDetails();

  await expect(page).toHaveURL(/plant/i);
  await expect(page.getByTestId("plant-details-name")).toBeVisible();
});