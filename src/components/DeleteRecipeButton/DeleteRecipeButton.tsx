import { deleteSingleRecipe } from '@/api/recipes';
import { Button, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { modals } from '@mantine/modals';
import React, { useState } from 'react'
import { PiTrash } from 'react-icons/pi'

type DeleteRecipeButtonProps = {
    recipeId: string;
    onSubmit: () => void;
}

const DeleteRecipeButton = ({ recipeId, onSubmit }: DeleteRecipeButtonProps) => {

    const openConfirm = () =>
        modals.openConfirmModal({
            title: 'Delete recipe',
            centered: true,
            children: (
                <Text size='sm'>
                    Are you sure you want to delete this recipe? This action is destructive and cannot be reversed.
                </Text>
            ),
            labels: { confirm: 'Confirm', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: async () => {
                try {
                    await deleteSingleRecipe(recipeId);
                    notifications.show({
                        title: 'Recipe Deleted Successfully!',
                        color: 'green',
                        message: `Your recipe has been deleted from the database.`
                    });
                } catch (error) {
                    console.error(error);
                    notifications.show({
                        title: 'Recipe Deletion Failed.',
                        color: 'red',
                        message: `Failed to delete recipe. ${error}`
                    })
                } finally {
                    onSubmit();
                }
            }
        });


    return (
        <Button
            leftSection={<PiTrash size={14} />}
            color='red'
            onClick={openConfirm}
        >
            Delete recipe
        </Button>
    );
}

export default DeleteRecipeButton