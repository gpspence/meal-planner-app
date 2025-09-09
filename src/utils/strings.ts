/**
 * Convert a string to title case.
 * @param str - value to process.
 * @returns string in title case.
 * @example toTitleCase("test example")  // returns "Test Example"
 */
export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

/**
 * Clean a string and convert to title case.
 * @param title - value to clean
 * @returns string in title case with all underscores replaced with space.
 * @remarks Used to clean api property names to use as column titles
 * @example cleanTitle("test_example")  // returns "Test Example"
 */
export function cleanTitle(title: string): string {
  return toTitleCase(title.replaceAll('_', ' '));
}
