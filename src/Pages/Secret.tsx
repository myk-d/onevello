import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PasswordChannel } from 'secure-channel-sdk';
import Button from '../components/UI/Button';
import Checkbox from '../components/UI/Checkbox';
import DateTimePicker from '../components/UI/DateTimePicker';
import Input from '../components/UI/Input';
import { dbMessages } from '../config/firebase.config';
import { CreateMessageSchema, CreateMessageType, MessageType } from '../models/Message/message';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';
import { cn } from '../utils/cn';

const Secret = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
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

	console.log(errors);

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

			console.log('Повідомлення збережено з ID:', result.id);

			// Тут ви можете перенаправити користувача або показати готове посилання
			// Наприклад: alert(`Ваше посилання: ${window.location.origin}/secret/${result.id}`);
		} catch (error) {
			if (NODE_ENV_DEV) console.error('Error:', error);
		} finally {
			reset();
		}
	};

	return (
		<>
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
				<form onSubmit={handleSubmit(onSubmit)} className="w-full">
					<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 ">
						{/* textarea */}
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

								<Input
									type="password"
									placeholder="Enter passphrase"
									className={errors.passphrase ? 'border-red-500' : ''}
									{...register('passphrase')}
								/>
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
			</section>
		</>
	);
};

export default Secret;
