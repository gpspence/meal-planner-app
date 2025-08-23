import type { Tables } from "@/types/database.types";
import RecipeCard from '../RecipeCard/RecipeCard';
import classes from './RecipeCards.module.css';
import { Grid } from "@mantine/core";

type Recipe = Tables<"recipes">;
type RecipeCardsProps = {
    recipes: Recipe[],
    onRecipeClick: (recipe: Recipe) => void
}


const RecipeCards = ({ recipes, onRecipeClick }: RecipeCardsProps) => {

    return (
        <Grid
            gutter='md'
            justify='left'
            p='xs'
            grow
        >
            {recipes.map((item: Recipe, idx: number) => (
                <
                    RecipeCard
                    key={idx}
                    onCardClick={() => onRecipeClick(item)}
                    {...item}
                />
            ))}
        </Grid>
    )
}

export default RecipeCards