import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const getById = vi.fn();
const del = vi.fn();
const update = vi.fn();
const deleteImage = vi.fn();

vi.mock('../../config/firebase.config', () => ({
	dbMessages: {
		getById: (...a: unknown[]) => getById(...a),
		delete: (...a: unknown[]) => del(...a),
		update: (...a: unknown[]) => update(...a),
	},
	deleteImageFromStorage: (...a: unknown[]) => deleteImage(...a),
}));
vi.mock('secure-channel-sdk', () => ({ PasswordChannel: { decrypt: vi.fn() } }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

import SecretID from '../SecretID';

const base = { id: 'abc', expiration: dayjs().add(1, 'day').toISOString(), attempts: 0 };
const renderPage = () =>
	render(
		<MemoryRouter initialEntries={['/secret/abc']}>
			<Routes>
				<Route path="/secret/:id" element={<SecretID />} />
			</Routes>
		</MemoryRouter>,
	);

describe('SecretID sealed gate', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		del.mockResolvedValue(undefined);
	});

	it('shows the gate for a one-time secret and deletes nothing on load or unmount', async () => {
		getById.mockResolvedValue({ ...base, oneTime: true });
		const { unmount } = renderPage();

		expect(await screen.findByRole('button', { name: 'secretId.gate.button' })).toBeInTheDocument();
		expect(screen.queryByPlaceholderText('form.passphrasePlaceholder')).not.toBeInTheDocument();
		unmount();

		expect(del).not.toHaveBeenCalled();
		expect(deleteImage).not.toHaveBeenCalled();
	});

	it('deletes exactly once on click, then reveals the passphrase prompt', async () => {
		getById.mockResolvedValue({ ...base, oneTime: true });
		renderPage();

		fireEvent.click(await screen.findByRole('button', { name: 'secretId.gate.button' }));

		expect(await screen.findByPlaceholderText('form.passphrasePlaceholder')).toBeInTheDocument();
		expect(del).toHaveBeenCalledTimes(1);
		expect(del).toHaveBeenCalledWith('abc');
	});

	it('does not reveal when the delete fails and keeps the gate with an error', async () => {
		getById.mockResolvedValue({ ...base, oneTime: true });
		del.mockRejectedValue(new Error('offline'));
		renderPage();

		fireEvent.click(await screen.findByRole('button', { name: 'secretId.gate.button' }));

		expect(await screen.findByRole('alert')).toHaveTextContent('secretId.gate.error');
		expect(screen.queryByPlaceholderText('form.passphrasePlaceholder')).not.toBeInTheDocument();
		await waitFor(() => expect(screen.getByRole('button', { name: 'secretId.gate.button' })).toBeEnabled());
	});

	it('skips the gate for regular secrets and deletes nothing', async () => {
		getById.mockResolvedValue({ ...base, oneTime: false });
		renderPage();

		expect(await screen.findByPlaceholderText('form.passphrasePlaceholder')).toBeInTheDocument();
		expect(screen.queryByText('secretId.gate.button')).not.toBeInTheDocument();
		expect(del).not.toHaveBeenCalled();
	});
});
