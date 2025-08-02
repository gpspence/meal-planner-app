import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import { useDisclosure } from '@mantine/hooks';
import CreateRecipeForm from '@/components/CreateRecipeForm/CreateRecipeForm';
import Aside from '@/components/Aside/Aside';
import classes from './MainLayout.module.css'
import { Notifications } from '@mantine/notifications';

const MainLayout = () => {

  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <div className={classes.flexRow}>
        <div>
          <Aside />
        </div>
        <div className={classes.flexColumn}>
          <Navbar />
          <div className={classes.outlet}>
            <Outlet />
          </div>
        </div>
      </div>
        <CreateRecipeForm opened={opened} onClose={close} />
        <Notifications />
    </>
  );
}

export default MainLayout