import React from 'react'
import { Modal } from '@mantine/core'

type AddRecipeModalProps = {
    opened: boolean
    close: () => void
}

const AddRecipeModal = ({ opened, close }: AddRecipeModalProps) => {
    return (
        <>
            <Modal opened={opened} onClose={close} title="Add Recipe">
                Hello!
            </Modal>
        </>
    )
}

export default AddRecipeModal