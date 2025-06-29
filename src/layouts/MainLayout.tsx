import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDisclosure } from '@mantine/hooks';
import CreateRecipeForm from '@/components/CreateRecipeForm/CreateRecipeForm';

const MainLayout = () => {

  const [opened, {open, close}] = useDisclosure();

  return (
      <>
        <Navbar onOpenModal={open}/>
        <CreateRecipeForm opened={opened} onClose={close}/>
        <Outlet />
        <ToastContainer />
      </>
  );
}

export default MainLayout