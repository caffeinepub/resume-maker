export const actionVerbs = [
  'Spearheaded',
  'Optimized',
  'Architected',
  'Implemented',
  'Developed',
  'Designed',
  'Led',
  'Managed',
  'Coordinated',
  'Executed',
  'Achieved',
  'Improved',
  'Increased',
  'Reduced',
  'Streamlined',
  'Established',
  'Created',
  'Built',
  'Launched',
  'Delivered',
  'Collaborated',
  'Facilitated',
  'Analyzed',
  'Researched',
  'Evaluated',
  'Resolved',
  'Transformed',
  'Pioneered',
  'Accelerated',
  'Drove',
];

const weakPhrases = [
  'worked on',
  'responsible for',
  'helped with',
  'assisted in',
  'was involved in',
  'participated in',
  'contributed to',
];

export function applyActionVerb(text: string, verb: string): string {
  if (!text) return verb;

  const trimmedText = text.trim();
  const lowerText = trimmedText.toLowerCase();

  // Check if text starts with a weak phrase
  for (const phrase of weakPhrases) {
    if (lowerText.startsWith(phrase)) {
      // Replace the weak phrase with the action verb
      return verb + trimmedText.slice(phrase.length);
    }
  }

  // Check if text already starts with a verb (capitalized word)
  const firstWord = trimmedText.split(/\s+/)[0];
  if (firstWord && firstWord[0] === firstWord[0].toUpperCase()) {
    // Replace the first word
    return verb + trimmedText.slice(firstWord.length);
  }

  // Otherwise, prepend the verb
  return `${verb} ${trimmedText}`;
}
