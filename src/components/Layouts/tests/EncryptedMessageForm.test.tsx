import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (k: string) => k }) }));

import { CreateMessageType } from '../../../models/Message/message';
import EncryptedMessageForm from '../EncryptedMessageForm';

const generate = vi.fn();
const Harness = () => {
	const { register, control, formState } = useForm<CreateMessageType>({ defaultValues: { text: '', passphrase: '' } });
	return (
		<EncryptedMessageForm
			register={register}
			errors={formState.errors}
			control={control}
			generateRandomPassphrase={generate}
			attachedFile={null}
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
	});

	it('renders no link preview before a link exists', () => {
		render(<Harness />);
		expect(screen.queryByText(/onevello\.myslennya\.com\/secret/)).toBeNull();
	});
});
