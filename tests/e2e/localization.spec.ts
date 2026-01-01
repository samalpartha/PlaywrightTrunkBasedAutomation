import { test, expect } from '@playwright/test';
import { PseudoLocalizer } from '../../src/utils/PseudoLocalizer';
import { addTestMetadata } from './reporting';

test.describe('Localization & Internationalization (Chapter 14)', () => {

    test('Unicode Character Handling - Search Input', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team Globalization',
            severity: 'critical',
            tags: ['i18n', 'unicode'],
            description: 'Verifies input fields handle mixed Unicode scripts correctly.'
        });

        const testStrings = {
            cyrillic: 'Привет мир', // Hello World (Russian)
            arabic: 'مرحبا بالعالم', // Hello World (Arabic)
            cjk: '你好世界',       // Hello World (Chinese)
            emoji: '🌍🚀✨'        // Emojis
        };

        await page.goto('/');

        // Test loop for different scripts
        for (const [script, text] of Object.entries(testStrings)) {
            await test.step(`Verify ${script} input`, async () => {
                const searchInput = page.locator('[data-test="username"]'); // Using username as proxy for text input
                await searchInput.fill(text);
                await expect(searchInput).toHaveValue(text);
            });
        }
    });

    test('Pseudo-localization - Visual Check', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team Globalization',
            severity: 'normal',
            tags: ['l10n', 'visual'],
            description: 'Injects pseudo-localized text to check for layout breaks.'
        });

        const originalText = "standard_user";
        const pseudoText = PseudoLocalizer.transform(originalText);

        console.log(`Testing with pseudo-localized string: ${pseudoText}`);

        await page.goto('/');
        const usernameInput = page.locator('[data-test="username"]');
        await usernameInput.fill(pseudoText);

        // In a real scenario, we would assert that the UI didn't break (overflow/overlap).
        // Here we verify the input accepts the extended char set.
        await expect(usernameInput).toHaveValue(pseudoText);
    });

    // Validates Date/Number formatting if the app supports it.
    // Start with German locale to test handling.
    test.use({ locale: 'de-DE' });
    test('Locale-aware formatting (Emulated DE)', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team Globalization',
            severity: 'minor',
            tags: ['l10n', 'formatting'],
            description: 'Verifies browser sends correct locale headers.'
        });

        await page.goto('/');

        // Verify browser context is set to German
        const locale = await page.evaluate(() => navigator.language);
        expect(locale).toBe('de-DE');

        // Check date formatting in browser console/context
        const dateTest = await page.evaluate(() => new Date('2024-01-15').toLocaleDateString());
        // Germany uses DD.MM.YYYY usually, depends on browser engine but typically 15.1.2024 or 15.01.2024
        expect(dateTest).toMatch(/15\.\d{1,2}\.2024/);
    });
});
