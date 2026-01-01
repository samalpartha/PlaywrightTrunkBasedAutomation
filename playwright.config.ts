import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables (optional, for local .env file)
// dotenv.config();

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ['html'],
        ['allure-playwright', { outputFolder: 'allure-results' }]
    ],
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        baseURL: 'https://www.saucedemo.com',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
