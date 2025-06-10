import DayPlanner from '@/components/DayPlanner/DayPlanner';
import { Container, Flex, Grid, Paper, Stack, Text } from '@mantine/core';

export function HomePage() {
  return (
    <Container size='responsive'>
      <Grid>
        <Grid.Col bg='blue' span={4}>
          <Stack>
          <Container bg='green' m={0}>
              <DayPlanner />
            </Container>
            <Container bg='red' m={0} p={0}>
              <Stack>
                <Paper shadow='sm' p='xs'>
                  <Text size='xs'>Test</Text>
                </Paper>
              </Stack>
            </Container>
          </Stack>
        </Grid.Col>
        <Grid.Col bg='green' span={8}>
          2

        </Grid.Col>
      </Grid>
    </Container>
  );
}
