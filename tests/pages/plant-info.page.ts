import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class PlantInfoPage extends BasePage {
    readonly loading: Locator;
    readonly name: Locator;
    readonly latinName: Locator;
    readonly image: Locator;
    readonly careDescripton: Locator;
    readonly timeline: Locator;
    readonly stats: Locator;

    constructor(page: Page) {
        super(page);

        this.loading = page.getByTestId("plant-details-loading");
        this.name = page.getByTestId("plant-details-name");
        this.latinName = page.getByTestId("plant-details-latin-name");
        this.image = page.getByTestId("plant-details-image");
        this.careDescripton = page.getByTestId("plant-details-care");
        this.timeline = page.getByTestId("plant-details-timeline");
        this.stats = page.getByTestId("plant-details-stats");
    }

    async waitForLoad() {
        await this.name.waitFor();
    }

    async isLoaded() {
        return this.name.isVisible();
    }

}