import React from 'react'
import { ActionIcon, Button, Drawer, Group, List, Menu, Table } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Json, Tables } from '@/types/database.types';
import { stringify } from 'postcss';
import classes from './RecipeOverlay.module.css'
import { Ingredient } from '@/types/recipeForm';
import { useRecipeOverlay } from '@/hooks/useRecipeOverlay';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiLink, PiPencil, PiTrash } from 'react-icons/pi';

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
                <Drawer.Header pt={0}>
                    <Group gap={'0.5rem'}>
                        <Button leftSection={<PiLink />} className={classes.safeButton}>
                            Assign to calendar
                        </Button>
                        <Button leftSection={<PiPencil />} className={classes.safeButton}>
                            Edit recipe
                        </Button>
                        <Button
                            leftSection={<PiTrash size={14} />}
                            color='red'
                        >
                            Delete recipe
                        </Button>
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