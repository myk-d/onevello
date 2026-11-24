import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

import DecryptedMessage from '../DecryptedMessage';

const renderIt = (props: Partial<React.ComponentProps<typeof DecryptedMessage>> = {}) =>
	render(
		<MemoryRouter>
			<DecryptedMessage message="hello" isOneTime {...props} />
		</MemoryRouter>,
	);

describe('DecryptedMessage', () => {
	it('shows the close-window note as a neutral alert, not as an error', () => {
		renderIt();
		const note = screen.getByText('decryptedMessage.closeWindowNote').closest('.ov-alert');
		expect(note).not.toBeNull();
		expect(note).not.toHaveClass('ov-alert--danger');
		expect(note).toHaveAttribute('role', 'status');
	});

	it('offers a download button only when the secret has a file', () => {
		const { unmount } = renderIt();
		expect(screen.queryByRole('button', { name: 'decryptedMessage.downloadFile' })).toBeNull();
		unmount();
		renderIt({ fileName: 'a.txt', onDownloadFile: async () => {} });
		expect(screen.getByRole('button', { name: 'decryptedMessage.downloadFile' })).toBeInTheDocument();
		expect(screen.getByText('a.txt')).toBeInTheDocument();
	});
});
