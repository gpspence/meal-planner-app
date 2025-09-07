import { NewRecipe, RecipeFormValues } from '@/types/recipe';

/**
 * Apply data sanitisation to RecipeFormValues, on top of Mantine validation
 * @param values - fields entered into addRecipeModal form
 * @returns - NewRecipe withcleaned parameters and naming expected by Supabase
 */
export function sanitiseForInsert(values: RecipeFormValues): NewRecipe {
  return {
    title: values.title,
    description: values.description,
    prep_time_minutes: values.prepTimeMinutes!,
    servings: values.servings!,
    ingredients: values.ingredients ?? [],
    instructions: values.instructions,
    common_carbohydrate: values.commonCarbohydrate,
    image_url: values.imageUrl,
    recipe_url: values.recipeUrl,
  };
}
