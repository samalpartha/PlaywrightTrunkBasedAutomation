import { Page, Locator, expect } from '@playwright/test';

/**
 * SmartLocator: Enables Auto-Healing capabilities.
 * It accepts a primary selector and a list of backup selectors.
 * If the primary fails, it attempts to "heal" by trying backups.
 */
export class SmartLocator {
    readonly page: Page;
    readonly primarySelector: string;
    readonly backupSelectors: string[];

    constructor(page: Page, primary: string, backups: string[] = []) {
        this.page = page;
        this.primarySelector = primary;
        this.backupSelectors = backups;
    }

    /**
     * Finds the first working locator from the list (Primary -> Backups)
     */
    async resolve(): Promise<Locator> {
        // 1. Try Primary
        try {
            const loc = this.page.locator(this.primarySelector);
            await loc.waitFor({ state: 'visible', timeout: 2000 }); // Fast fail
            return loc;
        } catch (e) {
            console.warn(`Primary selector '${this.primarySelector}' failed. Attempting auto-healing...`);
        }

        // 2. Try Backups
        for (const backup of this.backupSelectors) {
            try {
                const loc = this.page.locator(backup);
                await loc.waitFor({ state: 'visible', timeout: 2000 });
                console.info(`Auto-healed using backup selector: '${backup}'`);
                // Optional: Log this healing event to a file or report
                return loc;
            } catch (e) {
                // Continue to next backup
            }
        }

        throw new Error(`SmartLocator failed. Primary: ${this.primarySelector}, Backups: ${this.backupSelectors.join(', ')}`);
    }

    // Proxy methods for common actions
    async click() {
        const locator = await this.resolve();
        await locator.click();
    }

    async fill(value: string) {
        const locator = await this.resolve();
        await locator.fill(value);
    }
}
