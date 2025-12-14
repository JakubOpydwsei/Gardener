import { Locator, Page } from "@playwright/test";


export class PlantFiltersComponent {
    readonly flowering: Locator;
    readonly lifespan: Locator;
    readonly planting: Locator;
    readonly soil: Locator;
    readonly toxicity: Locator;

    constructor(page: Page) {
        this.flowering = page.getByTestId("filter-flowering");
        this.lifespan = page.getByTestId("filter-lifespan");
        this.planting = page.getByTestId("filter-planting");
        this.soil = page.getByTestId("filter-soil");
        this.toxicity = page.getByTestId("filter-toxicity");
    }

    async toggleFirstFlowering() {
        await this.flowering.locator('input[type="checkbox"]').first().click();
    }

    // reszta
}
