import { test, expect } from "@playwright/test";
import { PlantPage } from "../../pages/plant.page";


test("@smoke-02 plants list loads", async ({ page }) => {
    const plantPage = new PlantPage(page);

    await plantPage.open();
    await plantPage.waitForData();

    await expect(plantPage.plantCards.first()).toBeVisible();
});

test("@smoke-03 plant card expands on click", async ({ page }) => {
    const plantPage = new PlantPage(page);

    await plantPage.open();
    await plantPage.waitForData();

    const card = plantPage.getPlantCardByName("Róża ogrodowa");
    await card.clickCard();

    await expect(
        card.root.getByTestId("plant-collapse-content")
    ).toBeVisible();
});