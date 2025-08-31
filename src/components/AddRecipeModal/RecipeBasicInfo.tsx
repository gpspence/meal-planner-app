import { RecipeFormValues } from '@/types/recipe';
import { Textarea, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

type Props = {
    form: UseFormReturnType<RecipeFormValues>;
}

const RecipeBasicInfo = ({ form }: Props) => {
    return (
        <>
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
        </>
    );
}

export default RecipeBasicInfo