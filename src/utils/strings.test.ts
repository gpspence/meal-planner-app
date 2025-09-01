import { cleanTitle, toTitleCase } from './strings';

describe('string utils', () => {
  it.each([['test lowercase', 'Test Lowercase']])(
    'converts a string to title case',
    (value: string, expected: string) => {
      const result = toTitleCase(value);
      expect(result).toBe(expected);
    }
  );
});
