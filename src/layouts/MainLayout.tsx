import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDisclosure } from '@mantine/hooks';

const MainLayout = () => {

  const [opened, { toggle }] = useDisclosure();

  return (
      <>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </>
  );
}

export default MainLayout