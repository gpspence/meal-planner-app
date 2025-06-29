import { Modal } from '@mantine/core';
import React from 'react';

interface CreateRecipeFormProps {
    opened: boolean;
    onClose: () => void;
}

const CreateRecipeForm = ({ opened, onClose}: CreateRecipeFormProps) => {
  return (
    <Modal opened={opened} onClose={onClose}>
        Test modal
    </Modal>
  )
}

export default CreateRecipeForm