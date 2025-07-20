import { useLoaderData } from "react-router-dom";
import type { Tables } from "@/database.types";
import RecipeCards from "@/components/RecipeCards/RecipeCards";
import classes from './RecipesPage.module.css'

type Recipe = Tables<"recipes">;

const RecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];
  console.log(recipes);

  return (
    <>
      <div className={classes.background}>
        <div className={classes.foreground}>
          <h3 className={classes.title}>Recipes list</h3>
          <div className={`${classes.flex} ${classes.image}`}>
            <RecipeCards recipes={recipes} />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesPage