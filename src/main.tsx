import ReactDOM from 'react-dom/client';
import App from './App';
import { StrictMode } from 'react';
import '@mantine/notifications/styles.css';        

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
