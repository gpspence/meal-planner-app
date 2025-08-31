import { Button, Drawer, Group, Table } from '@mantine/core';
import classes from './RecipeOverlay.module.css'
import { PiPencil } from 'react-icons/pi';
import { useRecipeOverlay } from '@/hooks/useRecipeOverlay';
import DeleteRecipeButton from '../DeleteRecipeButton/DeleteRecipeButton';
import { RecipeWithCuisines } from '@/types/recipe';


type RecipeOverlayProps = {
    opened: boolean;
    close: () => void;
    recipe: RecipeWithCuisines;
    openEditModal: () => void;
    fetchRecipes: () => void;
}



const RecipeOverlay = ({ opened, close, recipe, openEditModal, fetchRecipes }: RecipeOverlayProps) => {

    const { tableRows } = useRecipeOverlay(recipe);
    const onSubmit = () => {
        close();
        fetchRecipes();
    }
    const handleOpenEditModal = () => {
        close();
        openEditModal();
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
                    <Group gap='0.5rem'>
                        <Button
                            leftSection={<PiPencil />}
                            className={classes.safeButton}
                            onClick={handleOpenEditModal}
                        >
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