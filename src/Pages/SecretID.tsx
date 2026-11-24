import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { PasswordChannel } from 'secure-channel-sdk';
import DecryptedMessage from '../components/Layouts/DecryptedMessage';
import SecretGone from '../components/Layouts/SecretGone';
import SealedGate from '../components/Layouts/SealedGate';
import { Alert, Button, PassphraseInput } from '../components/UI/kit';
import { SecretIDLoader } from '../components/UI/SecretIDLoader';
import { dbMessages, deleteImageFromStorage } from '../config/firebase.config';
import { MessageType } from '../models/Message/message';
import { PassphraseSchema, PassphraseType } from '../models/Passphrase/passphrase';
import { FileMeta, resolveFileMeta } from '../utils/fileMeta';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';

const MAX_ATTEMPTS = 5;

enum FetchStatus {
	Loading = 'loading',
	Gate = 'gate',
	Gone = 'gone',
	Expired = 'expired',
	LockedOut = 'locked',
	LoadError = 'error',
	Ready = 'ready',
}

type FetchState =
	| { status: FetchStatus.Loading }
	| { status: FetchStatus.Gate; message: MessageType }
	| { status: FetchStatus.Gone }
	| { status: FetchStatus.Expired }
	| { status: FetchStatus.LockedOut }
	| { status: FetchStatus.LoadError }
	| { status: FetchStatus.Ready; message: MessageType };

const SecretID = () => {
	const { id } = useParams();
	const { t } = useTranslation();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<PassphraseType>({
		resolver: zodResolver(PassphraseSchema),
		defaultValues: { passphrase: '' },
	});

	const [fetchState, setFetchState] = useState<FetchState>(() => (id ? { status: FetchStatus.Loading } : { status: FetchStatus.Gone }));
	const [decryptedText, setDecryptedText] = useState<string | null>(null);
	const [currentPassphrase, setCurrentPassphrase] = useState<string | null>(null);
	const [fileMeta, setFileMeta] = useState<FileMeta | undefined>(undefined);

	const [reloadKey, setReloadKey] = useState(0);
	// Set after a wrong passphrase: shown as a danger alert next to the field, never as a toast.
	const [wrongText, setWrongText] = useState<string | null>(null);

	const handleRetry = () => {
		setFetchState({ status: FetchStatus.Loading });
		setReloadKey((k) => k + 1);
	};

	useEffect(() => {
		if (!id) return;

		let cancelled = false;

		const load = async () => {
			try {
				const message = await dbMessages.getById(id);

				if (cancelled) return;

				// Only what the client knows: no document -> gone (opened or never existed), expiration passed -> expired,
				// too many attempts -> locked out. A failed fetch is handled in the catch and never deletes anything.
				if (!message) {
					setFetchState({ status: FetchStatus.Gone });
					return;
				}

				const isExpired = dayjs(message.expiration).isBefore(dayjs());
				if (isExpired || (message.attempts ?? 0) >= MAX_ATTEMPTS) {
					setFetchState({ status: isExpired ? FetchStatus.Expired : FetchStatus.LockedOut });
					// Best-effort cleanup: a failure here must not turn this screen into a load error.
					try {
						await dbMessages.delete(message.id);
						if (message.fileUrl) await deleteImageFromStorage(message.fileUrl);
					} catch (cleanupError) {
						if (NODE_ENV_DEV) console.error(cleanupError);
					}
					return;
				}

				// One-time secrets wait behind the sealed gate: loading the page must never delete them.
				if (message.oneTime) {
					setFetchState({ status: FetchStatus.Gate, message });
					return;
				}

				setFetchState({ status: FetchStatus.Ready, message });
			} catch (error) {
				if (NODE_ENV_DEV) console.error(error);
				if (!cancelled) setFetchState({ status: FetchStatus.LoadError });
			}
		};

		load();

		return () => {
			cancelled = true;
		};
	}, [id, reloadKey]);

	const [opening, setOpening] = useState(false);
	const [openFailed, setOpenFailed] = useState(false);

	// The only place a one-time secret is deleted before reveal. If the delete fails, stay at the gate with the secret intact.
	const handleBreakSeal = async () => {
		if (fetchState.status !== FetchStatus.Gate || opening) return;

		const { message } = fetchState;
		setOpening(true);
		setOpenFailed(false);

		let deleted: boolean;
		try {
			// Read and delete in one transaction: someone else may have already broken the seal.
			deleted = await dbMessages.deleteIfExists(message.id);
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
			setOpenFailed(true);
			setOpening(false);
			return;
		}

		setOpening(false);
		if (!deleted) {
			setFetchState({ status: FetchStatus.Gone });
			return;
		}
		setFetchState({ status: FetchStatus.Ready, message });
	};

	const onSubmit: SubmitHandler<PassphraseType> = async (data) => {
		if (fetchState.status !== FetchStatus.Ready) return;

		const { message } = fetchState;
		setWrongText(null);

		try {
			const decryptedPkg = await PasswordChannel.decrypt(data.passphrase, message);
			// Text first: a wrong passphrase fails here and counts once. The file name and type are decrypted only afterwards.
			setFileMeta(await resolveFileMeta(data.passphrase, message));
			setDecryptedText(decryptedPkg);
			setCurrentPassphrase(data.passphrase);

			if (!message.oneTime && message.userId && !message.opened) {
				try {
					await dbMessages.update({ id: message.id, opened: true });
				} catch (updateError) {
					if (NODE_ENV_DEV) console.error('Failed to mark opened:', updateError);
				}
			}
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);

			const newAttempts = (message.attempts ?? 0) + 1;

			if (!message.oneTime) {
				try {
					await dbMessages.update({ id: message.id, attempts: newAttempts });
				} catch (updateError) {
					if (NODE_ENV_DEV) console.error('Failed to update attempts:', updateError);
				}
			}

			if (newAttempts >= MAX_ATTEMPTS) {
				if (!message.oneTime) {
					try {
						await dbMessages.delete(message.id);
					} catch (deleteError) {
						if (NODE_ENV_DEV) console.error('Failed to delete message:', deleteError);
					}
				}
				setFetchState({ status: FetchStatus.LockedOut });
				return;
			}

			setFetchState({ status: FetchStatus.Ready, message: { ...message, attempts: newAttempts } });

			const errMsg = error instanceof Error ? error.message : '';
			setWrongText(
				errMsg.includes('Too many failed attempts') ? errMsg : t('secretId.pass.wrong', { count: MAX_ATTEMPTS - newAttempts }),
			);
			reset();
		}
	};

	if (
		fetchState.status === FetchStatus.Gone ||
		fetchState.status === FetchStatus.Expired ||
		fetchState.status === FetchStatus.LockedOut ||
		fetchState.status === FetchStatus.LoadError
	) {
		return <SecretGone variant={fetchState.status} onRetry={handleRetry} />;
	}
	if (fetchState.status === FetchStatus.Loading) return <SecretIDLoader />;
	if (fetchState.status === FetchStatus.Gate) {
		return <SealedGate message={fetchState.message} opening={opening} failed={openFailed} onOpen={handleBreakSeal} />;
	}

	const { message } = fetchState;

	const handleDownloadFile = async () => {
		if (!message.fileUrl || !fileMeta || !currentPassphrase) return;

		const response = await fetch(message.fileUrl);
		const encryptedPkg = await response.json();
		const base64 = await PasswordChannel.decrypt(currentPassphrase, encryptedPkg);

		const byteChars = atob(base64);
		const byteArr = new Uint8Array(byteChars.length);
		for (let i = 0; i < byteChars.length; i++) {
			byteArr[i] = byteChars.charCodeAt(i);
		}
		const blob = new Blob([byteArr], { type: fileMeta.type });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = fileMeta.name;
		link.click();
		URL.revokeObjectURL(url);

		if (message.oneTime) await deleteImageFromStorage(message.fileUrl);
	};

	return (
		<section className="mx-auto flex w-full max-w-[680px] flex-col gap-5 px-4 py-8 md:py-14">
			{decryptedText ? (
				<DecryptedMessage
					message={decryptedText}
					isOneTime={message.oneTime}
					fileName={fileMeta?.name}
					onDownloadFile={message.fileUrl ? handleDownloadFile : undefined}
				/>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-5 text-left">
					<div className="flex flex-col gap-2">
						<h1 className="font-heading text-xl font-semibold leading-8 md:text-[32px] md:leading-10">{t('secretId.pass.title')}</h1>
						<p className="text-muted">{t('secretId.pass.lead')}</p>
					</div>
					<div className="ov-card">
						<div className="ov-field">
							<label htmlFor="reveal-passphrase">{t('form.passphrase')}</label>
							<PassphraseInput
								id="reveal-passphrase"
								autoComplete="off"
								placeholder={t('form.passphrasePlaceholder')}
								showLabel={t('form.show')}
								hideLabel={t('form.hide')}
								invalid={!!errors.passphrase || !!wrongText}
								{...register('passphrase')}
							/>
							{errors.passphrase && <span className="ov-error">{errors.passphrase.message}</span>}
						</div>

						{wrongText && (
							<Alert variant="danger" role="alert">
								{wrongText} <span className="mono">{message.attempts ?? 0}/{MAX_ATTEMPTS}</span>
							</Alert>
						)}

						<span className="ov-help">
							{t('secretId.pass.attempts')} <span className="mono">{message.attempts ?? 0}/{MAX_ATTEMPTS}</span>
						</span>

						<Button type="submit" block>
							{t('secretId.preview')}
						</Button>
					</div>
				</form>
			)}
		</section>
	);
};

export default SecretID;
