import { Title, Container, Tabs, Text, Flex, Button, Menu, Divider } from '@mantine/core';
import PlannerTitle from '../PlannerTitle/PlannerTitle';

const Navbar = () => {

    return (
        <Flex justify='space-between' align='center' p={5}>
            <PlannerTitle tabTitle='Planner' />
            <Flex gap='xs'>
                <Button bg="none">
                    <Text c='black' fz='14'>Sign in</Text>
                </Button>
                <Button bd='2px solid' radius='md'>
                    <Text c='black' fz='14'>Sign up</Text>
                </Button>
            </Flex>
        </Flex>
    )
}

export default Navbar;