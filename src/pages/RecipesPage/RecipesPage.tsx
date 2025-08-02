import { useState, useEffect } from "react";
import type { Tables } from "@/types/database.types";
import { Button } from "@mantine/core";
import RecipeCards from "@/components/RecipeCards/RecipeCards";
import classes from './RecipesPage.module.css';
import { PiPlusCircle } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import { loadRecipes } from "@/api/recipes";
import AddRecipeModal from "@/components/AddRecipeModal/AddRecipeModal";
import EmptyRecipeImage from "@/components/EmptyRecipeImage/EmptyRecipeImage";

type Recipe = Tables<"recipes">;

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  // Get recipes and update component state
  const fetchRecipes = async () => {
    try {
      const data = await loadRecipes();
      setRecipes(data);
    } catch (error) {
      console.error("Error occurred loading recipes", error);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  const areRecipesLoaded: Boolean = recipes.length > 0;

  return (
    <>
      <AddRecipeModal
        opened={opened}
        close={close}
        onRecipeCreated={fetchRecipes}
      />

      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.headerBox}>
            <h3 className={classes.recipeListHeader}>All Recipes</h3>
            <Button onClick={open} className={classes.button}>
              <PiPlusCircle className={classes.icons} />
              Add recipe
            </Button>
          </div>
          <div className={classes.dashBorder}>
            {areRecipesLoaded ?
              <RecipeCards recipes={recipes} /> :
              <div className={`${classes.flex} ${classes.image}`}>
                <EmptyRecipeImage />
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipesPage