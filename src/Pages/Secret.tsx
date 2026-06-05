import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { themeHexColors, ToastService, useAppTheme } from 'perkslab-ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PasswordChannel } from 'secure-channel-sdk';
import EncryptedMessageForm from '../components/Layouts/EncryptedMessageForm';
import EncryptedMessageLink from '../components/Layouts/EncryptedMessageLink';
import { dbMessages } from '../config/firebase.config';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { CreateMessageSchema, CreateMessageType, MessageType } from '../models/Message/message';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';

const Secret = () => {
	const { theme } = useAppTheme();
	const currentHex = themeHexColors[theme as keyof typeof themeHexColors] || themeHexColors.default;

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		control,
		reset,
		setValue,
		formState: { errors },
	} = useForm<CreateMessageType>({
		resolver: zodResolver(CreateMessageSchema),
		defaultValues: {
			expiration: dayjs().add(1, 'day').toISOString(),
			createdAt: dayjs().toISOString(),
			oneTime: false,
			text: '',
			passphrase: '',
		},
	});

	const [encryptedMessageId, setEncryptedMessageId] = useState<string | null>(null);

	const onSubmit: SubmitHandler<CreateMessageType> = async (data) => {
		setIsSubmitting(true);

		try {
			const encryptedPkg = await PasswordChannel.encrypt(data.passphrase, data.text);

			const messageToSave: Omit<MessageType, 'id'> = {
				...encryptedPkg,
				createdAt: data.createdAt,
				expiration: data.expiration || dayjs().add(1, 'day').toISOString(),
				oneTime: data.oneTime,
			};

			const result = await dbMessages.create(messageToSave);

			localStorage.setItem(isSecretWasCreatedOnDeviceStorageKey, 'true');
			setEncryptedMessageId(result.id);
		} catch (error) {
			if (NODE_ENV_DEV) console.error('Error:', error);
			ToastService.error('Failed to create secret. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const generateRandomPassphrase = () => {
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5;

		let passphrase = '';
		for (let i = 0; i < length; i++) {
			passphrase += characters.charAt(Math.floor(Math.random() * characters.length));
		}

		setValue('passphrase', passphrase);
		navigator.clipboard.writeText(passphrase);
		ToastService.success('Passphrase copied to clipboard!');
	};

	return (
		<>
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
				{encryptedMessageId ? (
					<EncryptedMessageLink
						id={encryptedMessageId}
						clearId={() => {
							setEncryptedMessageId(null);
							reset();
						}}
					/>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="w-full">
						<EncryptedMessageForm
							register={register}
							errors={errors}
							control={control}
							generateRandomPassphrase={generateRandomPassphrase}
							currentHex={currentHex}
							isDisabled={isSubmitting}
							isLoading={isSubmitting}
						/>
					</form>
				)}
			</section>
		</>
	);
};

export default Secret;
