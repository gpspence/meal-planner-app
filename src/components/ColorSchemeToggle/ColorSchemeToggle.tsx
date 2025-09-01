import cx from 'clsx';
import { FiMoon, FiSun } from 'react-icons/fi';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from './ColorSchemeToggle.module.css';

const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="md"
      aria-label="Toggle color scheme"
    >
      <FiSun className={cx(classes.icon, classes.light)} />
      <FiMoon className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
};

export default ColorSchemeToggle;
