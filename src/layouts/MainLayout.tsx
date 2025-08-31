import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import Aside from '@/components/Aside/Aside';
import classes from './MainLayout.module.css'
import { Notifications } from '@mantine/notifications';

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
}

export default MainLayout