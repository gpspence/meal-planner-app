import { Outlet } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import Aside from '@/components/Aside/Aside';
import Navbar from '../components/Navbar/Navbar';
import classes from './MainLayout.module.css';

const MainLayout = () => {
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
      <Notifications />
    </>
  );
};

export default MainLayout;
