import dayjs from 'dayjs';
import { Button, Checkbox, DateTimePicker, Input } from 'perkslab-ui';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateMessageType, MAX_SECRET_LENGTH } from '../../models/Message/message';
import { cn } from '../../utils/cn';

interface EncryptedMessageFormProps {
	register: UseFormRegister<CreateMessageType>;
	errors: FieldErrors<CreateMessageType>;
	generateRandomPassphrase: () => void;
	control: Control<CreateMessageType>;
	currentHex: string;
	isDisabled?: boolean;
	isLoading?: boolean;
}

const EncryptedMessageForm: React.FC<EncryptedMessageFormProps> = ({
	register,
	errors,
	generateRandomPassphrase,
	control,
	currentHex,
	isDisabled = false,
	isLoading = false,
}) => {
	const { t } = useTranslation();
	const textValue = useWatch({ control, name: 'text' }) ?? '';
	const passphraseValue = useWatch({ control, name: 'passphrase' }) ?? '';
	const charCount = textValue.length;
	const isNearLimit = charCount > MAX_SECRET_LENGTH * 0.9;
	const [activePreset, setActivePreset] = useState<string>('d1');

	const passphraseStrength = (() => {
		if (passphraseValue.length < 3) return 0;
		let score = 0;
		if (passphraseValue.length >= 8) score++;
		if (passphraseValue.length >= 12) score++;
		if (/[A-Z]/.test(passphraseValue) && /[a-z]/.test(passphraseValue)) score++;
		if (/\d/.test(passphraseValue)) score++;
		if (/[^A-Za-z0-9]/.test(passphraseValue)) score++;
		if (score <= 1) return 1;
		if (score <= 3) return 2;
		return 3;
	})();

	const strengthLabel = passphraseStrength === 1 ? 'weak' : passphraseStrength === 2 ? 'fair' : 'strong';
	const strengthColor =
		passphraseStrength === 1 ? 'bg-red-500' : passphraseStrength === 2 ? 'bg-yellow-500' : 'bg-green-500';
	const strengthTextColor =
		passphraseStrength === 1 ? 'text-red-500' : passphraseStrength === 2 ? 'text-yellow-500' : 'text-green-500';

	const PRESETS = [
		{ key: 'd1', amount: 1, unit: 'day' as const },
		{ key: 'h1', amount: 1, unit: 'hour' as const },
		{ key: 'd7', amount: 7, unit: 'day' as const },
		{ key: 'd30', amount: 30, unit: 'day' as const },
	] as const;

	return (
		<fieldset className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4" disabled={isDisabled}>
			<div className="flex-1 flex flex-col items-start">
				<label className="block text-sm font-bold mb-2 uppercase tracking-wider">{t('form.secretText')}</label>
				<textarea
					className={cn('w-full border rounded-xl p-4 resize-none', errors.text ? 'border-red-500' : '')}
					rows={10}
					placeholder={t('form.secretTextPlaceholder')}
					{...register('text')}
				></textarea>
				<div className="w-full flex justify-between items-center mt-1">
					{errors.text ? (
						<span className="text-red-500 text-xs">{errors.text.message}</span>
					) : (
						<span />
					)}
					<span className={cn('text-xs tabular-nums', isNearLimit ? 'text-red-500' : 'text-page-text/40')}>
						{charCount.toLocaleString()} / {MAX_SECRET_LENGTH.toLocaleString()}
					</span>
				</div>
			</div>

			<div className="flex justify-between gap-6 flex-wrap">
				{/* passphrase */}
				<div className="flex-1 flex flex-col items-start">
					<label className="block text-sm font-bold mb-2 uppercase tracking-wider">{t('form.passphrase')}</label>

					<div className="w-full flex items-center gap-2">
						<Input
							type="password"
							placeholder={t('form.passphrasePlaceholder')}
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
							<svg fill="currentColor" width="32px" height="32px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
								<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<title>Random passphrase</title>
									<path d="M15.676 17.312h0.048c-0.114-0.273-0.263-0.539-0.436-0.78l-11.114-6.346c-0.37 0.13-0.607 0.519-0.607 1.109v9.84c0 1.034 0.726 2.291 1.621 2.808l9.168 5.294c0.544 0.314 1.026 0.282 1.32-0.023v-11.902h-0zM10.049 24.234l-1.83-1.057v-1.918l1.83 1.057v1.918zM11.605 19.993c-0.132 0.2-0.357 0.369-0.674 0.505l-0.324 0.12c-0.23 0.090-0.38 0.183-0.451 0.278-0.071 0.092-0.106 0.219-0.106 0.38v0.242l-1.83-1.056v-0.264c0-0.294 0.056-0.523 0.167-0.685 0.111-0.165 0.346-0.321 0.705-0.466l0.324-0.125c0.193-0.076 0.333-0.171 0.421-0.285 0.091-0.113 0.137-0.251 0.137-0.417 0-0.251-0.081-0.494-0.243-0.728-0.162-0.237-0.389-0.44-0.679-0.608-0.274-0.158-0.569-0.268-0.887-0.329-0.318-0.065-0.649-0.078-0.994-0.040v-1.691c0.409 0.085 0.782 0.19 1.12 0.313s0.664 0.276 0.978 0.457c0.825 0.476 1.453 1.019 1.886 1.627 0.433 0.605 0.649 1.251 0.649 1.937 0 0.352-0.066 0.63-0.198 0.834zM27.111 8.247l-9.531-5.514c-0.895-0.518-2.346-0.518-3.241 0l-9.531 5.514c-0.763 0.442-0.875 1.117-0.336 1.628l10.578 6.040c0.583 0.146 1.25 0.145 1.832-0.003l10.589-6.060c0.512-0.508 0.392-1.17-0.36-1.605zM16.305 10.417l-0.23-0.129c-0.257-0.144-0.421-0.307-0.492-0.488-0.074-0.183-0.062-0.474 0.037-0.874l0.095-0.359c0.055-0.214 0.061-0.389 0.016-0.525-0.041-0.139-0.133-0.248-0.277-0.329-0.219-0.123-0.482-0.167-0.788-0.133-0.309 0.033-0.628 0.141-0.958 0.326-0.31 0.174-0.592 0.391-0.846 0.653-0.257 0.26-0.477 0.557-0.661 0.892l-1.476-0.827c0.332-0.333 0.658-0.625 0.978-0.875s0.659-0.474 1.015-0.674c0.934-0.524 1.803-0.835 2.607-0.934 0.8-0.101 1.5 0.016 2.098 0.352 0.307 0.172 0.508 0.368 0.603 0.589 0.092 0.219 0.097 0.507 0.016 0.865l-0.1 0.356c-0.066 0.255-0.080 0.438-0.041 0.55 0.035 0.11 0.124 0.205 0.265 0.284l0.212 0.118-2.074 1.162zM18.674 11.744l-1.673-0.937 2.074-1.162 1.673 0.937-2.074 1.162zM27.747 10.174l-11.060 6.329c-0.183 0.25-0.34 0.527-0.459 0.813v11.84c0.287 0.358 0.793 0.414 1.37 0.081l9.168-5.294c0.895-0.517 1.621-1.774 1.621-2.808v-9.84c0-0.608-0.251-1.003-0.641-1.121zM23.147 23.68l-1.83 1.056v-1.918l1.83-1.057v1.918zM24.703 17.643c-0.132 0.353-0.357 0.78-0.674 1.284l-0.324 0.494c-0.23 0.355-0.38 0.622-0.451 0.799-0.071 0.174-0.106 0.342-0.106 0.503v0.242l-1.83 1.056v-0.264c0-0.294 0.056-0.587 0.167-0.878 0.111-0.294 0.346-0.721 0.705-1.279l0.324-0.5c0.193-0.298 0.333-0.555 0.421-0.771 0.091-0.218 0.137-0.409 0.137-0.575 0-0.251-0.081-0.4-0.243-0.447-0.162-0.050-0.389 0.009-0.679 0.177-0.274 0.158-0.569 0.39-0.887 0.695-0.318 0.302-0.649 0.671-0.994 1.107v-1.692c0.409-0.387 0.782-0.714 1.12-0.981s0.664-0.491 0.978-0.673c0.825-0.476 1.453-0.659 1.886-0.55 0.433 0.106 0.649 0.502 0.649 1.188 0 0.352-0.066 0.706-0.198 1.062z"></path>{' '}
								</g>
							</svg>
						</Button>
					</div>
					{passphraseValue.length >= 3 && (
						<div className="flex items-center gap-2 mt-1.5 w-full">
							<div className="flex gap-1 flex-1">
								{[1, 2, 3].map((level) => (
									<div
										key={level}
										className={cn(
											'h-1 flex-1 rounded-full transition-colors duration-300',
											passphraseStrength >= level ? strengthColor : 'bg-page-text/10',
										)}
									/>
								))}
							</div>
							<span className={cn('text-xs font-bold', strengthTextColor)}>
								{t(`form.strength.${strengthLabel}`)}
							</span>
						</div>
					)}
					{errors.passphrase && <span className="text-red-500 text-xs mt-1">{errors.passphrase.message}</span>}
				</div>

				{/* expiration time */}
				<div className="flex-1 flex flex-col items-start">
					<label className="block text-sm font-bold mb-2 uppercase tracking-wider">{t('form.expirationDate')}</label>

					<Controller
						control={control}
						name="expiration"
						defaultValue={dayjs().toISOString()}
						render={({ field }) => (
							<div className="flex items-center gap-2 w-full">
								<div className="flex gap-1.5 shrink-0">
									{PRESETS.map((preset) => (
										<button
											key={preset.key}
											type="button"
											onClick={() => {
												field.onChange(dayjs().add(preset.amount, preset.unit).toISOString());
												setActivePreset(preset.key);
											}}
											className={cn(
												'text-xs font-bold px-2.5 py-1 rounded-full border transition-colors',
												activePreset === preset.key
													? 'bg-brand text-white border-brand'
													: 'text-page-text/60 border-page-text/20 hover:border-brand hover:text-brand',
											)}
										>
											{t(`form.presets.${preset.key}`)}
										</button>
									))}
								</div>
								<DateTimePicker
									value={dayjs(field.value)}
									onChange={(date) => {
										field.onChange(date.toISOString());
										setActivePreset('');
									}}
									onBlur={field.onBlur}
									ref={field.ref}
								/>
							</div>
						)}
					/>
				</div>
			</div>

			{/* one time access */}
			<div className="flex items-center gap-3">
				<Checkbox {...register('oneTime')} id="oneTimeCheckbox" />

				<label htmlFor="oneTimeCheckbox" className="block text-base font-bold uppe tracking-wider cursor-pointer">
					{t('form.oneTimeAccess')}
				</label>
			</div>

			{/* one time access message */}
			<div className="bg-cyan-100 py-2 px-3 rounded-md italic text-cyan-800">
				<p className="text-left text-xs">{t('form.oneTimeNote')}</p>
			</div>

			{/* buttons */}
			<div className="flex justify-between gap-6 flex-wrap">
				<div
					className="flex-1 min-w-0 flex flex-col items-start py-4 px-6 text-brand bg-brand-bg rounded-xl transition-all duration-300"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23${currentHex}' stroke-width='1.5' stroke-dasharray='12%2c 8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
					}}
				>
					<p className="truncate w-full text-left font-bold">https://onevello.myslennya.com/secret/...</p>
				</div>

				<Button type="submit" variant="default" size="full" className="flex-1" disabled={isDisabled} isLoading={isLoading}>
					{t('form.createLink')}
				</Button>
			</div>
		</fieldset>
	);
};

export default EncryptedMessageForm;
