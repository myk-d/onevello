import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '../../UI/kit';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k, i18n: { language: 'en', changeLanguage: vi.fn() } }) }));
vi.mock('../../../context/useAuth', () => ({
	useAuth: () => ({ user: { photoURL: null, displayName: 'A' }, isAdmin: true, signIn: vi.fn(), signOut: vi.fn() }),
}));

import Header from '../Header';

describe('Header', () => {
	it('collapses links, language and theme into a menu that toggles', () => {
		vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
		render(
			<MemoryRouter>
				<ThemeProvider storageKey="t">
					<Header />
				</ThemeProvider>
			</MemoryRouter>,
		);
		const toggle = screen.getByRole('button', { name: 'header.menu' });
		expect(toggle).toHaveAttribute('aria-expanded', 'false');
		expect(document.getElementById('site-menu')).toHaveClass('hidden');

		fireEvent.click(toggle);
		expect(screen.getByRole('button', { name: 'header.menuClose' })).toHaveAttribute('aria-expanded', 'true');
		expect(document.getElementById('site-menu')).not.toHaveClass('hidden');
		expect(screen.getByRole('link', { name: 'header.nav.dashboard' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'header.nav.admin' })).toBeInTheDocument();

		fireEvent.click(screen.getByRole('link', { name: 'header.nav.dashboard' }));
		expect(screen.getByRole('button', { name: 'header.menu' })).toHaveAttribute('aria-expanded', 'false');
		vi.unstubAllGlobals();
	});
});
