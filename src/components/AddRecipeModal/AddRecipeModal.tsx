import React, { useState } from 'react'
import { Modal, Textarea, TextInput, Group, NumberInput, Select, Button, Box, Stack, Title, Text, ActionIcon, MultiSelect, Autocomplete } from '@mantine/core';
import { hasLength, isInRange, isNotEmpty, matches, useForm, UseFormReturnType } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { createRecipe } from '@/api/recipes';
import AddRecipeIngredients from '../AddRecipeIngredients/AddRecipeIngredients';
import { RecipeFormValues, Recipe, NewRecipe } from '@/types/recipeForm';
import { supabase } from '@/supabaseClient';

type AddRecipeModalProps = {
    opened: boolean
    close: () => void
    onRecipeCreated: () => void;
}

const { data: cuisines } = await supabase
    .from("cuisines")
    .select("id, name");

const cuisineOptions = cuisines?.map(cuisine => ({
    label: cuisine.name,
    value: cuisine.id
}));

const commonCarbohydrates: string[] = [
    "Pasta",
    "Rice",
    "Potatoes",
    "Noodles",
    "Bread",
    "Cous cous",
    "Polenta",
    "Pastry",
    "None"
];

const urlRegex: RegExp = /https?:\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[\w\-\/\.\?\=\#\%\&]*)?/

function matchIfExists(regex: RegExp, message: string) {
    return (value: string | null) => {
        if (!value || value.trim() === '') return null; // Don't validate empty fields
        return regex.test(value) ? null : message;
    };
}

function sanitiseForInsert(values: RecipeFormValues): NewRecipe {
    return {
        title: values.title,
        description: values.description,
        prep_time_minutes: values.prepTimeMinutes!,
        servings: values.servings!,
        ingredients: values.ingredients ?? [],
        instructions: values.instructions,
        common_carbohydrate: values.commonCarbohydrate,
        image_url: values.imageUrl,
        recipe_url: values.recipeUrl
    }
}


const AddRecipeModal = ({
    opened,
    close,
    onRecipeCreated
}: AddRecipeModalProps) => {
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
    })

    const [selectedCuisineIds, setSelectedCuisineIds] = useState<string[]>([]);

    return (
        <Modal size='xl' opened={opened} onClose={close} title="Add Recipe">
            <form onSubmit={form.onSubmit(async (values) => {
                try {
                    const toInsert = sanitiseForInsert(values)
                    await createRecipe(toInsert, selectedCuisineIds);
                } catch (error: any) {
                    notifications.show({
                        title: 'Recipe Creation Failed.',
                        color: 'red',
                        message: `Failed to create recipe. ${error.message}`
                    })
                };
                onRecipeCreated();
                form.reset();
                form.setFieldValue('ingredients', []);  // Isn't being reset correctly (keeps empty object instead of null)
                setSelectedCuisineIds([])
                notifications.show({
                    title: 'Recipe Created Successfully!',
                    color: 'green',
                    message: `Your recipe has been added to the database.`
                })
                close();
            })}
            >
                <Stack>
                    <TextInput
                        label='Title'
                        withAsterisk
                        placeholder='Title'
                        key={form.key('title')}
                        {...form.getInputProps('title')}
                    />

                    <Textarea
                        label='Description'
                        placeholder='Description'
                        key={form.key('description')}
                        {...form.getInputProps('description')}
                        withAsterisk
                    />

                    <TextInput
                        label='Recipe URL'
                        placeholder='Recipe URL'
                        key={form.key('recipeUrl')}
                        {...form.getInputProps('recipeUrl')}
                        withAsterisk
                    />

                    <MultiSelect
                        label='Cuisine'
                        placeholder='Select country'
                        key={form.key('cuisine')}
                        {...form.getInputProps('cuisine')}
                        data={cuisineOptions}
                        value={selectedCuisineIds}
                        onChange={(value) => {
                            setSelectedCuisineIds(value);
                            form.setFieldValue('cuisine', value);
                        }}
                        limit={5}
                        searchable
                        hidePickedOptions
                        withAsterisk
                    />

                    <NumberInput
                        label='Total Duration (mins)'
                        placeholder='15'
                        key={form.key('prepTimeMinutes')}
                        {...form.getInputProps('prepTimeMinutes')}
                        min={1}
                        withAsterisk
                    />

                    <NumberInput
                        label='Number of Servings'
                        placeholder='1'
                        key={form.key('servings')}
                        {...form.getInputProps('servings')}
                        min={1}
                    />

                    <AddRecipeIngredients
                        form={form}
                    />

                    <Textarea
                        label='Instructions'
                        placeholder='Instructions'
                        key={form.key('instructions')}
                        {...form.getInputProps('instructions')}
                    />

                    <Autocomplete
                        label='Commonly Paired Carbohydrate'
                        placeholder='Carbohydrate'
                        key={form.key('commonCarbohydrate')}
                        data={commonCarbohydrates}
                        {...form.getInputProps('commonCarbohydrate')}
                    />

                    <TextInput
                        label='Image URL'
                        placeholder='Image URL'
                        key={form.key('imageUrl')}
                        {...form.getInputProps('imageUrl')}
                    />

                    <Button type='submit'>Submit</Button>
                </Stack>
            </form>
        </Modal>
    )
}

export default AddRecipeModal;