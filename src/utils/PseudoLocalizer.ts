/**
 * PseudoLocalizer Utility
 * Simulates localization by transforming strings with accented characters
 * and extending length to mimic text expansion (common in German/French).
 */
export class PseudoLocalizer {

    private static charMap: { [key: string]: string } = {
        'a': 'á', 'A': 'Á', 'e': 'é', 'E': 'É',
        'i': 'í', 'I': 'Í', 'o': 'ó', 'O': 'Ó',
        'u': 'ú', 'U': 'Ú', 'c': 'ç', 'C': 'Ç',
        'n': 'ñ', 'N': 'Ñ', 'y': 'ý', 'Y': 'Ý'
    };

    /**
     * Transforms text into pseudo-localized format.
     * Example: "Account" -> "[Áccóúñt !!!]"
     * @param text Original string
     * @param expansionFactor Factor to extend string length (default 1.3 or 30%)
     */
    static transform(text: string, expansionFactor: number = 1.3): string {
        const transformed = text.split('').map(char => this.charMap[char] || char).join('');

        // Calculate padding for expansion
        const targetLength = Math.ceil(text.length * expansionFactor);
        const paddingLength = Math.max(0, targetLength - text.length);
        const padding = '!'.repeat(paddingLength);

        return `[${transformed} ${padding}]`;
    }
}
