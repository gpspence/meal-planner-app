import React from 'react';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import type { Tables } from "@/database.types";

type Recipe = Tables<"recipes">;
type RecipeCardProps = {
  
}

const RecipeCard = (recipe: Recipe) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
        src={recipe.image_url}
        height={180}
        alt={recipe.title}
        />
      </Card.Section>
      
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{recipe.title}</Text>
        <Badge color="pink">Example</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {recipe.description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Assign to calendar
      </Button>

    </Card>
  );
}

export default RecipeCard