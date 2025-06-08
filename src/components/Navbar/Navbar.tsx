import { Title, Container, Tabs } from '@mantine/core';
import { FaCalendarDay } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';
import classes from './Navbar.module.css';

const Navbar = () => {
    return (
        <Container size="responsive">
            <Title order={2}>Weekly Meal Planner</Title>
            <Tabs defaultValue="Planner">
                <Tabs.List>
                    <Tabs.Tab value="Planner" leftSection={<FaCalendarDay />}>
                        Planner
                    </Tabs.Tab>
                    <Tabs.Tab value="Recipes" leftSection={<GiCook />}>
                        Recipes
                    </Tabs.Tab>
                    <Tabs.Tab value="Analytics" leftSection={<GoGraph />}>
                        Analytics
                    </Tabs.Tab>
                </Tabs.List>
            </Tabs>
        </Container>
    )
}

export default Navbar;