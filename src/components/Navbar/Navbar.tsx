import { Title, Container, Tabs } from '@mantine/core';
import { FaCalendarDay } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Navbar.module.css';

interface TabRoutes {
    Planner: string
    Recipes: string
    Analytics: string
}

const Navbar = () => {

    const navigate = useNavigate();
    const { tabValue } = useParams();
    const tabRoutes: TabRoutes = {
        Planner: '/',
        Recipes: '/recipes',
        Analytics: '/analytics'
    }

    return (
        <Container size="responsive">
            <Title order={2}>Weekly Meal Planner</Title>
            <Tabs
                value={tabValue}
                onChange={(value) => navigate(tabRoutes[value ? value as keyof TabRoutes : "Planner"])}
            >
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