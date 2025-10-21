import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Card,
  Box,
  Center,
  Loader,
} from '@mantine/core';
import { loadRecipes } from '../api/recipes';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { RecipeWithCuisines } from '@/types/recipe';
import { PiQuestionThin } from 'react-icons/pi';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [topRecipes, setTopRecipes] = useState<RecipeWithCuisines[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadRecipes();
        if (!mounted) return;
        setTopRecipes(data.slice(0, 3)); // Show top 3 recipes
      } catch (err: any) {
        setError(err?.message || 'Failed to load recipes');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchRecipes();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Container size="lg" style={{ paddingTop: 32, paddingBottom: 36 }}>
      <Stack gap="xl">
        {/* Hero */}
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <Title order={1} style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}>
              Plan meals you love — effortlessly
            </Title>

            <Text c="dimmed" mt="sm">
              Discover, organise and cook your favourite recipes. Build weekly plans, auto-generate shopping lists, and keep everything in one place.
            </Text>

            <Group mt="md">
              <Button onClick={() => navigate('/recipes')} color="blue">
                Browse recipes
              </Button>

              <Button variant="outline" onClick={() => navigate('/calendar')}>
                Open planner
              </Button>
            </Group>

            <Group mt="md" gap="xs">
            </Group>
          </div>

          <div style={{ width: 320, maxWidth: '40%' }}>
            <Card shadow="sm" padding="lg">
              <Group>
                <Title order={4}>Quick tips</Title>
                <PiQuestionThin />
              </Group>
              <Text size="sm" c="dimmed" mt="xs">
                Add your most-cooked recipes to the top list so you can add them to plans faster. Use tags to filter by meal type or dietary need.
              </Text>
            </Card>
          </div>
        </Box>

        {/* Top recipes */}
        <div>
          <Group align="apart" mb="sm">
            <Title order={2} style={{ fontSize: '1.25rem' }}>Top recipes for you</Title>
            <Button variant="outline" size="xs" onClick={() => navigate('/recipes')}>See all</Button>
          </Group>

          {loading ? (
            <Center style={{ padding: 40 }}>
              <Loader />
            </Center>
          ) : error ? (
            <Text c="red">{error}</Text>
          ) : topRecipes.length === 0 ? (
            <Text c="dimmed">No recipes yet — add your first recipe to get started.</Text>
          ) : (
            <SimpleGrid cols={3} spacing="lg">
              {topRecipes.map((r, idx) => (
                <RecipeCard key={idx} onCardClick={() => { }} {...r} />
              ))}
            </SimpleGrid>
          )}
        </div>

      </Stack>
    </Container>
  );
};

export default HomePage;
