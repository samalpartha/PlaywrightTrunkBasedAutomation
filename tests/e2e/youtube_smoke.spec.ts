import { test, expect } from '@playwright/test';
import { YoutubePage } from '../../src/pages/YoutubePage';
import { FeatureToggle, Features } from '../../src/utils/FeatureToggle';
import { addTestMetadata } from './reporting';

test.describe('YouTube Smoke Tests (TBD)', () => {

    test('Homepage should load successfully', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team YouTube',
            severity: 'blocker',
            tags: ['smoke', 'homepage'],
            description: 'Verifies that YouTube homepage loads correctly.'
        });
        const ytInfo = new YoutubePage(page);
        await ytInfo.navigate();
        await expect(page).toHaveTitle(/YouTube/);
    });

    test('Search functionality should return results', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team YouTube',
            severity: 'critical',
            tags: ['search', 'core'],
            description: 'Verifies that search returns video results.'
        });
        const ytInfo = new YoutubePage(page);
        await ytInfo.navigate();
        await ytInfo.search('Playwright Automation');
        await expect(ytInfo.videoResults.first()).toBeVisible();
    });

    test('Video Playback - Player loads', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team Media',
            severity: 'critical',
            tags: ['playback', 'core'],
            description: 'Verifies that a selected video loads the player.'
        });
        const ytInfo = new YoutubePage(page);
        await ytInfo.navigate();
        await ytInfo.search('Playwright Testing');
        await ytInfo.clickFirstVideo();
        await ytInfo.verifyPlayerLoaded();
    });

    // TRUNK BASED DEVELOPMENT: Gated Feature
    test('Shorts Tab Navigation (Experimental)', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team Shorts',
            severity: 'minor',
            tags: ['experimental'],
            description: 'Verifies navigation to the Shorts tab when enabled.'
        });
        test.skip(!FeatureToggle.isEnabled(Features.YOUTUBE_SHORTS), 'Shorts feature is disabled in this environment');

        const ytInfo = new YoutubePage(page);
        await ytInfo.navigate();
        await ytInfo.shortsTab.click();
        await expect(page).toHaveURL(/shorts/);
    });
});
