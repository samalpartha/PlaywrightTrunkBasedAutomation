export class FeatureToggle {
    static isEnabled(featureName: string): boolean {
        // Reads from environment variables
        // In a real TBD system, this might fetch from a remote config service (LaunchDarkly, Split.io)
        return process.env[featureName] === 'true';
    }
}

export const Features = {
    NEW_CHECKOUT_FLOW: 'FEATURE_NEW_CHECKOUT',
    DARK_MODE: 'FEATURE_DARK_MODE',
    YOUTUBE_SHORTS: 'FEATURE_YOUTUBE_SHORTS'
};
