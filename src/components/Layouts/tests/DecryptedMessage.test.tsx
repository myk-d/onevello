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
	it('one-time: title, the "no longer on the server" info alert, mono secret box, no close-window note', () => {
		renderIt();
		expect(screen.getByRole('heading', { level: 1, name: 'decryptedMessage.title' })).toBeInTheDocument();
		const alert = screen.getByText('decryptedMessage.oneTimeWarning').closest('.ov-alert');
		expect(alert).toHaveClass('ov-alert--info');
		expect(screen.getByRole('textbox', { name: 'decryptedMessage.label' })).toHaveTextContent('hello');
		expect(screen.queryByText('decryptedMessage.closeWindowNote')).toBeNull();
		expect(document.querySelector('.ov-alert--danger')).toBeNull();
	});

	it('regular secret: no "removed from the server" claim', () => {
		renderIt({ isOneTime: false });
		expect(screen.queryByText('decryptedMessage.oneTimeWarning')).toBeNull();
		expect(screen.getByRole('heading', { level: 1, name: 'decryptedMessage.titleRegular' })).toBeInTheDocument();
	});

	it('shows name and size on the file row, name only for legacy', () => {
		const { unmount } = renderIt({ fileName: 'a.txt', fileSize: 12, onDownloadFile: async () => {} });
		expect(screen.getByText('a.txt · 12 B')).toBeInTheDocument();
		unmount();
		renderIt({ fileName: 'a.txt', onDownloadFile: async () => {} });
		expect(screen.getByText('a.txt')).toBeInTheDocument();
	});

	it('has a ghost "create your own secret" button', () => {
		renderIt();
		expect(screen.getByRole('button', { name: 'decryptedMessage.createSecret' })).toHaveClass('ov-btn--ghost');
	});

	it('offers a download button only when the secret has a file', () => {
		const { unmount } = renderIt();
		expect(screen.queryByRole('button', { name: 'decryptedMessage.downloadOnce' })).toBeNull();
		unmount();
		renderIt({ fileName: 'a.txt', onDownloadFile: async () => {} });
		expect(screen.getByRole('button', { name: 'decryptedMessage.downloadOnce' })).toBeInTheDocument();
		expect(screen.getByText('a.txt')).toBeInTheDocument();
	});
});
