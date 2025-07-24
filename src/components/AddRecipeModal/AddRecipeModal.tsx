import React from 'react'
import { Modal, Textarea, TextInput, Group, NumberInput, Select, Button, Box, Stack, Title, Text, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { createRecipe } from '@/api/recipes';
import { PiTrash } from 'react-icons/pi';
import { randomId } from '@mantine/hooks';
import classes from './AddRecipeModal.module.css';

type AddRecipeModalProps = {
    opened: boolean
    close: () => void
}

const unitOptions = [
    'kg', 'g', 'tbsp', 'tsp', 'mL', 'L', 'bunch', 'thumbsize'
].map(unit => ({ label: unit, value: unit}));

const AddRecipeModal = ({ opened, close }: AddRecipeModalProps) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            description: '',
            ingredients: [
                { name: '', quantity: 0, unit: '', note: '' }
            ],
            instructions: '',
            cuisine: '',
            commonCarbohydrate: '',
            prepTimeMinutes: '',
            servings: 1,
            imageUrl: '',
            recipeUrl: ''
        },

        validate: {

        }
    })

    const ingredientFields = form.values.ingredients.map((_, index) => (
        <Group key={index} mt={'xs'} wrap='nowrap'>
            <TextInput
                placeholder='e.g. flour'
                key={form.key(`ingredients.${index}.name`)}
                {...form.getInputProps(`ingredients.${index}.name`)}
            />
            <NumberInput
                min={1}
                key={form.key(`ingredients.${index}.quantity`)}
                {...form.getInputProps(`ingredients.${index}.quantity`)}
            />
            <Select
                placeholder='e.g. kg'
                data={unitOptions}
                key={form.key(`ingredients.${index}.unit`)}
                {...form.getInputProps(`ingredients.${index}.unit`)}
            />
            <TextInput
                placeholder='e.g. sifted'
                key={form.key(`ingredients.${index}.note`)}
                {...form.getInputProps(`ingredients.${index}.note`)}
            />
            <ActionIcon
                color='red'
                onClick={() => form.removeListItem('ingredients', index)}
            >
                <PiTrash size={16} />
            </ActionIcon>
        </Group>
    ))

    return (
        <Modal size='xl' opened={opened} onClose={close} title="Add Recipe">
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
            />
            
            <Box maw={500} mt='sm' mx='auto'>
                {ingredientFields.length > 0 ? (
                    <Group mb='xs'>
                        <Text fw={500} size='sm' className={classes.flex}>
                            Name
                        </Text>
                        <Text fw={500} size='sm' className={classes.flex}>
                            Quantity
                        </Text>
                        <Text fw={500} size='sm' className={classes.flex}>
                            Unit
                        </Text>
                        <Text fw={500} size='sm' pr={90} className={classes.flex}>
                            Note
                        </Text>
                    </Group>
                ) : (
                    <Text c='dimmed' ta='center'>
                        No ingredients added...
                    </Text>
                )}
            </Box>
            {ingredientFields}
            <Group justify='center' mt='md'>
                <Button
                    onClick={() =>
                        form.insertListItem(
                            'ingredients',
                            { name: '', quantity: 1, unit: '', note: '', key: randomId()}
                        )
                    }
                >
                    Add ingredient
                </Button>
            </Group>


        </Modal>
    )
}

export default AddRecipeModal