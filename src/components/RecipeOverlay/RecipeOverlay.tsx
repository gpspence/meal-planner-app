import React from 'react'
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

type RecipeOverlayProps = {
    opened: boolean;
    close: () => void;
}

const RecipeOverlay = ({ opened, close }: RecipeOverlayProps) => {

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                title='Test'
            >
                Some Content
            </Drawer>
        </>
    )
}

export default RecipeOverlay