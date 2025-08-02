import type { Tables } from "@/types/database.types";
import RecipeCard from '../RecipeCard/RecipeCard';
import classes from './RecipeCards.module.css';
import { Grid, Box } from "@mantine/core";

type Recipe = Tables<"recipes">;
type RecipeCardsProps = {
    recipes: Recipe[]
}


const RecipeCards = ({ recipes }: RecipeCardsProps) => {

    return (
        <Grid
            gutter='md'
            justify='left'
            p='xs'
            grow
        >
            {recipes.map((item: Recipe, idx: number) => (
                <RecipeCard key={idx} {...item} />
            ))}
        </Grid>
    )
}

export default RecipeCards