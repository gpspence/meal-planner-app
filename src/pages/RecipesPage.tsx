import { useLoaderData } from "react-router-dom";
import type { Tables } from "@/database.types";
import RecipeCards from "@/components/RecipeCards/RecipeCards";

type Recipe = Tables<"recipes">;

const RecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];
  console.log(recipes);

  return (
    <RecipeCards recipes={recipes}/> 
  )
}

export default RecipesPage