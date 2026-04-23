import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import { ThemeProvider } from './components/UI/Theme/ThemeContext.tsx';
import { ToastProvider } from './components/UI/Toasts/ToastContext.tsx';
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
