import { SimpleGrid } from '@mantine/core';
import { RecipeWithCuisines } from '@/types/recipe';
import RecipeCard from '../RecipeCard/RecipeCard';

type RecipeCardsProps = {
  recipes: RecipeWithCuisines[];
  onRecipeClick: (recipe: RecipeWithCuisines) => void;
};

const RecipeCards = ({ recipes, onRecipeClick }: RecipeCardsProps) => {
  return (
    <SimpleGrid cols={{ base: 3, sm: 3, lg: 7}} spacing="xs">
      {recipes.map((item: RecipeWithCuisines, idx: number) => (
        <RecipeCard key={idx} onCardClick={() => onRecipeClick(item)} {...item} />
      ))}
    </SimpleGrid>
  );
};

export default RecipeCards;
