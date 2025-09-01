import { cleanTitle, toTitleCase } from './strings';

describe('string utils', () => {
  it.each([
    ['test lowercase', 'Test Lowercase'],
    ['TEST UPPERCASE', 'Test Uppercase'],
    ['special* charact_ers', 'Special* Charact_ers'],
  ])('converts a string to title case', (value: string, expected: string) => {
    expect(toTitleCase(value)).toBe(expected);
  });

  it.each([
    ['test_one', 'Test One'],
    ['Test_two*', 'Test Two*'],
  ])(
    'converts string to title case and replace underscore with space',
    (value: string, expected: string) => {
      expect(cleanTitle(value)).toBe(expected);
    }
  );
});
