import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it } from 'vitest';
import i18n from '../../i18n';
import Home from '../Home';

const renderHome = async (lng: 'en' | 'uk') => {
	await i18n.changeLanguage(lng);
	return render(
		<I18nextProvider i18n={i18n}>
			<MemoryRouter>
				<Home />
			</MemoryRouter>
		</I18nextProvider>,
	);
};

describe.each(['en', 'uk'] as const)('landing (%s)', (lng) => {
	beforeEach(() => localStorage.clear());

	it('renders one h1 and the sections in order', async () => {
		await renderHome(lng);
		expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
		expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(6);
		expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(5);
	});

	it('lists exactly 4 not-protected items', async () => {
		await renderHome(lng);
		expect(within(screen.getByTestId('not-protected')).getAllByRole('listitem')).toHaveLength(4);
	});

	it('renders the FAQ with native details and no stale home keys', async () => {
		const { container } = await renderHome(lng);
		expect(container.querySelectorAll('details')).toHaveLength(6);
		expect(container.textContent).not.toMatch(/landing\.|home\./);
	});
});
