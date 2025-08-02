import { useLoaderData } from "react-router-dom";
import type { Tables } from "@/types/database.types";
import { Button } from "@mantine/core";
import RecipeCards from "@/components/RecipeCards/RecipeCards";
import classes from './RecipesPage.module.css';
import { PiPlusCircle } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import AddRecipeModal from "@/components/AddRecipeModal/AddRecipeModal";

type Recipe = Tables<"recipes">;

const RecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <AddRecipeModal opened={opened} close={close}/>

      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.headerBox}>
            <h3 className={classes.recipeListHeader}>Recipes list</h3>
            <Button onClick={open} className={classes.button}>
              <PiPlusCircle className={classes.icons} />
              Add recipe
            </Button>
          </div>
          <div className={`${classes.flex} ${classes.image}`}>
            <RecipeCards recipes={recipes} />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesPage