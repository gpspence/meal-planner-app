import { Badge, Box, Card, Group, Image, Text } from '@mantine/core';
import classes from "./RecipeCard.module.css";
import choppingBoardImg from '../../img/chopping_board.avif';
import { RecipeWithCuisines } from '@/types/recipe';
import { cleanTitle } from '@/utils/strings';

interface RecipeCardProps extends RecipeWithCuisines {
  onCardClick: () => void;
}

const RecipeCard = ({ image_url, title, recipe_cuisines, onCardClick }: RecipeCardProps) => {

  const imageSource: string = image_url ? image_url : choppingBoardImg;
  const TITLE_LENGTH: number = 40;
  const shortenedTitle: string = title.slice(0, TITLE_LENGTH) + "...";
  const displayTitle: string = title.length < TITLE_LENGTH ?
    title : shortenedTitle;
  const cuisineNames: string[] = recipe_cuisines.map(rc => rc.cuisines.name)

  return (
    <Card
      padding="lg"
      radius="md"
      m={3}
      withBorder
      onClick={onCardClick}
      className={classes.clickableCard}
    >
      <Box className={classes.root}>
        <Card.Section>
          <Image
            src={imageSource}
            height={180}
            alt={title}
          />
        </Card.Section>

        <Card.Section>
          <Group p={5} m={0} gap={3} wrap='nowrap'>
            {cuisineNames && cuisineNames.map(cuisineName =>
              <Badge
                color="pink"
                style={{ textTransform: 'capitalize' }}
              >
                {cleanTitle(cuisineName)}
              </Badge>
            )}
          </Group>
        </Card.Section>

        <Card.Section>
          <Group justify="space-between" ml={10}>

            <Text fz={14} fw={500} maw={150}>{displayTitle}</Text>
          </Group>
        </Card.Section>
      </Box>
    </Card>
  );
}

export default RecipeCard