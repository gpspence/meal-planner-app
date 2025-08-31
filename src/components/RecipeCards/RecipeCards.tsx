import RecipeCard from '../RecipeCard/RecipeCard';
import { Grid } from "@mantine/core";
import { RecipeWithCuisines } from "@/types/recipe";

type RecipeCardsProps = {
    recipes: RecipeWithCuisines[],
    onRecipeClick: (recipe: RecipeWithCuisines) => void
}


const RecipeCards = ({ recipes, onRecipeClick }: RecipeCardsProps) => {

    return (
        <Grid
            gutter='md'
            justify='left'
            p='xs'
            grow
        >
            {recipes.map((item: RecipeWithCuisines, idx: number) => (
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