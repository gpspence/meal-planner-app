import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDisclosure } from '@mantine/hooks';
import CreateRecipeForm from '@/components/CreateRecipeForm/CreateRecipeForm';
import Aside from '@/components/Aside/Aside';
import classes from './MainLayout.module.css'

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
        <ToastContainer />
        <CreateRecipeForm opened={opened} onClose={close} />
    </>
  );
}

export default MainLayout