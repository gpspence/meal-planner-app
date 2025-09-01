import React from 'react';
import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { RecipeFormValues } from '@/types/recipe';

type Props = {
  form: UseFormReturnType<RecipeFormValues>;
};

const RecipeLinks = ({ form }: Props) => {
  return (
    <>
      <TextInput
        label="Recipe URL"
        placeholder="Recipe URL"
        key={form.key('recipeUrl')}
        {...form.getInputProps('recipeUrl')}
        withAsterisk
      />
      <TextInput
        label="Image URL"
        placeholder="Image URL"
        key={form.key('imageUrl')}
        {...form.getInputProps('imageUrl')}
      />
    </>
  );
};

export default RecipeLinks;
