import { test } from '@playwright/test';
import { YoutubePage } from '../../src/pages/YoutubePage';

test('Youtube Search (Fluent Interface)', async ({ page }) => {
    const youtube = new YoutubePage(page);

    // Fluent Chain: readable, self-documenting sequence
    await (await (await (await youtube
        .navigate())
        .search('Playwright Automation'))
        .clickFirstVideo())
        .verifyPlayerLoaded();
});
