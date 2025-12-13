import { Locator } from '@playwright/test';

export class PlantCardComponent {
    readonly root: Locator;
    readonly cardTitle: Locator;
    readonly detailsButton: Locator;

    constructor(card: Locator) {
        this.root = card;
        this.cardTitle = this.root.getByTestId("card-title");
        this.detailsButton = this.root.getByTestId("plant-details-button");
    }

    async getName() {
        return this.cardTitle.textContent();
    }

    async clickCard() {
        await this.root.click();
    }

    async openDetails() {
        await this.detailsButton.waitFor({ state: 'attached' });
        await this.detailsButton.scrollIntoViewIfNeeded();
        await this.detailsButton.click();
    }
}
