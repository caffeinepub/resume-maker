/**
 * Shared Skills helpers for parsing, formatting, and normalizing skills data.
 */

/**
 * Parse comma-separated skills input into a trimmed string array.
 * Handles extra spaces, trailing commas, and empty items.
 */
export function parseSkills(input: string): string[] {
  return input
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Format a skills array back into a comma-and-space separated string for textarea rendering.
 */
export function formatSkills(skills: string[]): string {
  return skills.join(', ');
}

/**
 * Normalize unknown persisted values into a string[].
 * Handles legacy formats:
 * - Single string: "JavaScript, React" → ["JavaScript", "React"]
 * - Array with comma-separated items: ["JavaScript, React", "Python"] → ["JavaScript", "React", "Python"]
 * - Mixed formats and empty items
 */
export function normalizeSkills(skills: unknown): string[] {
  if (Array.isArray(skills)) {
    // Flatten array items that may contain comma-separated strings
    const flattened: string[] = [];
    for (const item of skills) {
      if (typeof item === 'string' && item.trim().length > 0) {
        // Split by comma in case legacy data has "JavaScript, React" as single item
        const parsed = parseSkills(item);
        flattened.push(...parsed);
      }
    }
    // Deduplicate while preserving order
    return Array.from(new Set(flattened));
  }
  if (typeof skills === 'string') {
    return parseSkills(skills);
  }
  return [];
}
