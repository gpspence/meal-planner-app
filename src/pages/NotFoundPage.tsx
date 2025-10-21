import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Stack, Title, Text, Button, Group } from '@mantine/core';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container 
    size="sm" 
    style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Stack align="center" gap="md" style={{ width: '100%', textAlign: 'center' }}>
        <Title order={1} style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', margin: 0 }} id="notfound-heading">
          404 — Page not found
        </Title>

        <Text c="dimmed">
          Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.
        </Text>

        <Group gap="sm">
          <Button onClick={() => navigate('/')} color="blue" aria-label="Go to homepage">
            Go to Home
          </Button>

          <Button variant="outline" onClick={() => navigate(-1)} aria-label="Go back">
            Go back
          </Button>
        </Group>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
