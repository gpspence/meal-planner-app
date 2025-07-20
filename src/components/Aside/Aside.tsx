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

const topNavItems = [
    { to: '/recipes', label: 'Recipes', icon: <PiScrollThin /> },
    { to: '/calendar', label: 'Plan', icon: <PiCalendarDotsThin /> },
    { to: '/analytics', label: 'Analytics', icon: <PiGraphThin /> },
]

const Aside = () => {

    return (
        <div className={`${classes.root} ${classes.flexColumn}`}>
            <IconContext.Provider value={{ className: classes.icons }}>
                <div className={classes.borderedIcons}>
                    <div>
                        <PiUserCirclePlusThin />
                    </div>
                </div>

                {/* Home icon */}
                <div className={classes.flexColumn}>
                    <NavLink to='/' className={classes.iconHighlight}>
                        <PiHouseLineThin />
                    </NavLink>
                    <Text className={classes.iconLabels}>Home</Text>
                </div>

                <hr className={classes.divider} />

                {/* Top bordered icons */}
                {topNavItems.map(({ to, label, icon }) => (
                    <div className={classes.flexColumn} key={label}>
                        <NavLink to={to}>
                            {icon}
                        </NavLink>
                        <Text className={classes.iconLabels}>{label}</Text>
                    </div>
                ))}

                <hr className={classes.divider} />
                
                {/* Bottom bordered icons */}
                <div>
                    <div className={classes.flexColumn}>
                        <PiGearThin />
                        <Text className={classes.iconLabels}>Settings</Text>
                    </div>
                </div>
            </IconContext.Provider>
        </div>
    )
}

export default Aside