import '@testing-library/jest-dom';
import { act, fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { groupLinkId } from '../../../utils/groupLinkId';

vi.mock('react-i18next', () => ({
	useTranslation: () => ({ t: (k: string, o?: { date?: string }) => (o?.date ? `${k}|${o.date}` : k) }),
}));

import EncryptedMessageLink from '../EncryptedMessageLink';

const expiration = dayjs('2026-11-25T14:00:00').toISOString();
const writeText = vi.fn();

describe('groupLinkId', () => {
	it('groups by 4', () => {
		expect(groupLinkId('abcdefghij')).toEqual(['abcd', 'efgh', 'ij']);
	});
});

describe('EncryptedMessageLink', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		writeText.mockClear();
		Object.assign(navigator, { clipboard: { writeText } });
	});
	afterEach(() => vi.useRealTimers());

	const renderIt = (summary = { oneTime: true, expiration, fileName: 'a.conf' }) =>
		render(<EncryptedMessageLink id="abcdefghij" summary={summary} clearId={() => {}} />);

	it('shows grouped link but copies the plain URL', () => {
		renderIt();
		expect(screen.getByTestId('grouped-link').textContent).toBe(`${window.location.origin}/secret/abcdefghij`);
		fireEvent.click(screen.getByText('encryptedLink.copyToClipboard'));
		expect(writeText).toHaveBeenCalledWith(`${window.location.origin}/secret/abcdefghij`);
	});

	it('shows Copied and toast for 1.5 s in a polite live region', () => {
		const { container } = renderIt();
		fireEvent.click(screen.getByText('encryptedLink.copyToClipboard'));
		expect(screen.getByText('encryptedLink.copied')).toBeInTheDocument();
		expect(screen.getByTestId('copied-toast').parentElement).toHaveAttribute('aria-live', 'polite');
		expect(container.querySelector('[aria-live="polite"]')).not.toBeNull();
		act(() => vi.advanceTimersByTime(1499));
		expect(screen.getByText('encryptedLink.copied')).toBeInTheDocument();
		act(() => vi.advanceTimersByTime(2));
		expect(screen.queryByText('encryptedLink.copied')).toBeNull();
		expect(screen.queryByTestId('copied-toast')).toBeNull();
	});

	it('always shows the passphrase reminder, chips and steps with real expiry', () => {
		renderIt();
		expect(screen.getByText('encryptedLink.reminderTitle')).toBeInTheDocument();
		expect(screen.getByText('encryptedLink.chips.oneTime')).toBeInTheDocument();
		expect(screen.getByText('encryptedLink.chips.expires|25.11.2026 14:00')).toBeInTheDocument();
		expect(screen.getByText('a.conf')).toBeInTheDocument();
		expect(screen.getByText('encryptedLink.next.step3OneTimeDesc|25.11.2026 14:00')).toBeInTheDocument();
	});

	it('non-one-time without file', () => {
		renderIt({ oneTime: false, expiration, fileName: undefined as unknown as string });
		expect(screen.getByText('encryptedLink.chips.regular')).toBeInTheDocument();
		expect(screen.getByText('encryptedLink.next.step3Desc|25.11.2026 14:00')).toBeInTheDocument();
		expect(screen.queryByText('a.conf')).toBeNull();
	});

	it('has no open-in-new-tab link, shows the file chip with size, and the ghost My secrets only when given', () => {
		const { rerender } = render(
			<EncryptedMessageLink id="abcdefghij" summary={{ oneTime: false, expiration, fileName: 'a.conf', fileSize: 2048 }} clearId={() => {}} />,
		);
		expect(screen.queryByRole('link')).toBeNull();
		expect(screen.getByText('a.conf · 2.0 KB')).toBeInTheDocument();
		expect(screen.queryByText('dashboard.heading')).toBeNull();
		const onShowMine = vi.fn();
		rerender(<EncryptedMessageLink id="abcdefghij" summary={{ oneTime: false, expiration }} clearId={() => {}} onShowMine={onShowMine} />);
		fireEvent.click(screen.getByText('dashboard.heading'));
		expect(onShowMine).toHaveBeenCalled();
	});

	it('puts title and subtext outside the card and the copy button inline in the link field', () => {
		const { container } = renderIt();
		const card = container.querySelector('.ov-card') as HTMLElement;
		expect(card.contains(screen.getByRole('heading', { level: 1 }))).toBe(false);
		expect(screen.getByTestId('grouped-link').closest('.ov-copy')?.querySelector('button')).not.toBeNull();
	});
});
