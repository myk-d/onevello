import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

import { CreateMessageType } from '../../../models/Message/message';
import EncryptedMessageForm from '../EncryptedMessageForm';

const generate = vi.fn();
const Harness = ({ loading = false, file = null }: { loading?: boolean; file?: File | null }) => {
	const { register, control, formState } = useForm<CreateMessageType>({ defaultValues: { text: '', passphrase: '' } });
	return (
		<EncryptedMessageForm
			register={register}
			errors={formState.errors}
			control={control}
			generateRandomPassphrase={generate}
			attachedFile={file}
			isLoading={loading}
			onFileChange={() => {}}
		/>
	);
};

describe('EncryptedMessageForm', () => {
	it('toggles passphrase visibility with Show / Hide', () => {
		render(<Harness />);
		const input = screen.getByPlaceholderText('form.passphrasePlaceholder');
		expect(input).toHaveAttribute('type', 'password');
		fireEvent.click(screen.getByRole('button', { name: 'form.show' }));
		expect(input).toHaveAttribute('type', 'text');
		fireEvent.click(screen.getByRole('button', { name: 'form.hide' }));
		expect(input).toHaveAttribute('type', 'password');
	});

	it('Generate calls the generator and the strength meter appears once typed', () => {
		render(<Harness />);
		fireEvent.click(screen.getByRole('button', { name: 'form.generate' }));
		expect(generate).toHaveBeenCalled();
		expect(document.querySelector('.ov-meter')).toBeNull();
		fireEvent.change(screen.getByPlaceholderText('form.passphrasePlaceholder'), { target: { value: 'Abcdef12345!' } });
		expect(document.querySelector('.ov-meter')).toHaveAttribute('data-level', '3');
		expect(screen.getByText('form.strength.label')).toBeInTheDocument();
	});

	it('renders no link preview before a link exists', () => {
		render(<Harness />);
		expect(screen.queryByText(/onevello\.myslennya\.com\/secret/)).toBeNull();
	});

	it('sealing state: veil with the seal and message, button says Sealing and is busy', () => {
		render(<Harness loading />);
		expect(document.querySelector('.ov-card')).toHaveClass('is-sealing');
		expect(screen.getByText('form.sealing')).toBeInTheDocument();
		const submit = screen.getByRole('button', { name: 'form.creating' });
		expect(submit).toHaveAttribute('aria-busy', 'true');
		expect(submit).toBeDisabled();
	});

	it('idle: no veil; shows the secret help and the expiry help', () => {
		render(<Harness />);
		expect(screen.queryByText('form.sealing')).toBeNull();
		expect(screen.getByText('form.secretHelp')).toBeInTheDocument();
		expect(screen.getByText(/form\.expiresAt/)).toBeInTheDocument();
	});

	it('filled file row shows name, size, the encrypted-name help and a ghost Remove', () => {
		render(<Harness file={new File(['x'.repeat(2048)], 'vpn.conf')} />);
		expect(screen.getByText('vpn.conf · 2.0 KB')).toBeInTheDocument();
		expect(screen.getByText('form.fileName')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'form.removeFile' })).toHaveClass('ov-btn--ghost');
	});
});
