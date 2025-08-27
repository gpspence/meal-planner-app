import { Button, Drawer, Group, Table } from '@mantine/core';
import { Tables } from '@/types/database.types';
import classes from './RecipeOverlay.module.css'
import { PiLink, PiPencil, PiTrash } from 'react-icons/pi';
import { useRecipeOverlay } from '@/hooks/useRecipeOverlay';
import { deleteSingleRecipe } from '@/api/recipes';
import DeleteRecipeButton from '../DeleteRecipeButton/DeleteRecipeButton';

type Recipe = Tables<"recipes">;

type RecipeOverlayProps = {
    opened: boolean;
    close: () => void;
    recipe: Recipe;
    fetchRecipes: () => void;
}



const RecipeOverlay = ({ opened, close, recipe, fetchRecipes }: RecipeOverlayProps) => {

    const { tableRows } = useRecipeOverlay(recipe);
    const onSubmit = () => {
        close();
        fetchRecipes();
    }

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                position='right'
                size='60%'
                title={recipe.title}
            >
                <Drawer.Header pt={0}>
                    <Group gap={'0.5rem'}>
                        <Button leftSection={<PiLink />} className={classes.safeButton}>
                            Assign to calendar
                        </Button>
                        <Button leftSection={<PiPencil />} className={classes.safeButton}>
                            Edit recipe
                        </Button>
                        <DeleteRecipeButton
                        recipeId={recipe.id}
                        onSubmit={onSubmit}
                        />
                    </Group>
                </Drawer.Header>
                <div className={classes.background}>
                    <Table>
                        <Table.Tbody>{tableRows}</Table.Tbody>
                    </Table>
                </div>
            </Drawer>
        </>
    )
}

export default RecipeOverlay