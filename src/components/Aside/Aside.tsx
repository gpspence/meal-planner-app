import { Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import {
    PiScrollThin,
    PiCalendarDotsThin,
    PiHouseLineThin,
    PiGraphThin,
    PiUserCirclePlusThin,
    PiGearThin
} from "react-icons/pi";

import classes from './Aside.module.css';

const Aside = () => {

    return (
        <>
            <div className={`${classes.root} ${classes.flexColumn}`}>
                <IconContext.Provider value={{ className: classes.icons }}>
                    <div className={classes.borderedIcons}>
                        <div>
                            <PiUserCirclePlusThin />
                        </div>
                    </div>
                    <div className={classes.flexColumn}>
                        <div className={classes.iconHighlight}>
                            <NavLink to='/'>
                                <PiHouseLineThin />
                            </NavLink>
                        </div>
                        <Text className={classes.iconLabels}>Home</Text>
                    </div>
                    <hr className={classes.divider} />
                    <div className={classes.flexColumn}>
                        <NavLink to='/recipes'>
                            <PiScrollThin />
                        </NavLink>
                        <Text className={classes.iconLabels}>Recipes</Text>
                    </div>
                    <div className={classes.flexColumn}>
                        <NavLink to='/calendar'>
                            <PiCalendarDotsThin />
                        </NavLink>
                        <Text className={classes.iconLabels}>Plan</Text>
                    </div>
                    <div className={classes.flexColumn}>
                        <NavLink to='/analytics'>
                            <PiGraphThin />
                        </NavLink>
                        <Text className={classes.iconLabels}>Analytics</Text>
                    </div>
                    <hr className={classes.divider} />
                    <div>
                        <div className={classes.flexColumn}>
                            <PiGearThin />
                            <Text className={classes.iconLabels}>Settings</Text>
                        </div>
                    </div>
                </IconContext.Provider>
            </div>
        </>
    )
}

export default Aside