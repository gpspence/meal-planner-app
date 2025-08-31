import React from 'react';
import { ActionIcon, Badge, Box, Button, Card, Group, Image, Menu, Text } from '@mantine/core';
import type { Tables } from "@/types/database.types";
import { BsThreeDotsVertical } from 'react-icons/bs';
import classes from "./RecipeCard.module.css";
import choppingBoardImg from '../../img/chopping_board.avif';
import { PiLink, PiPencil, PiTrash } from 'react-icons/pi';
import { RecipeWithCuisines } from '@/types/recipe';

interface RecipeCardProps extends RecipeWithCuisines {
  onCardClick: () => void;
}

const RecipeCard = ({ image_url, title, onCardClick }: RecipeCardProps) => {

  const imageSource: string = image_url ? image_url : choppingBoardImg;
  const TITLE_LENGTH: number = 40;
  const displayTitle: string = title.length < TITLE_LENGTH ?
    title :
    title.slice(0, TITLE_LENGTH) + "...";

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
          <Group p={5} m={0}>
            <Badge color="pink">{"none"}</Badge>
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