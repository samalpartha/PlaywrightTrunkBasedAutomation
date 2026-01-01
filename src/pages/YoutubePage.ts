import { Page, Locator, expect } from '@playwright/test';
import { SmartLocator } from '../utils/SmartLocator';

export class YoutubePage {
    readonly page: Page;
    readonly searchInput: SmartLocator;
    readonly searchButton: SmartLocator;
    readonly videoResults: Locator;
    readonly shortsTab: Locator;
    readonly playerContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        // Use inclusive locators for stability
        this.searchInput = new SmartLocator(page, 'input[id="search"]', [
            'input[name="search_query"]',
            'input[placeholder="Search"]'
        ]);
        this.searchButton = new SmartLocator(page, 'button[aria-label="Search"]', [
            '#search-icon-legacy',
            'ytd-searchbox button',
            'button[id="search-icon-legacy"]'
        ]);
        this.videoResults = page.locator('ytd-video-renderer');
        this.shortsTab = page.locator('ytd-guide-entry-renderer a[title="Shorts"]');
        this.playerContainer = page.locator('#movie_player');
    }

    async navigate(): Promise<this> {
        await this.page.goto('https://www.youtube.com');
        return this;
    }

    async search(term: string): Promise<this> {
        await this.searchInput.fill(term);
        // Press Enter to search (more robust than clicking button)
        const input = await this.searchInput.resolve();
        await input.press('Enter');

        await this.page.waitForSelector('ytd-video-renderer', { state: 'visible' });
        return this;
    }

    async clickFirstVideo(): Promise<this> {
        await this.videoResults.first().locator('#video-title').click();
        return this;
    }

    async verifyPlayerLoaded(): Promise<this> {
        await expect(this.playerContainer).toBeVisible();
        return this;
    }
}
