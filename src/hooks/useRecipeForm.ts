import { useState } from 'react';
import { hasLength, isInRange, isNotEmpty, matches, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { createRecipe, updateRecipe } from '@/api/recipes';
import { RecipeFormValues } from '@/types/recipe';
import { sanitiseForInsert } from '@/utils/sanitiseForRecipeInsert';
import { matchIfExists, urlRegex } from '@/utils/validation';

export function useRecipeForm(
  onSuccess: () => void,
  close: () => void,
  mode: 'create' | 'edit' = 'create',
  recipeId?: string
) {
  const [selectedCuisineIds, setSelectedCuisineIds] = useState<string[]>([]);

  const form = useForm<RecipeFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      description: '',
      ingredients: [],
      instructions: '',
      cuisine: [],
      commonCarbohydrate: '',
      prepTimeMinutes: 0,
      servings: 1,
      imageUrl: '',
      recipeUrl: '',
    },
    validate: {
      title: isNotEmpty('Title cannot be empty'),
      description: isNotEmpty('Description cannot be empty'),
      cuisine: hasLength({ min: 1, max: 3 }, 'Cuisine must have been 1 and 3 values selected'),
      prepTimeMinutes: isInRange({ min: 1 }, 'Value must be greater than 0'),
      servings: isInRange({ min: 1 }, 'Value must be greater than 0'),
      imageUrl: matchIfExists(urlRegex, 'Website address must be valid if entered'),
      recipeUrl: matches(urlRegex, 'Website address must be valid'),
    },
  });

  async function handleSubmit(values: RecipeFormValues) {
    try {
      const payload = sanitiseForInsert(values);
      if (mode === 'create') {
        await createRecipe(payload, selectedCuisineIds);
        notifications.show({
          title: 'Recipe created successfully!',
          color: 'green',
          message: `Your recipe has been added to the database.`,
        });
      } else if (mode === 'edit' && recipeId) {
        await updateRecipe(payload, recipeId, selectedCuisineIds);
        notifications.show({
          title: 'Recipe updated successfully!',
          color: 'green',
          message: `Your recipe has been updated.`,
        });
      }

      onSuccess();
      form.reset();
      form.setFieldValue('ingredients', []); // Isn't being reset correctly (keeps empty object instead of null)
      setSelectedCuisineIds([]);
      close();
    } catch (error: any) {
      notifications.show({
        title: mode === 'create' ? 'Recipe creation failed.' : 'Recipe update failed.',
        color: 'red',
        message: error.message,
      });
    }
  }

  return { form, selectedCuisineIds, setSelectedCuisineIds, handleSubmit };
}
