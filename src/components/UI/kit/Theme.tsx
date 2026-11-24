import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeChoice = 'system' | 'light' | 'dark';

interface ThemeContextValue {
	theme: ThemeChoice;
	resolvedTheme: 'light' | 'dark';
	setTheme: (theme: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const systemIsDark = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-color-scheme: dark)').matches;

const readStored = (key: string): ThemeChoice | null => {
	try {
		const v = localStorage.getItem(key);
		return v === 'light' || v === 'dark' || v === 'system' ? v : null;
	} catch {
		return null;
	}
};

interface ThemeProviderProps {
	children: React.ReactNode;
	defaultTheme?: ThemeChoice;
	storageKey: string;
}

/** Auto / Light / Dark. Always writes the resolved value to <html data-theme>. The choice persists in localStorage. */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'system', storageKey }) => {
	const [theme, setThemeState] = useState<ThemeChoice>(() => readStored(storageKey) ?? defaultTheme);
	const [systemDark, setSystemDark] = useState(systemIsDark);

	useEffect(() => {
		if (theme !== 'system' || !window.matchMedia) return;
		const query = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => setSystemDark(query.matches);
		onChange();
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	}, [theme]);

	const resolvedTheme: 'light' | 'dark' = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', resolvedTheme);
	}, [resolvedTheme]);

	const setTheme = useCallback(
		(next: ThemeChoice) => {
			setThemeState(next);
			try {
				localStorage.setItem(storageKey, next);
			} catch {
				/* private mode: the choice just will not persist */
			}
		},
		[storageKey],
	);

	const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppTheme = (): ThemeContextValue => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useAppTheme must be used inside ThemeProvider');
	return ctx;
};
