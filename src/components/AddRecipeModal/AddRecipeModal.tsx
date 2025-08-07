import { useEffect, useState } from 'react';
import { Modal, Textarea, TextInput, Button, Stack } from '@mantine/core';
import AddRecipeIngredients from '../AddRecipeIngredients/AddRecipeIngredients';
import { useRecipeForm } from '@/hooks/useRecipeForm';
import { supabase } from '@/supabaseClient';
import RecipeBasicInfo from './RecipeBasicInfo';
import RecipeDetails from './RecipeDetails';
import RecipeLinks from './RecipeLinks';

type AddRecipeModalProps = {
    opened: boolean
    close: () => void
    onRecipeCreated: () => void;
}


const AddRecipeModal = ({ opened, close, onRecipeCreated }: AddRecipeModalProps) => {

    // Fetch cuisine options from Supabase API and store in component state
    const [cuisineOptions, setCuisineOptions] = useState<{ label: string, value: string }[]>([])
    useEffect(() => {
        async function fetchCuisines() {
            const { data: cuisines, error } = await supabase.from("cuisines").select("id, name");
            if (!error && cuisines) {
                setCuisineOptions(cuisines?.map(cuisine => ({ label: cuisine.name, value: cuisine.id })));
            }
        }
        fetchCuisines();
    }, []);

    // Get form functions from useRecipeForm hook
    const { form, selectedCuisineIds, setSelectedCuisineIds, handleSubmit } = useRecipeForm(onRecipeCreated, close);

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
                    <AddRecipeIngredients
                        form={form}
                    />
                    <Button type='submit'>Submit</Button>
                </Stack>
            </form>
        </Modal>
    )
}

export default AddRecipeModal;