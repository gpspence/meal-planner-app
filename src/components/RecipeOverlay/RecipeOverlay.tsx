import React from 'react'
import { Drawer, List, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Json, Tables } from '@/types/database.types';
import { stringify } from 'postcss';
import classes from './RecipeOverlay.module.css'
import { Ingredient } from '@/types/recipeForm';
import { useRecipeOverlay } from '@/hooks/useRecipeOverlay';

type Recipe = Tables<"recipes">;

type RecipeOverlayProps = {
    opened: boolean;
    close: () => void;
    recipe: Recipe
}



const RecipeOverlay = ({ opened, close, recipe }: RecipeOverlayProps) => {

    const { tableRows } = useRecipeOverlay(recipe);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                position='right'
                size='60%'
                title={recipe.title}
            >
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