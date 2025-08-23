import { useState, useEffect } from "react";
import type { Tables } from "@/types/database.types";
import { Button } from "@mantine/core";
import RecipeCards from "@/components/RecipeCards/RecipeCards";
import classes from './RecipesPage.module.css';
import { PiPlusCircle } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import { loadRecipes } from "@/api/recipes";
import AddRecipeModal from "@/components/AddRecipeModal/AddRecipeModal";
import RecipeOverlay from "@/components/RecipeOverlay/RecipeOverlay";
import EmptyRecipeImage from "@/components/EmptyRecipeImage/EmptyRecipeImage";

type Recipe = Tables<"recipes">;

const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [overlayOpened, { open: openOverlay, close: closeOverlay }] = useDisclosure(false);

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
        opened={modalOpened}
        close={closeModal}
        onRecipeCreated={fetchRecipes}
      />

      <RecipeOverlay
        opened={overlayOpened}
        close={closeOverlay}
      />

      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.headerBox}>
            <h3 className={classes.recipeListHeader}>All Recipes</h3>
            <Button onClick={openModal} className={classes.button}>
              <PiPlusCircle className={classes.icons} />
              Add recipe
            </Button>
          </div>
          <div className={classes.dashBorder}>
            {areRecipesLoaded ?
              <RecipeCards
                recipes={recipes}
                onRecipeClick={(recipe) => {
                  setSelectedRecipe(recipe);
                  openOverlay();
                }}
              /> :
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