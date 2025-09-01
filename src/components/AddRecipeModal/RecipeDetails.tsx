import { Autocomplete, MultiSelect, NumberInput, Textarea } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { RecipeFormValues } from '@/types/recipe';

const commonCarbohydrates: string[] = [
  'Pasta',
  'Rice',
  'Potatoes',
  'Noodles',
  'Bread',
  'Cous cous',
  'Polenta',
  'Pastry',
  'None',
];

type Props = {
  form: UseFormReturnType<RecipeFormValues>;
  selectedCuisineIds: string[];
  setSelectedCuisineIds: (ids: string[]) => void;
  cuisineOptions: { label: string; value: string }[];
};

const RecipeDetails = ({
  form,
  selectedCuisineIds,
  setSelectedCuisineIds,
  cuisineOptions,
}: Props) => {
  return (
    <>
      <MultiSelect
        label="Cuisine"
        placeholder="Select country"
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
        label="Total Duration (mins)"
        placeholder="15"
        key={form.key('prepTimeMinutes')}
        {...form.getInputProps('prepTimeMinutes')}
        min={1}
        withAsterisk
      />
      <NumberInput
        label="Number of Servings"
        placeholder="1"
        key={form.key('servings')}
        {...form.getInputProps('servings')}
        min={1}
      />
      <Textarea
        label="Instructions"
        placeholder="Instructions"
        key={form.key('instructions')}
        {...form.getInputProps('instructions')}
      />
      <Autocomplete
        label="Commonly Paired Carbohydrate"
        placeholder="Carbohydrate"
        key={form.key('commonCarbohydrate')}
        data={commonCarbohydrates}
        {...form.getInputProps('commonCarbohydrate')}
      />
    </>
  );
};

export default RecipeDetails;
