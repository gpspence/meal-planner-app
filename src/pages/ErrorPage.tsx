import React from 'react'
import { Container, Paper, Stack, Title, Text, Code, Button } from '@mantine/core';
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom'

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate()
    console.error(error);

    let title = "Something went wrong";
    let description = "An unexpected error occurred.";
    let details = "";

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        description = error.data || description;
    } else if (error instanceof Error) {
        details = error.message;
    } else if (typeof error === 'string') {
        details = error;
    }

    return (
        <Container size='sm' mt='xl'>
            <Paper radius='md' p='xl' withBorder>
                <Stack gap='md'>
                    <Title order={2} c='red'>
                        {title}
                    </Title>
                    <Text>{description}</Text>
                    {details && (
                        <Code block>
                            {details}
                        </Code>
                    )}
                    <Button
                    color='#2563eb'
                    onClick={() => navigate('/')}
                    >
                        Go back home
                    </Button>
                </Stack>
            </Paper>
        </Container>
    )
}

export default ErrorPage