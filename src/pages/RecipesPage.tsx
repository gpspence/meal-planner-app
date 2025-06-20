import { useLoaderData } from "react-router-dom";

const RecipesPage = () => {
  const recipes = useLoaderData();

  return (
    <div>RecipesPage</div>
  )
}

export default RecipesPage