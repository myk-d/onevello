import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme =
	| 'light'
	| 'dark'
	| 'blue-light'
	| 'blue-dark'
	| 'green-light'
	| 'green-dark'
	| 'purple-light'
	| 'purple-dark'
	| 'red-light'
	| 'red-dark'
	| 'yellow-light'
	| 'yellow-dark';

// eslint-disable-next-line react-refresh/only-export-components
export const themeHexColors: Record<string, string> = {
	// Classic themes
	light: '18181b', // Soft black
	dark: 'ffffff', // Pure white

	// Light variants
	'blue-light': '2563eb', // blue-600
	'green-light': '16a34a', // green-600
	'purple-light': '9333ea', // purple-600
	'red-light': 'dc2626', // red-600
	'yellow-light': 'd97706', // yellow-600

	// Dark variants (яскравіші відтінки для контрасту)
	'blue-dark': '60a5fa', // blue-400
	'green-dark': '4ade80', // green-400
	'purple-dark': 'c084fc', // purple-400
	'red-dark': 'f87171', // red-400
	'yellow-dark': 'fbbf24', // yellow-400
};

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>((localStorage.getItem('app-theme') as Theme) || 'default');

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('app-theme', theme);
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useAppTheme must be used within ThemeProvider');
	return context;
};
