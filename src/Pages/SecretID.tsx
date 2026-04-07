import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { PasswordChannel } from 'secure-channel-sdk';
import z from 'zod';
import DecryptedMessage from '../components/Layouts/DecryptedMessage';
import ExpiredLink from '../components/Layouts/ExpiredLink';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import { SecretIDLoader } from '../components/UI/SecretIDLoader';
import { dbMessages } from '../config/firebase.config';
import { MessageType } from '../models/Message/message';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';

export const PassphraseSchema = z.object({
	passphrase: z.string().trim().min(3, { message: 'Passphrase is required' }),
});

export type PassphraseType = z.infer<typeof PassphraseSchema>;

const SecretID = () => {
	const { id } = useParams();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<PassphraseType>({
		resolver: zodResolver(PassphraseSchema),
		defaultValues: {
			passphrase: '',
		},
	});

	const [isExpired, setIsExpired] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<MessageType | null>(null);
	const [decryptedText, setDecryptedText] = useState<string | null>(null);

	const fetchMessage = useCallback(async () => {
		try {
			if (!id) return;
			setIsLoading(true);
			const message = await dbMessages.getById(id);
			setIsLoading(false);

			if (!message) {
				setIsExpired(true);
				return;
			}

			if (dayjs(message.expiration).isBefore(dayjs())) {
				setIsExpired(true);
				await dbMessages.delete(message.id);
				return;
			}

			if (message.oneTime) {
				console.warn('Delete message');
				await dbMessages.delete(message.id);
			}

			setMessage(message);
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
		}
	}, [id]);

	useEffect(() => {
		const fetchData = async () => {
			await fetchMessage();
		};

		fetchData();
	}, [fetchMessage, id]);

	const onSubmit: SubmitHandler<PassphraseType> = async (data) => {
		try {
			if (!message) return;

			const dencryptedPkg = await PasswordChannel.decrypt(data.passphrase, message);

			setDecryptedText(dencryptedPkg);
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
		} finally {
			reset();
		}
	};

	if (isExpired) return <ExpiredLink />;

	if (isLoading) return <SecretIDLoader />;

	return (
		<>
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
				{decryptedText ? (
					<DecryptedMessage message={decryptedText} isOneTime={message?.oneTime} />
				) : (
					<form onSubmit={handleSubmit(onSubmit)} className="w-full">
						<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 ">
							<div className="flex justify-between gap-6 flex-wrap">
								{/* passphrase */}
								<div className="flex-1 flex flex-col items-start">
									<label className="block text-sm font-bold mb-2 uppercase tracking-wider">Passphrase</label>

									<Input
										type="password"
										placeholder="Enter passphrase"
										className={errors.passphrase ? 'border-red-500' : ''}
										{...register('passphrase')}
									/>
									{errors.passphrase && <span className="text-red-500 text-xs mt-1">{errors.passphrase.message}</span>}
								</div>
							</div>

							<div className="bg-cyan-100 py-2 px-3 rounded-md italic text-cyan-800 border-l-[3px] border-cyan-800">
								<p className="text-left text-sm">
									{message?.oneTime
										? 'This message is one-time access and will self-destruct after being viewed.'
										: 'This message can be viewed until it expires.'}
								</p>
							</div>

							{/* buttons */}
							<div className="flex justify-between gap-6 flex-wrap">
								<Button type="submit" variant="default" size="full" className="flex-1 gap-2">
									Preview
									<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M20.7071 8.07106C21.0976 7.68054 21.0976 7.04737 20.7071 6.65685L14.3431 0.292885C13.9526 -0.0976396 13.3195 -0.0976396 12.9289 0.292885C12.5384 0.683409 12.5384 1.31657 12.9289 1.7071L18.5858 7.36395L12.9289 13.0208C12.5384 13.4113 12.5384 14.0445 12.9289 14.435C13.3195 14.8255 13.9526 14.8255 14.3431 14.435L20.7071 8.07106ZM0 7.36395V8.36395H20V7.36395V6.36395H0V7.36395Z"
											fill="white"
										/>
									</svg>
								</Button>
							</div>
						</div>
					</form>
				)}
			</section>
		</>
	);
};

export default SecretID;
