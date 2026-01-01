# Playwright Trunk Based Development Demo

This project demonstrates how to use **Playwright (TypeScript)** in a **Trunk Based Development** workflow.

## Key Concepts
1.  **Feature Toggles**: Code for new features exists in `main` but is disabled by default.
2.  **Conditional Tests**: Tests for new features are skipped unless the specific flag is enabled.
3.  **Fast Feedback**: Tests run in parallel.

## Setup
```bash
npm install
npx playwright install
```

## Running Tests

### 1. Unit Tests (Jest)
Runs fast, isolated logic tests (e.g., FeatureToggle).
```bash
npm run test:unit
```

### 2. Standard E2E (Playwright)
Runs the stable end-to-end suite.
```bash
npm run test:e2e
```

### 3. Feature Preview
Runs E2E with flags enabled.
```bash
npm run test:feature
```

### 3. YouTube Smoke Tests
Runs the YouTube smoke suite.
```bash
npm run test:youtube
```

### 4. YouTube Experimental (Shorts)
Runs the YouTube suite INCLUDING the shorts test.
```bash
npm run test:youtube:shorts
```

### 4. Visual & Accessibility
Runs snapshot comparison and WCAG audit.
```bash
npx playwright test visual_a11y.spec.ts
```
*   **Note**: First visual run will fail. Run with `--update-snapshots` to generate baseline.

## Key Features
*   **Trunk Based Development**: Feature Toggles (`FeatureToggle.ts`) control active code paths.
*   **Auto-Healing**: `SmartLocator.ts` automatically retries backup selectors if the primary one fails.
*   **Visual Regression**: Pixel-perfect layout verification.
*   **Accessibility (A11y)**: Automated WCAG 2.1 AA audits via `axe-core`.
*   **Fail-Fast CI/CD**: Unit tests run before E2E tests in GitHub Actions.
*   **Allure Reporting**: Rich HTML test reports.

## Project Structure
*   `tests/e2e/visual_a11y.spec.ts`: Visual/A11y tests.
*   `tests/e2e/youtube_smoke.spec.ts`: YouTube.com smoke tests.
*   `src/pages/YoutubePage.ts`: YouTube POM using `SmartLocator`.
*   `.github/workflows`: CI pipeline uploading Allure artifacts.

## Reporting
Generate Allure report locally (runs tests + generates report):
```bash
npm run test:report
```

Or manually:
```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```
