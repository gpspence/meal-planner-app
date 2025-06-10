import { Title, Text } from '@mantine/core';
import React from 'react';

interface Props {
  tabTitle: string
}

const PlannerTitle: React.FC<Props> = ( {tabTitle} ) => {

  return (
    <Title order={2}>
      Weekly Meal{' '}
      <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'blue' }}>
        {tabTitle}
      </Text>
    </Title>
  )
}

export default PlannerTitle