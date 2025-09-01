import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared';
import { Navigate, useSearchParams } from 'react-router-dom';
import { BackgroundImage, Card, Container, Title } from '@mantine/core';
import { useSession } from '@/hooks/useSession';
import backgroundImage from '../../img/background2.jpg';
import classes from './LoginPage.module.css';

const allowedViews: ViewType[] = [
  'sign_in',
  'sign_up',
  'magic_link',
  'forgotten_password',
  'update_password',
];

const LoginPage = () => {
  const { session, supabase } = useSession();
  const [searchParams] = useSearchParams();
  const rawView: string = searchParams.get('view')?.replace('-', '_') ?? 'sign_in';
  const view: ViewType = allowedViews.includes(rawView as ViewType)
    ? (rawView as ViewType)
    : 'sign_in'; // default to sign in

  if (session) {
    return <Navigate to="/" replace />;
  }
  return (
    <BackgroundImage src={backgroundImage} h="100vh">
      <Container className={classes.authContainer}>
        <Card shadow="">
          <Title fz={24}>Sign In</Title>
          <Auth
            supabaseClient={supabase}
            redirectTo={window.location.origin}
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
    </BackgroundImage>
  );
};

export default LoginPage;
