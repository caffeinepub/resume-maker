/**
 * Shared helpers for parsing, formatting, and normalizing certifications data.
 */

/**
 * Parse multiline certifications input into an array of non-empty trimmed strings.
 * Each line becomes a separate certification.
 * @param text - Raw textarea value with newline-separated certifications
 * @returns Array of trimmed, non-empty certification strings
 */
export function parseCertifications(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

/**
 * Format certifications array back into newline-delimited textarea value.
 * Canonical one-per-line rendering for the editor.
 * @param certifications - Array of certification strings
 * @returns Newline-joined string for textarea display
 */
export function formatCertifications(certifications: string[]): string {
  return certifications.join('\n');
}

/**
 * Normalize certifications data to handle legacy formats and ensure clean array.
 * Filters out empty/whitespace-only entries while preserving order.
 * @param certifications - Raw certifications data (may be array or other format)
 * @returns Clean array of non-empty trimmed certification strings
 */
export function normalizeCertifications(certifications: string[] | unknown): string[] {
  if (!Array.isArray(certifications)) {
    return [];
  }
  
  return certifications
    .map((cert) => (typeof cert === 'string' ? cert.trim() : ''))
    .filter((cert) => cert.length > 0);
}
