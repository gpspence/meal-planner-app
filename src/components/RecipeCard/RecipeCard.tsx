import React from 'react';
import { Badge, Button, Card, Group, Image, Text } from '@mantine/core';
import type { Tables } from "@/types/database.types";

type Recipe = Tables<"recipes">;

const RecipeCard = ({image_url, title, description}: Recipe) => {

  return (
    <Card
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        {image_url && (
          <Image
            src={image_url}
            height={180}
            alt={title}
          />
        )}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        <Badge color="pink">Example</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Assign to calendar
      </Button>

    </Card>
  );
}

export default RecipeCard