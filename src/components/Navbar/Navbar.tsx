import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { Button, Flex, Text } from '@mantine/core';
import { useSession } from '@/hooks/useSession';
import PlannerTitle from '../PlannerTitle/PlannerTitle';
import classes from './Navbar.module.css';

const Navbar = () => {
  const { session, supabase } = useSession();
  const navigate: NavigateFunction = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Flex justify="space-between" align="center" p={5}>
      <PlannerTitle tabTitle="Planner" />
      {session ? (
        <Button className={classes.button} onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <Flex gap="xs">
          <Link to="/login?view=sign-in">
            <Button bg="none" style={{ borderRadius: '25px' }}>
              <Text c="black" fz="14">
                Sign in
              </Text>
            </Button>
          </Link>
          <Link to="/login?view=sign-up">
            <Button className={classes.button}>Sign up</Button>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
