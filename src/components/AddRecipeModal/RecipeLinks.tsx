import { RecipeFormValues } from '@/types/recipeForm';
import { TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form';
import React from 'react'

type Props = {
    form: UseFormReturnType<RecipeFormValues>;
}

const RecipeLinks = ({form}: Props) => {
    return (
        <>
            <TextInput
                label='Recipe URL'
                placeholder='Recipe URL'
                key={form.key('recipeUrl')}
                {...form.getInputProps('recipeUrl')}
                withAsterisk
            />
            <TextInput
                label='Image URL'
                placeholder='Image URL'
                key={form.key('imageUrl')}
                {...form.getInputProps('imageUrl')}
            />
        </>
    )
}

export default RecipeLinks