import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateMessageType, MAX_SECRET_LENGTH } from '../../models/Message/message';
import { cn } from '../../utils/cn';
import { Button, DateTimeField } from '../UI/kit';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const formatFileSize = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

interface EncryptedMessageFormProps {
	register: UseFormRegister<CreateMessageType>;
	errors: FieldErrors<CreateMessageType>;
	generateRandomPassphrase: () => void;
	control: Control<CreateMessageType>;
	attachedFile: File | null;
	onFileChange: (file: File | null) => void;
	isDisabled?: boolean;
	isLoading?: boolean;
}

const EncryptedMessageForm: React.FC<EncryptedMessageFormProps> = ({
	register,
	errors,
	generateRandomPassphrase,
	control,
	attachedFile,
	onFileChange,
	isDisabled = false,
	isLoading = false,
}) => {
	const { t } = useTranslation();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileTooLarge, setFileTooLarge] = useState(false);

	const textValue = useWatch({ control, name: 'text' }) ?? '';
	const passphraseValue = useWatch({ control, name: 'passphrase' }) ?? '';
	const charCount = textValue.length;
	const isNearLimit = charCount > MAX_SECRET_LENGTH * 0.9;
	const [activePreset, setActivePreset] = useState<string>('d1');
	const [showPassphrase, setShowPassphrase] = useState(false);

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
	const strengthTextColor = passphraseStrength === 1 ? 'text-danger' : passphraseStrength === 2 ? 'text-warning' : 'text-success';

	const PRESETS = [
		{ key: 'h1', amount: 1, unit: 'hour' as const },
		{ key: 'd1', amount: 1, unit: 'day' as const },
		{ key: 'd7', amount: 7, unit: 'day' as const },
		{ key: 'd30', amount: 30, unit: 'day' as const },
	] as const;

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		if (file && file.size > MAX_FILE_SIZE) {
			setFileTooLarge(true);
			e.target.value = '';
			return;
		}
		setFileTooLarge(false);
		onFileChange(file);
	};

	return (
		<fieldset className="ov-card" disabled={isDisabled}>
			<div className="ov-field">
				<label htmlFor="secret-text" title={t('form.tooltips.secretText')}>
					{t('form.secretText')}
				</label>
				<textarea
					id="secret-text"
					className="ov-textarea"
					rows={8}
					placeholder={t('form.secretTextPlaceholder')}
					aria-invalid={errors.text ? true : undefined}
					{...register('text')}
				></textarea>
				<div className="flex items-start justify-between gap-3">
					{errors.text ? <span className="ov-error">{errors.text.message}</span> : <span />}
					<span className={cn('ov-counter', isNearLimit && 'is-over')} title={t('form.tooltips.charCount')}>
						{charCount.toLocaleString()} / {MAX_SECRET_LENGTH.toLocaleString()}
					</span>
				</div>
			</div>

			{/* file attachment */}
			<div className="ov-field">
				<input ref={fileInputRef} type="file" className="hidden" onChange={handleFileInputChange} />
				{attachedFile ? (
					<div className="ov-drop is-filled">
						<svg className="h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
						</svg>
						<span className="file">{attachedFile.name}</span>
						<span className="mono shrink-0 text-xs text-muted">{formatFileSize(attachedFile.size)}</span>
						<button
							type="button"
							onClick={() => {
								onFileChange(null);
								if (fileInputRef.current) fileInputRef.current.value = '';
							}}
							title={t('form.tooltips.removeFile')}
							className="min-h-11 shrink-0 cursor-pointer px-1 text-xs font-semibold text-muted hover:text-danger"
						>
							{t('form.removeFile')}
						</button>
					</div>
				) : (
					<button type="button" onClick={() => fileInputRef.current?.click()} title={t('form.tooltips.attachFile')} className="ov-drop">
						{t('form.attachFile')}
					</button>
				)}
				{fileTooLarge && <span className="ov-error">{t('form.fileTooLarge')}</span>}
			</div>

			<div className="grid gap-4 md:grid-cols-2 md:gap-6">
				{/* passphrase */}
				<div className="ov-field">
					<label htmlFor="secret-passphrase" title={t('form.tooltips.passphrase')}>
						{t('form.passphrase')}
					</label>
					<div className="ov-pass" data-invalid={errors.passphrase ? 'true' : undefined}>
						<input
							id="secret-passphrase"
							type={showPassphrase ? 'text' : 'password'}
							autoComplete="new-password"
							placeholder={t('form.passphrasePlaceholder')}
							aria-invalid={errors.passphrase ? true : undefined}
							{...register('passphrase')}
						/>
						<button
							type="button"
							aria-pressed={showPassphrase}
							aria-controls="secret-passphrase"
							onClick={() => setShowPassphrase((v) => !v)}
						>
							{showPassphrase ? t('form.hide') : t('form.show')}
						</button>
						<button type="button" title={t('form.tooltips.randomPassphrase')} onClick={generateRandomPassphrase}>
							{t('form.generate')}
						</button>
					</div>
					{passphraseValue.length >= 3 && (
						<>
							<div className="ov-meter" data-level={passphraseStrength}>
								<i />
								<i />
								<i />
							</div>
							<div className="ov-meter-label">
								<span title={t('form.tooltips.passphraseStrength')}>{t('form.passphrase')}</span>
								<b className={strengthTextColor}>{t(`form.strength.${strengthLabel}`)}</b>
							</div>
						</>
					)}
					{errors.passphrase && <span className="ov-error">{errors.passphrase.message}</span>}
				</div>

				{/* expiration time */}
				<div className="ov-field">
					<label htmlFor="secret-expiration" title={t('form.tooltips.expirationDate')}>
						{t('form.expirationDate')}
					</label>
					<Controller
						control={control}
						name="expiration"
						defaultValue={dayjs().toISOString()}
						render={({ field }) => (
							<div className="flex flex-col gap-2">
								<DateTimeField
									id="secret-expiration"
									value={dayjs(field.value)}
									onChange={(date) => {
										field.onChange(date.toISOString());
										setActivePreset('');
									}}
									onBlur={field.onBlur}
									ref={field.ref}
								/>
								<div className="ov-presets">
									{PRESETS.map((preset) => (
										<button
											key={preset.key}
											type="button"
											aria-pressed={activePreset === preset.key}
											onClick={() => {
												field.onChange(dayjs().add(preset.amount, preset.unit).toISOString());
												setActivePreset(preset.key);
											}}
											className="ov-preset"
										>
											{t(`form.presets.${preset.key}`)}
										</button>
									))}
								</div>
							</div>
						)}
					/>
				</div>
			</div>

			{/* one time access */}
			<label className="ov-switch" title={t('form.tooltips.oneTimeAccess')}>
				<input type="checkbox" role="switch" {...register('oneTime')} id="oneTimeSwitch" />
				<span className="track" aria-hidden="true"></span>
				<span className="text text-left">
					<b>{t('form.oneTimeAccess')}</b>
					<span>{t('form.oneTimeHelp')}</span>
				</span>
			</label>

			{/* submit */}
			<Button type="submit" block disabled={isDisabled} isLoading={isLoading}>
				{t('form.createLink')}
			</Button>
		</fieldset>
	);
};

export default EncryptedMessageForm;
