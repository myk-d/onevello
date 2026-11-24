import { ThemeProvider, ToastProvider } from 'perkslab-ui';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './i18n/index.ts';
import './index.css';
import { THEME_DEFAULT, THEME_STORAGE_KEY } from './constants/theme.ts';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ToastProvider>
			<ThemeProvider defaultTheme={THEME_DEFAULT} storageKey={THEME_STORAGE_KEY}>
				<App />
			</ThemeProvider>
		</ToastProvider>
	</BrowserRouter>,
);
