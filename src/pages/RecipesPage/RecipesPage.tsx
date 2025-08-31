import { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import RecipeCards from "@/components/RecipeCards/RecipeCards";
import classes from './RecipesPage.module.css';
import { PiPlusCircle } from "react-icons/pi";
import { useDisclosure } from "@mantine/hooks";
import { loadRecipes } from "@/api/recipes";
import { RecipeWithCuisines } from "@/types/recipe";
import AddRecipeModal from "@/components/AddRecipeModal/AddRecipeModal";
import RecipeOverlay from "@/components/RecipeOverlay/RecipeOverlay";
import EmptyRecipeImage from "@/components/EmptyRecipeImage/EmptyRecipeImage";
import EditRecipeModal from "@/components/EditRecipeModal/EditRecipeModal";


const RecipesPage = () => {
  const [recipes, setRecipes] = useState<RecipeWithCuisines[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeWithCuisines | undefined>(undefined)
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);
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

  const areRecipesLoaded: boolean = recipes.length > 0;

  return (
    <>
      <AddRecipeModal
        opened={createModalOpened}
        close={closeCreateModal}
        onRecipeCreated={fetchRecipes}
      />

      {selectedRecipe && (
        <EditRecipeModal
          opened={editModalOpened}
          close={closeEditModal}
          onRecipeUpdated={fetchRecipes}
          recipe={selectedRecipe}
        />
      )}

      {selectedRecipe && (
        <RecipeOverlay
          opened={overlayOpened}
          close={closeOverlay}
          recipe={selectedRecipe}
          openEditModal={openEditModal}
          fetchRecipes={fetchRecipes}
        />
      )}

      <div className={classes.background}>
        <div className={classes.foreground}>
          <div className={classes.headerBox}>
            <h3 className={classes.recipeListHeader}>All Recipes</h3>
            <Button onClick={openCreateModal} className={classes.button}>
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