import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PasswordChannel } from 'secure-channel-sdk';
import EncryptedMessageLink from '../components/Layouts/EncryptedMessageLink';
import Button from '../components/UI/Button';
import Checkbox from '../components/UI/Checkbox';
import DateTimePicker from '../components/UI/DateTimePicker';
import Input from '../components/UI/Input';
import { dbMessages } from '../config/firebase.config';
import { ToastService } from '../helpers/services/ToastService';
import { CreateMessageSchema, CreateMessageType, MessageType } from '../models/Message/message';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';
import { cn } from '../utils/cn';

const Secret = () => {
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
		try {
			const encryptedPkg = await PasswordChannel.encrypt(data.passphrase, data.text);

			const messageToSave: Omit<MessageType, 'id'> = {
				...encryptedPkg,
				createdAt: data.createdAt,
				expiration: data.expiration || dayjs().add(1, 'day').toISOString(),
				oneTime: data.oneTime,
			};

			const result = await dbMessages.create(messageToSave);

			setEncryptedMessageId(result.id);
		} catch (error) {
			if (NODE_ENV_DEV) console.error('Error:', error);
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
						<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 ">
							<div className="flex-1 flex flex-col items-start">
								<label className="block text-sm font-bold mb-2 uppercase tracking-wider">Secret text</label>
								<textarea
									className={cn('w-full border rounded-xl p-4 resize-none', errors.text ? 'border-red-500' : '')}
									rows={10}
									placeholder="some secret text here"
									{...register('text')}
								></textarea>
								{errors.text && <span className="text-red-500 text-xs mt-1">{errors.text.message}</span>}
							</div>

							<div className="flex justify-between gap-6 flex-wrap">
								{/* passphrase */}
								<div className="flex-1 flex flex-col items-start">
									<label className="block text-sm font-bold mb-2 uppercase tracking-wider">Passphrase</label>

									<div className="w-full flex items-center gap-2">
										<Input
											type="password"
											placeholder="Enter passphrase"
											className={errors.passphrase ? 'border-red-500' : ''}
											{...register('passphrase')}
										/>

										<Button
											title="Random passphrase"
											type="button"
											variant="outline"
											size="full"
											className="py-1.5 px-1.5 w-fit"
											onClick={generateRandomPassphrase}
										>
											<svg
												fill="#000000"
												width="32px"
												height="32px"
												viewBox="0 0 32 32"
												version="1.1"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
												<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
												<g id="SVGRepo_iconCarrier">
													<title>Random passphrase</title>
													<path d="M15.676 17.312h0.048c-0.114-0.273-0.263-0.539-0.436-0.78l-11.114-6.346c-0.37 0.13-0.607 0.519-0.607 1.109v9.84c0 1.034 0.726 2.291 1.621 2.808l9.168 5.294c0.544 0.314 1.026 0.282 1.32-0.023v-11.902h-0zM10.049 24.234l-1.83-1.057v-1.918l1.83 1.057v1.918zM11.605 19.993c-0.132 0.2-0.357 0.369-0.674 0.505l-0.324 0.12c-0.23 0.090-0.38 0.183-0.451 0.278-0.071 0.092-0.106 0.219-0.106 0.38v0.242l-1.83-1.056v-0.264c0-0.294 0.056-0.523 0.167-0.685 0.111-0.165 0.346-0.321 0.705-0.466l0.324-0.125c0.193-0.076 0.333-0.171 0.421-0.285 0.091-0.113 0.137-0.251 0.137-0.417 0-0.251-0.081-0.494-0.243-0.728-0.162-0.237-0.389-0.44-0.679-0.608-0.274-0.158-0.569-0.268-0.887-0.329-0.318-0.065-0.649-0.078-0.994-0.040v-1.691c0.409 0.085 0.782 0.19 1.12 0.313s0.664 0.276 0.978 0.457c0.825 0.476 1.453 1.019 1.886 1.627 0.433 0.605 0.649 1.251 0.649 1.937 0 0.352-0.066 0.63-0.198 0.834zM27.111 8.247l-9.531-5.514c-0.895-0.518-2.346-0.518-3.241 0l-9.531 5.514c-0.763 0.442-0.875 1.117-0.336 1.628l10.578 6.040c0.583 0.146 1.25 0.145 1.832-0.003l10.589-6.060c0.512-0.508 0.392-1.17-0.36-1.605zM16.305 10.417l-0.23-0.129c-0.257-0.144-0.421-0.307-0.492-0.488-0.074-0.183-0.062-0.474 0.037-0.874l0.095-0.359c0.055-0.214 0.061-0.389 0.016-0.525-0.041-0.139-0.133-0.248-0.277-0.329-0.219-0.123-0.482-0.167-0.788-0.133-0.309 0.033-0.628 0.141-0.958 0.326-0.31 0.174-0.592 0.391-0.846 0.653-0.257 0.26-0.477 0.557-0.661 0.892l-1.476-0.827c0.332-0.333 0.658-0.625 0.978-0.875s0.659-0.474 1.015-0.674c0.934-0.524 1.803-0.835 2.607-0.934 0.8-0.101 1.5 0.016 2.098 0.352 0.307 0.172 0.508 0.368 0.603 0.589 0.092 0.219 0.097 0.507 0.016 0.865l-0.1 0.356c-0.066 0.255-0.080 0.438-0.041 0.55 0.035 0.11 0.124 0.205 0.265 0.284l0.212 0.118-2.074 1.162zM18.674 11.744l-1.673-0.937 2.074-1.162 1.673 0.937-2.074 1.162zM27.747 10.174l-11.060 6.329c-0.183 0.25-0.34 0.527-0.459 0.813v11.84c0.287 0.358 0.793 0.414 1.37 0.081l9.168-5.294c0.895-0.517 1.621-1.774 1.621-2.808v-9.84c0-0.608-0.251-1.003-0.641-1.121zM23.147 23.68l-1.83 1.056v-1.918l1.83-1.057v1.918zM24.703 17.643c-0.132 0.353-0.357 0.78-0.674 1.284l-0.324 0.494c-0.23 0.355-0.38 0.622-0.451 0.799-0.071 0.174-0.106 0.342-0.106 0.503v0.242l-1.83 1.056v-0.264c0-0.294 0.056-0.587 0.167-0.878 0.111-0.294 0.346-0.721 0.705-1.279l0.324-0.5c0.193-0.298 0.333-0.555 0.421-0.771 0.091-0.218 0.137-0.409 0.137-0.575 0-0.251-0.081-0.4-0.243-0.447-0.162-0.050-0.389 0.009-0.679 0.177-0.274 0.158-0.569 0.39-0.887 0.695-0.318 0.302-0.649 0.671-0.994 1.107v-1.692c0.409-0.387 0.782-0.714 1.12-0.981s0.664-0.491 0.978-0.673c0.825-0.476 1.453-0.659 1.886-0.55 0.433 0.106 0.649 0.502 0.649 1.188 0 0.352-0.066 0.706-0.198 1.062z"></path>{' '}
												</g>
											</svg>
										</Button>
									</div>
									{errors.passphrase && <span className="text-red-500 text-xs mt-1">{errors.passphrase.message}</span>}
								</div>

								{/* expiration time */}
								<div className="flex-1 flex flex-col items-start">
									<label className="block text-sm font-bold mb-2 uppercase tracking-wider">Expiration Date</label>

									<Controller
										control={control}
										name="expiration"
										defaultValue={dayjs().toISOString()}
										render={({ field }) => (
											<DateTimePicker
												value={dayjs(field.value)}
												onChange={(date) => field.onChange(date.toISOString())}
												onBlur={field.onBlur}
												ref={field.ref}
											/>
										)}
									/>
								</div>
							</div>

							{/* one time access */}
							<div className="flex items-center gap-3">
								<Checkbox {...register('oneTime')} />

								<label className="block text-base font-bold uppe tracking-wider">One time link access *</label>
							</div>

							{/* one time access message */}
							<div className="bg-cyan-100 py-2 px-3 rounded-md italic text-cyan-800">
								<p className="text-left text-xs">
									* Your message will self-destruct after being viewed. The link can only be accessed once.
								</p>
							</div>

							{/* buttons */}
							<div className="flex justify-between gap-6 flex-wrap">
								<div
									className="flex-1 min-w-0 flex flex-col items-start py-4 px-6 text-zinc-400 bg-zinc-50 rounded-xl"
									style={{
										backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23A1A1AA' stroke-width='1.5' stroke-dasharray='12%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
									}}
								>
									<p className="truncate w-full text-left">https://onevello.myslennya.com/secret/...</p>
								</div>

								<Button type="submit" variant="default" size="full" className="flex-1">
									Create link
								</Button>
							</div>
						</div>
					</form>
				)}
			</section>
		</>
	);
};

export default Secret;
