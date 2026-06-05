import { ThemeProvider, ToastProvider } from 'perkslab-ui';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './i18n/index.ts';
import './index.css';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ToastProvider>
			<ThemeProvider>
				<App />
			</ThemeProvider>
		</ToastProvider>
	</BrowserRouter>,
);
