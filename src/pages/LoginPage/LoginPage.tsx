import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { useSession } from '@/hooks/useSession';
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared';
import { Card, Text, Title } from '@mantine/core';
import { Navigate, useSearchParams } from 'react-router-dom';
import classes from './LoginPage.module.css';
import { Container } from '@mantine/core';

const allowedViews: ViewType[] = [
  'sign_in',
  'sign_up',
  'magic_link',
  'forgotten_password',
  'update_password'
]

const LoginPage = () => {
  const { session, supabase } = useSession();
  const [searchParams] = useSearchParams();
  const rawView: string = searchParams.get('view')?.replace('-', '_') ?? 'sign_in';
  const view: ViewType = allowedViews.includes(rawView as ViewType) ?
    (rawView as ViewType) : 'sign_in';  // default to sign in

  if (session) {
    return <Navigate to="/" replace />;
  }
  return (
    <Container className={classes.authContainer}>
      <Card shadow='xs'>
        <Title fz={24}>
          Sign In
        </Title>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#2563eb',
                  brandAccent: 'darkblue',
                },
              },
            },
          }}
          view={view}
          providers={['google', 'github']}
        />
      </Card>
    </Container>
  )
}

export default LoginPage