import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { YoutubePage } from '../../src/pages/YoutubePage';

test.describe('Visual & Accessibility Tests', () => {

    test('Homepage should be accessible (WCAG 2.1 AA)', async ({ page }) => {
        const youtube = new YoutubePage(page);
        await youtube.navigate();

        // Analyze page using Axe
        const accessibilityScanResults = await new AxeBuilder({ page })
            .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .analyze();

        // Expect 0 violations
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Homepage should match visual snapshot', async ({ page }) => {
        const youtube = new YoutubePage(page);
        await youtube.navigate();

        // Wait for usage stability using our SmartLocator 
        // (Ensuring search input is visible before snapping)
        await youtube.searchInput.resolve();

        // Take snapshot and compare to baseline
        // Note: First run will fail and create the baseline.
        await expect(page).toHaveScreenshot('homepage.png', {
            maxDiffPixels: 100 // Allow tiny rendering diffs
        });
    });
});
