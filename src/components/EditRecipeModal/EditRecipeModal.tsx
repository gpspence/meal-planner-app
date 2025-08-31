import { useEffect, useState } from 'react';
import { Modal, Button, Stack } from '@mantine/core';
import { useRecipeForm } from '@/hooks/useRecipeForm';
import { supabase } from '@/supabaseClient';
import AddRecipeIngredients from '../AddRecipeIngredients/AddRecipeIngredients';
import RecipeBasicInfo from '../AddRecipeModal/RecipeBasicInfo';
import RecipeDetails from '../AddRecipeModal/RecipeDetails';
import RecipeLinks from '../AddRecipeModal/RecipeLinks';
import { Ingredient, RecipeWithCuisines } from '@/types/recipe';

type UpdateRecipeModalProps = {
    opened: boolean;
    close: () => void;
    recipe: RecipeWithCuisines;
    onRecipeUpdated: () => void;
}


const EditRecipeModal = ({ opened, close, recipe, onRecipeUpdated }: UpdateRecipeModalProps) => {

    // Fetch cuisine options from Supabase API and store in component state
    const [cuisineOptions, setCuisineOptions] = useState<{ label: string, value: string }[]>([])

    // Get form functions from useRecipeForm hook
    const { form, selectedCuisineIds, setSelectedCuisineIds, handleSubmit } =
        useRecipeForm(onRecipeUpdated, close, 'edit', recipe.id);

    // Fetch cuisine options for select input
    useEffect(() => {
        async function fetchCuisines() {
            const { data: cuisines, error } = await supabase.from("cuisines").select("id, name");
            if (!error && cuisines) {
                setCuisineOptions(cuisines?.map(cuisine => ({ label: cuisine.name, value: cuisine.id })));
            }
        }
        fetchCuisines();
    }, []);

    // Fetch existing recipe and prefill form
    useEffect(() => {
        if (!recipe) {return;}

        form.setValues({
            title: recipe.title ?? '',
            description: recipe.description ?? '',
            ingredients: (recipe.ingredients as unknown as Ingredient[]) ?? [],
            instructions: recipe.instructions ?? '',
            commonCarbohydrate: recipe.common_carbohydrate ?? undefined,
            prepTimeMinutes: recipe.prep_time_minutes ?? 0,
            servings: recipe.servings ?? 1,
            imageUrl: recipe.image_url ?? undefined,
            recipeUrl: recipe.recipe_url ?? undefined,
            cuisine: recipe.recipe_cuisines.map((rc) => rc.cuisine_id),
        });

        setSelectedCuisineIds(recipe.recipe_cuisines.map((rc) => rc.cuisine_id));
    }, [recipe]);

    return (
        <Modal size='xl' opened={opened} onClose={close} title="Add Recipe">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <RecipeBasicInfo form={form} />
                    <RecipeLinks form={form} />
                    <RecipeDetails
                        form={form}
                        selectedCuisineIds={selectedCuisineIds}
                        setSelectedCuisineIds={setSelectedCuisineIds}
                        cuisineOptions={cuisineOptions}
                    />
                    <AddRecipeIngredients form={form} />
                    <Button
                        type='submit'
                        style={{ borderRadius: '25px' }}
                    >
                        Update
                    </Button>
                </Stack>
            </form>
        </Modal>
    )
}

export default EditRecipeModal;