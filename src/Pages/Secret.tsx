import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PasswordChannel } from 'secure-channel-sdk';
import EncryptedMessageForm from '../components/Layouts/EncryptedMessageForm';
import EncryptedMessageLink, { CreatedSecretSummary } from '../components/Layouts/EncryptedMessageLink';
import { dbMessages, firebaseStorageDirectories, uploadImageToStorage } from '../config/firebase.config';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { useAuth } from '../context/useAuth';
import { CreateMessageSchema, CreateMessageType, MessageType } from '../models/Message/message';
import { encryptFileMeta, opaqueStorageName } from '../utils/fileMeta';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';
import { cn } from '../utils/cn';
import { toast } from '../components/UI/kit';

const fileToBase64 = (file: File): Promise<string> =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve((reader.result as string).split(',')[1]);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

const Secret = () => {
	const { t } = useTranslation();
	const { user } = useAuth();

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
	const [summary, setSummary] = useState<CreatedSecretSummary | null>(null);

	const onSubmit: SubmitHandler<CreateMessageType> = async (data) => {
		setIsSubmitting(true);

		try {
			const encryptedPkg = await PasswordChannel.encrypt(data.passphrase, data.text);

			let fileUrl: string | undefined;
			let fileMeta: string | undefined;

			if (attachedFile) {
				const base64 = await fileToBase64(attachedFile);
				const encryptedFile = await PasswordChannel.encrypt(data.passphrase, base64);
				const storageName = opaqueStorageName();
				const blob = new Blob([JSON.stringify(encryptedFile)], { type: 'application/json' });
				const fileObj = new File([blob], storageName, { type: 'application/json' });
				fileUrl = await uploadImageToStorage(firebaseStorageDirectories.messageMedia, fileObj, storageName);
				fileMeta = await encryptFileMeta(data.passphrase, { name: attachedFile.name, type: attachedFile.type });
			}

			const messageToSave: Omit<MessageType, 'id'> = {
				...encryptedPkg,
				createdAt: data.createdAt,
				expiration: data.expiration || dayjs().add(1, 'day').toISOString(),
				oneTime: data.oneTime,
				...(fileUrl ? { fileUrl, fileMeta } : {}),
				...(user ? { userId: user.uid, opened: false } : {}),
			};

			const result = await dbMessages.create(messageToSave);

			localStorage.setItem(isSecretWasCreatedOnDeviceStorageKey, 'true');
			setSummary({ oneTime: data.oneTime, expiration: messageToSave.expiration, fileName: attachedFile?.name });
			setEncryptedMessageId(result.id);
		} catch (error) {
			if (NODE_ENV_DEV) console.error('Error:', error);
			toast.error(attachedFile ? t('toasts.fileUploadFailed') : t('toasts.failedToCreate'));
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
		toast.success(t('toasts.passphraseCopied'));
	};

	return (
		<>
			<section className={cn("mx-auto flex w-full flex-col gap-5 px-4 py-8 md:py-14", encryptedMessageId && summary ? "max-w-[680px]" : "max-w-[960px]")}>
				{encryptedMessageId && summary ? (
					<EncryptedMessageLink
						id={encryptedMessageId}
						summary={summary}
						clearId={() => {
							setEncryptedMessageId(null);
							setSummary(null);
							setAttachedFile(null);
							reset();
						}}
					/>
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5 text-left">
						<div className="flex flex-col gap-2">
							<h1 className="font-heading text-xl font-semibold leading-8 md:text-[32px] md:leading-10">{t('form.title')}</h1>
							<p className="text-muted">{t('form.lead')}</p>
						</div>
						<EncryptedMessageForm
							register={register}
							errors={errors}
							control={control}
							generateRandomPassphrase={generateRandomPassphrase}
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
