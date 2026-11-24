import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { ThemeProvider, ToastRegion } from './components/UI/kit';
import './i18n/index.ts';
import './index.css';
import { THEME_DEFAULT, THEME_STORAGE_KEY } from './constants/theme.ts';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ThemeProvider defaultTheme={THEME_DEFAULT} storageKey={THEME_STORAGE_KEY}>
			<App />
			<ToastRegion />
		</ThemeProvider>
	</BrowserRouter>,
);
