import { NewRecipe, RecipeFormValues } from '@/types/recipe';

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
