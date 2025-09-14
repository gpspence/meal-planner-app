import { Table } from '@mantine/core';
import { Json } from '@/types/database.types';
import {
  Ingredient,
  Recipe,
  RecipeCuisineWithName,
  RecipeInsert,
  RecipeWithCuisines,
} from '@/types/recipe';
import { cleanTitle } from '@/utils/strings';

/**
 * Check whether to display recipe properties (rows in table) based on whether
 * they are are not null or hidden.
 * @param key - recipe property field name, to check if the property is hidden.
 * @param value - property value to check if is null.
 * @returns boolean value of whether or not to display the property.
 */
function checkRow(key: string, value: unknown): boolean {
  const hiddenProps = ['id'];
  const isNotEmpty: boolean = !!value && (Array.isArray(value) ? value.length !== 0 : true);
  const isNotHidden: boolean = !hiddenProps.includes(key);
  return isNotEmpty && isNotHidden;
}

/**
 * Process a URL string to display by only displaying hostname and pathname.
 * @remarks Used to display URL on RecipeCards,
 * @param url - value to process.
 * @param withPath - whether to include the pathname, if available.
 * @returns formatted URL string to display.
 */
function formatUrlDisplay(url: string, withPath: boolean = false): string {
  try {
    const u = new URL(url);
    return withPath ? u.hostname + u.pathname : u.hostname;
  } catch {
    return url;
  }
}

/**
 * Dispatcher function for Recipe property string cleaning.
 * @param key - Recipe property name.
 * @param value - Recipe property value.
 * @returns Value with formatting applied, based on property type.
 */
function cleanStrings(key: string, value: string) {
  const urlProps = ['image_url', 'recipe_url'];
  const timeProps = ['created_at', 'updated_at'];
  if (urlProps.includes(key)) {
    const withPath = key === 'recipe_url';
    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {formatUrlDisplay(value, withPath)}
      </a>
    );
  } else if (timeProps.includes(key)) {
    return new Date(value).toLocaleString();
  }
  return value;
}

/**
 * Type guard for Ingredient.
 * @param value - apply type narrowing on value.
 * @returns Boolean, whether the value is the Ingredient type.
 */
const isIngredient = (value: any): value is Ingredient => !!value?.name;

/**
 * Concatenate ingredient properties into a single string for display.
 * @param ingredients Recipe `ingredients` property.
 * @returns Combined string containing details of all Recipe ingredients.
 */
function cleanIngredients(ingredients: Ingredient[]): string {
  return ingredients
    .map(({ name, note, unit, quantity }) =>
      [quantity, unit, name, note ? `${note}` : ''].filter(Boolean).join(' ')
    )
    .join('; ');
}

/**
 * Dispatcher function for cleaning all Recipe properties.
 * @param key Recipe property name.
 * @param value Recipe property value.
 * @returns cleaned property as a string or JSX link (for URL props)
 */
function cleanProps(key: string, value: string | Json) {
  if (value === null) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return cleanStrings(key, String(value));
  }
  if (
    key === 'ingredients' &&
    Array.isArray(value) &&
    value.every((elem) => isIngredient(elem as Ingredient))
  ) {
    return cleanIngredients(value as Ingredient[]);
  }
  if (key === 'recipe_cuisines') {
    const cuisineArray: string[] = (value as RecipeCuisineWithName[]).map((rc) => rc.cuisines.name);
    const cuisineString: string = cuisineArray.join(', ');
    return cuisineString;
  }
  return String(value); // fallback
}

/**
 * Apply validation and cleaning to all recipe titles and values, for display in overlay.
 * @param recipe - row in Recipe table to process
 * @returns Mantine table rows as <Table.Tr> element.
 */
export function useRecipeOverlay(recipe: RecipeWithCuisines) {
  const tableRows = Object.entries(recipe).map(([key, value]) =>
    checkRow(key, value) ? (
      <Table.Tr key={key}>
        <Table.Td style={{ fontWeight: 600 }}>{cleanTitle(String(key))}</Table.Td>
        <Table.Td>{cleanProps(key, value)}</Table.Td>
      </Table.Tr>
    ) : null
  );

  return { tableRows };
}

// For hard to reach test branches
export const __test__ = {
  cleanProps,
  formatUrlDisplay,
};
