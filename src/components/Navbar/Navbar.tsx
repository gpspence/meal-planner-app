import { Title, Container, Tabs, Text, Flex, Button } from '@mantine/core';
import { FaCalendarDay } from 'react-icons/fa';
import { GiCook } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';
import { useLocation, useNavigate, useParams, } from 'react-router-dom';
import PlannerTitle from '../PlannerTitle/PlannerTitle';
import ColorSchemeToggle from '../ColorSchemeToggle/ColorSchemeToggle';

interface TabRoutes {
    Planner: string
    Recipes: string
    Analytics: string
}

interface NavbarProps {
    onOpenModal: () => void;
}

const Navbar = ({onOpenModal}: NavbarProps) => {

    const navigate = useNavigate();
    const location = useLocation();
    const { tabValue } = useParams();

    const tabRoutes: TabRoutes = {
        Planner: '/',
        Recipes: '/recipes',
        Analytics: '/analytics'
    }

    const tabTitleMap: Record<string, keyof TabRoutes> = {
        '/': 'Planner',
        '/recipes': 'Recipes',
        '/analytics': 'Analytics'
    }

    const currentPath: string = location.pathname;
    const tabTitle: string = tabTitleMap[currentPath] || 'Planner'

    return (
        <Container size="responsive" mb={12}>
            <Flex justify='space-between' mt={5}>
                <PlannerTitle tabTitle={tabTitle} />
                <Flex gap={10}>
                    <Button size='xs' onClick={onOpenModal}>
                        Add new recipe
                    </Button>
                    <ColorSchemeToggle />
                </Flex>
            </Flex>
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

export { Navbar as default, type TabRoutes };