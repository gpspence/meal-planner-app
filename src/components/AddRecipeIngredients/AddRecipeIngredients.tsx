import React, { JSX } from 'react'
import { RecipeFormValues, Ingredient } from '@/types/recipeForm';
import { UseFormReturnType } from '@mantine/form';
import { Group, Box, Button, TextInput, NumberInput, Select, ActionIcon, Text } from '@mantine/core';
import { PiTrash } from 'react-icons/pi';
import { randomId } from '@mantine/hooks';

type AddRecipeIngredientsProps = {
    form: UseFormReturnType<RecipeFormValues>;
}

const unitOptions = [
    'kg', 'g', 'tbsp', 'tsp', 'mL', 'L', 'bunch', 'thumbsize'
].map(unit => ({ label: unit, value: unit }));

const AddRecipeIngredients = ({ form }: AddRecipeIngredientsProps) => {
    const ingredients = form.values.ingredients ?? [];
    const ingredientFields: JSX.Element[] = ingredients.map((_, index) => (
        <Group key={index} mt={'xs'} wrap='nowrap'>
            <Box style={{ flex: 2 }}>
                <TextInput
                    placeholder='e.g. flour'
                    key={form.key(`ingredients.${index}.name`)}
                    {...form.getInputProps(`ingredients.${index}.name`)}
                />
            </Box>
            <Box style={{ flex: 1 }}>
                <NumberInput
                    min={1}
                    key={form.key(`ingredients.${index}.quantity`)}
                    {...form.getInputProps(`ingredients.${index}.quantity`)}
                />
            </Box>
            <Box style={{ flex: 1 }}>
                <Select
                    placeholder='e.g. kg'
                    data={unitOptions}
                    key={form.key(`ingredients.${index}.unit`)}
                    {...form.getInputProps(`ingredients.${index}.unit`)}
                />
            </Box>
            <Box style={{ flex: 2 }}>
                <TextInput
                    placeholder='e.g. sifted'
                    key={form.key(`ingredients.${index}.note`)}
                    {...form.getInputProps(`ingredients.${index}.note`)}
                />
            </Box>
            <ActionIcon
                color='red'
                onClick={() => form.removeListItem('ingredients', index)}
            >
                <PiTrash size={16} />
            </ActionIcon>
        </Group>
    ));

    return (
        <>
            <Box>
                <Text fz={14}>Ingredients</Text>
                <Box
                    p='md'
                    style={{
                        border: '1px solid rgb(206, 212, 218)',
                        borderRadius: '4px'
                    }}>
                    {ingredientFields.length > 0 ? (
                        <Group mb='xs' gap='sm' align='center' wrap='nowrap'>
                            <Box style={{ flex: 2 }}><Text fw={500} size='sm'>Name</Text></Box>
                            <Box style={{ flex: 1 }}><Text fw={500} size='sm'>Quantity</Text></Box>
                            <Box style={{ flex: 1 }}><Text fw={500} size='sm'>Unit</Text></Box>
                            <Box style={{ flex: 2 }}><Text fw={500} size='sm'>Note</Text></Box>
                            <Box style={{ width: 32 }} />
                        </Group>
                    ) : (
                        <Text c='dimmed' ta='center'>
                            No ingredients added...
                        </Text>
                    )}
                    {ingredientFields}
                    <Group justify='center' mt='md'>
                        <Button
                            style={{
                                backgroundColor: '#D7F4FE',
                                color: 'black',
                                fontWeight: 400,
                                border: '1px dashed rgb(206, 212, 218'
                            }}
                            onClick={() => {
                                if (!form.values.ingredients) {
                                    form.setFieldValue('ingredients', []);
                                }
                                form.insertListItem('ingredients', {
                                    name: '',
                                    quantity: 1,
                                    unit: '',
                                    note: '',
                                    key: randomId()
                                });
                            }}
                        >
                            Add ingredient
                        </Button>
                    </Group>
                </Box>
            </Box>
        </>
    );
};

export default AddRecipeIngredients