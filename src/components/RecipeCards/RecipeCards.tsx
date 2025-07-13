import React from 'react';
import type { Tables } from "@/database.types";
import { Card, Flex, Text } from "@mantine/core";
import RecipeCard from '../RecipeCard/RecipeCard';
import classes from './RecipeCards.module.css';

type Recipe = Tables<"recipes">;
type RecipeCardsProps = {
    recipes: Recipe[]
}


const RecipeCards = ({ recipes }: RecipeCardsProps) => {
    const areRecipesLoaded: Boolean = (
        recipes !== undefined &&
        recipes.length !== 0
    )

    return (
        <div className={classes.root}>
            <div className={classes.foreground}>
                {
                    areRecipesLoaded ?
                        recipes.map((item: Recipe, idx: number) => (
                            <RecipeCard key={idx} {...item} />
                        )) :
                        <Text>No recipes found!</Text>
                }
            </div>
        </div>
    )
}

export default RecipeCards