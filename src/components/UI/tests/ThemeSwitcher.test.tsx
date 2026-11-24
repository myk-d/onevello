import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { THEME_DEFAULT, THEME_STORAGE_KEY } from '../../../constants/theme';
import '../../../i18n';
import { ThemeProvider } from '../kit';
import ThemeSwitcher from '../ThemeSwitcher';

const mockSystemDark = (dark: boolean) => {
	vi.stubGlobal(
		'matchMedia',
		vi.fn().mockImplementation((query: string) => ({
			matches: dark && query.includes('dark'),
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
		})),
	);
};

const renderSwitcher = () =>
	render(
		<ThemeProvider defaultTheme={THEME_DEFAULT} storageKey={THEME_STORAGE_KEY}>
			<ThemeSwitcher />
		</ThemeProvider>,
	);

describe('ThemeSwitcher', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute('data-theme');
		mockSystemDark(false);
	});
	afterEach(() => vi.unstubAllGlobals());

	it('offers exactly Auto, Light and Dark', () => {
		renderSwitcher();
		expect(screen.getAllByRole('radio')).toHaveLength(3);
		expect(screen.getByRole('radio', { name: /auto|авто/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /light|світла/i })).toBeInTheDocument();
		expect(screen.getByRole('radio', { name: /dark|темна/i })).toBeInTheDocument();
	});

	it('defaults to Auto and follows the system setting', () => {
		mockSystemDark(true);
		renderSwitcher();
		expect(screen.getByRole('radio', { name: /auto|авто/i })).toHaveAttribute('aria-checked', 'true');
		expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
	});

	it('applies and persists an explicit choice across remounts', () => {
		const first = renderSwitcher();
		fireEvent.click(screen.getByRole('radio', { name: /dark|темна/i }));
		expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
		expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
		first.unmount();

		document.documentElement.removeAttribute('data-theme');
		renderSwitcher();
		expect(screen.getByRole('radio', { name: /dark|темна/i })).toHaveAttribute('aria-checked', 'true');
		expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
	});

	it('Light overrides a dark system', () => {
		mockSystemDark(true);
		renderSwitcher();
		fireEvent.click(screen.getByRole('radio', { name: /light|світла/i }));
		expect(document.documentElement).toHaveAttribute('data-theme', 'light');
	});
});
