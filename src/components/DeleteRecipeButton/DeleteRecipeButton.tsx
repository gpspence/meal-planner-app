import { deleteSingleRecipe } from '@/api/recipes';
import { Button } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import React, { useState } from 'react'
import { PiTrash } from 'react-icons/pi'

type DeleteRecipeButtonProps = {
    recipeId: string;
    onSubmit: () => void;
}

const DeleteRecipeButton = ({ recipeId, onSubmit }: DeleteRecipeButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this recipe?")) return;
        
        setLoading(true);
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
            setLoading(false);
            onSubmit();
        }
    };

    return (
        <Button
            leftSection={<PiTrash size={14} />}
            color='red'
            onClick={handleDelete}
            loading={loading}
        >
            Delete recipe
        </Button>
    )
}

export default DeleteRecipeButton