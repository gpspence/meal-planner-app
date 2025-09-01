import React from 'react';
import { Text, Title } from '@mantine/core';

interface Props {
  tabTitle: string;
}

const PlannerTitle: React.FC<Props> = ({ tabTitle }) => {
  return (
    <Title order={2}>
      Weekly Meal{' '}
      <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'blue' }}>
        {tabTitle}
      </Text>
    </Title>
  );
};

export default PlannerTitle;
