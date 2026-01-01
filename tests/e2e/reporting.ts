import { allure } from 'allure-playwright';

/**
 * Helper to add metadata to Allure reports.
 * Usage:
 *    addTestMetadata({
 *        owner: 'Team A',
 *        severity: 'critical',
 *        tags: ['smoke', 'login']
 *    });
 */
export async function addTestMetadata(metadata: {
    owner?: string;
    severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
    tags?: string[];
    issue?: string;
    tms?: string;
    description?: string;
}) {
    if (metadata.owner) {
        await allure.label('owner', metadata.owner);
    }
    if (metadata.severity) {
        await allure.severity(metadata.severity);
    }
    if (metadata.tags) {
        for (const tag of metadata.tags) {
            await allure.tag(tag);
        }
    }
    if (metadata.issue) {
        await allure.issue('Issue', metadata.issue);
    }
    if (metadata.tms) {
        await allure.tms('TMS', metadata.tms);
    }
    if (metadata.description) {
        await allure.description(metadata.description);
    }
}
