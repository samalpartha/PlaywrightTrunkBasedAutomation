import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { FeatureToggle, Features } from '../../src/utils/FeatureToggle';
import { addTestMetadata } from './reporting';

test.describe('Sauce Demo Tests (TBD Demo)', () => {

    test('Standard Login Flow - Always runs', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team A',
            severity: 'critical',
            tags: ['smoke', 'login'],
            description: 'Verifies the standard user login flow.'
        });
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory\.html/);
    });

    // TRUNK BASED DEVELOPMENT PATTERN:
    // This test exists in the main branch but only runs when the feature flag is ON.
    // This allows developers to merge incomplete or experimental code safely.
    test('New Checkout Flow - Conditional', async ({ page }) => {
        await addTestMetadata({
            owner: 'Team Checkout',
            severity: 'normal',
            tags: ['experimental', 'feature-flag'],
            description: 'Verifies the new checkout flow when enabled.'
        });
        // Skip if feature is not enabled
        test.skip(!FeatureToggle.isEnabled(Features.NEW_CHECKOUT_FLOW), 'Feature NEW_CHECKOUT is disabled');

        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');

        // Hypothetical new feature interactions
        console.log('Running New Checkout Flow...');
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();
        await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
});
