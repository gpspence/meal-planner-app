import { useForm, hasLength, isInRange, isNotEmpty, matches } from '@mantine/form';
import { urlRegex, matchIfExists } from '@/utils/validation';
import { sanitiseForInsert } from '@/utils/sanitiseForRecipeInsert';
import { RecipeFormValues } from '@/types/recipeForm';
import { useState } from 'react';
import { createRecipe } from '@/api/recipes';
import { notifications } from '@mantine/notifications';

export function useRecipeForm(onRecipeCreated: () => void, close: () => void) {
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
            recipeUrl: ''
        },
        validate: {
            title: isNotEmpty('Title cannot be empty'),
            description: isNotEmpty('Description cannot be empty'),
            cuisine: hasLength({ min: 1 }, 'Cuisine cannot be empty'),
            prepTimeMinutes: isInRange({ min: 1 }, 'Value must be greater than 0'),
            servings: isInRange({ min: 1 }, 'Value must be greater than 0'),
            imageUrl: matchIfExists(urlRegex, "Website address must be valid if entered"),
            recipeUrl: matches(urlRegex, "Website address must be valid")
        }
    });

    async function handleSubmit(values: RecipeFormValues) {
        try {
            const toInsert = sanitiseForInsert(values)
            await createRecipe(toInsert, selectedCuisineIds);
            notifications.show({
                title: 'Recipe Created Successfully!',
                color: 'green',
                message: `Your recipe has been added to the database.`
            });
            onRecipeCreated();
            form.reset();
            form.setFieldValue('ingredients', []);  // Isn't being reset correctly (keeps empty object instead of null)
            setSelectedCuisineIds([])
            close();
        } catch (error: any) {
            notifications.show({
                title: 'Recipe Creation Failed.',
                color: 'red',
                message: `Failed to create recipe. ${error.message}`
            });
        }
    }

    return { form, selectedCuisineIds, setSelectedCuisineIds, handleSubmit }
}