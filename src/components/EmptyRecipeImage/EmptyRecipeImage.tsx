import { Image } from '@mantine/core';
import myImage from '../../img/empty_recipe_logo_colour.png';
import classes from './EmptyRecipeImageStyles.module.css';

const EmptyRecipeImage = () => {
  return (
    <div className={classes.root}>
      <Image src={myImage} alt="Empty Recipes List" fit="contain" className={classes.imageNew} />
      <h2 className={classes.emptyTitle}>No recipes found</h2>
      <p className={classes.emptySubtext}>Start by adding meals to plan your week!</p>
    </div>
  );
};

export default EmptyRecipeImage;
