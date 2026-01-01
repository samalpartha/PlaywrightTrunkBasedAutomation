import { FeatureToggle } from '../../src/utils/FeatureToggle';

describe('FeatureToggle Unit Tests', () => {

    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    test('should return true when feature flag is set to "true"', () => {
        process.env['FEATURE_TEST_FLAG'] = 'true';
        expect(FeatureToggle.isEnabled('FEATURE_TEST_FLAG')).toBe(true);
    });

    test('should return false when feature flag is set to "false"', () => {
        process.env['FEATURE_TEST_FLAG'] = 'false';
        expect(FeatureToggle.isEnabled('FEATURE_TEST_FLAG')).toBe(false);
    });

    test('should return false when feature flag is missing', () => {
        delete process.env['FEATURE_TEST_FLAG'];
        expect(FeatureToggle.isEnabled('FEATURE_TEST_FLAG')).toBe(false);
    });
});
