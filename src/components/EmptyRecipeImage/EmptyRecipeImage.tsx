import React from 'react';
import myImage from '../../img/empty_recipe_logo_colour.png';
import { Button, Image, Text } from '@mantine/core';
import classes from './EmptyRecipeImage.module.css';

const EmptyRecipeImage = () => {
    return (
        <div className={classes.root}>
            <Image
                src={myImage}
                alt='Empty Recipes List'
                fit='contain'
                className={classes.image}
            />
            <h2 className={classes.emptyTitle}>No recipes found</h2>
            <p className={classes.emptySubtext}>Start by adding meals to plan your week!</p>
        </div>
    )
}

export default EmptyRecipeImage