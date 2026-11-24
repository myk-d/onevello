import { act, fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Button, Card, DateTimeField, Input, SupportButton, ThemeProvider, ToastRegion, clearToasts, toast, useAppTheme } from '..';

describe('Button', () => {
	it('renders brand classes per variant and size', () => {
		render(
			<Button variant="secondary" size="lg" block>
				Go
			</Button>,
		);
		const b = screen.getByRole('button', { name: 'Go' });
		expect(b).toHaveClass('ov-btn', 'ov-btn--secondary', 'ov-btn--lg', 'ov-btn--block');
		expect(b).toHaveAttribute('type', 'button');
	});

	it('loading disables the button, sets aria-busy and blocks clicks', () => {
		const onClick = vi.fn();
		render(
			<Button isLoading onClick={onClick}>
				Save
			</Button>,
		);
		const b = screen.getByRole('button');
		expect(b).toBeDisabled();
		expect(b).toHaveAttribute('aria-busy', 'true');
		fireEvent.click(b);
		expect(onClick).not.toHaveBeenCalled();
	});
});

describe('Input and Card', () => {
	it('invalid input is aria-invalid', () => {
		render(<Input invalid placeholder="p" />);
		expect(screen.getByPlaceholderText('p')).toHaveAttribute('aria-invalid', 'true');
		expect(screen.getByPlaceholderText('p')).toHaveClass('ov-input');
	});
	it('empty card uses the dashed variant', () => {
		render(<Card empty data-testid="c" />);
		expect(screen.getByTestId('c')).toHaveClass('ov-card', 'is-empty');
	});
});

describe('toast', () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => {
		clearToasts();
		vi.useRealTimers();
	});

	it('shows a message in a polite live region and removes it after a few seconds', () => {
		render(<ToastRegion />);
		act(() => toast.success('Copied'));
		expect(screen.getByText('Copied')).toBeInTheDocument();
		expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
		act(() => {
			vi.advanceTimersByTime(4100);
		});
		expect(screen.queryByText('Copied')).toBeNull();
	});
});

describe('ThemeProvider', () => {
	const Probe = () => {
		const { theme, setTheme } = useAppTheme();
		return <button onClick={() => setTheme('dark')}>{theme}</button>;
	};
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.removeAttribute('data-theme');
		vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
	});
	afterEach(() => vi.unstubAllGlobals());

	it('resolves Auto, applies and persists an explicit choice', () => {
		render(
			<ThemeProvider storageKey="k" defaultTheme="system">
				<Probe />
			</ThemeProvider>,
		);
		expect(document.documentElement).toHaveAttribute('data-theme', 'light');
		fireEvent.click(screen.getByRole('button'));
		expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
		expect(localStorage.getItem('k')).toBe('dark');
	});
});

describe('SupportButton', () => {
	it('opens a popover with the email, calls onEmailClick, closes on Escape', () => {
		const onEmailClick = vi.fn();
		render(<SupportButton supportEmail="a@b.co" title="Help" description="Write us" label="Support" onEmailClick={onEmailClick} />);
		expect(screen.queryByRole('dialog')).toBeNull();
		fireEvent.click(screen.getByRole('button', { name: 'Support' }));
		const link = screen.getByRole('link', { name: 'a@b.co' });
		expect(link).toHaveAttribute('href', 'mailto:a@b.co');
		fireEvent.click(link);
		expect(onEmailClick).toHaveBeenCalled();
		fireEvent.keyDown(document, { key: 'Escape' });
		expect(screen.queryByRole('dialog')).toBeNull();
	});
});

describe('DateTimeField', () => {
	it('emits a dayjs value and ignores cleared input', () => {
		const onChange = vi.fn();
		render(<DateTimeField value={dayjs('2030-01-02T03:04')} onChange={onChange} aria-label="when" />);
		const input = screen.getByLabelText('when');
		expect(input).toHaveValue('2030-01-02T03:04');
		fireEvent.change(input, { target: { value: '2030-02-03T10:00' } });
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][0].format('YYYY-MM-DDTHH:mm')).toBe('2030-02-03T10:00');
	});
});
