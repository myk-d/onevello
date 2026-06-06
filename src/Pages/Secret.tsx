import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { themeHexColors, ToastService, useAppTheme } from 'perkslab-ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PasswordChannel } from 'secure-channel-sdk';
import EncryptedMessageForm from '../components/Layouts/EncryptedMessageForm';
import EncryptedMessageLink from '../components/Layouts/EncryptedMessageLink';
import { dbMessages, firebaseStorageDirectories, uploadImageToStorage } from '../config/firebase.config';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { CreateMessageSchema, CreateMessageType, MessageType } from '../models/Message/message';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';

const fileToBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve((reader.result as string).split(',')[1]);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

const Secret = () => {
	const { theme } = useAppTheme();
	const { t } = useTranslation();
	const currentHex = themeHexColors[theme as keyof typeof themeHexColors] || themeHexColors.default;

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [attachedFile, setAttachedFile] = useState<File | null>(null);

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

			let fileUrl: string | undefined;
			let fileName: string | undefined;
			let fileType: string | undefined;

			if (attachedFile) {
				const base64 = await fileToBase64(attachedFile);
				const encryptedFile = await PasswordChannel.encrypt(data.passphrase, base64);
				const storageName = `${Date.now()}_${attachedFile.name}`;
				const blob = new Blob([JSON.stringify(encryptedFile)], { type: 'application/json' });
				const fileObj = new File([blob], storageName, { type: 'application/json' });
				fileUrl = await uploadImageToStorage(firebaseStorageDirectories.messageMedia, fileObj, storageName);
				fileName = attachedFile.name;
				fileType = attachedFile.type;
			}

			const messageToSave: Omit<MessageType, 'id'> = {
				...encryptedPkg,
				createdAt: data.createdAt,
				expiration: data.expiration || dayjs().add(1, 'day').toISOString(),
				oneTime: data.oneTime,
				fileUrl,
				fileName,
				fileType,
			};

			const result = await dbMessages.create(messageToSave);

			localStorage.setItem(isSecretWasCreatedOnDeviceStorageKey, 'true');
			setEncryptedMessageId(result.id);
		} catch (error) {
			if (NODE_ENV_DEV) console.error('Error:', error);
			ToastService.error(attachedFile ? t('toasts.fileUploadFailed') : t('toasts.failedToCreate'));
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
		ToastService.success(t('toasts.passphraseCopied'));
	};

	return (
		<>
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
				{encryptedMessageId ? (
					<EncryptedMessageLink
						id={encryptedMessageId}
						clearId={() => {
							setEncryptedMessageId(null);
							setAttachedFile(null);
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
							attachedFile={attachedFile}
							onFileChange={setAttachedFile}
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
