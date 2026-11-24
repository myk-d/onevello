import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateMessageType, MAX_SECRET_LENGTH } from '../../models/Message/message';
import { cn } from '../../utils/cn';
import { formatFileSize } from '../../utils/formatFileSize';
import { Button, DateTimeField, Icon, PassphraseInput } from '../UI/kit';
import LogoSvg from '../UI/SVG/LogoSvg';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
		<fieldset className={cn('ov-card', isLoading && 'is-sealing')} disabled={isDisabled} aria-busy={isLoading || undefined}>
			<div className="ov-field">
				<label htmlFor="secret-text" title={t('form.tooltips.secretText')}>
					{t('form.secretText')}
				</label>
				<textarea
					id="secret-text"
					className="ov-textarea"
					rows={5}
					placeholder={t('form.secretTextPlaceholder')}
					aria-invalid={errors.text ? true : undefined}
					{...register('text')}
				></textarea>
				<div className="flex items-start justify-between gap-3">
					{errors.text ? <span className="ov-error">{errors.text.message}</span> : <span className="ov-help">{t('form.secretHelp')}</span>}
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
						<Icon name="file" size={22} className="shrink-0" />
						<span className="flex min-w-0 flex-1 flex-col gap-0.5">
							<span className="file">
								{attachedFile.name} · {formatFileSize(attachedFile.size)}
							</span>
							<span className="ov-help">{t('form.fileName')}</span>
						</span>
						<Button
							variant="ghost"
							className="shrink-0"
							onClick={() => {
								onFileChange(null);
								if (fileInputRef.current) fileInputRef.current.value = '';
							}}
							title={t('form.tooltips.removeFile')}
						>
							{t('form.removeFile')}
						</Button>
					</div>
				) : (
					<button type="button" onClick={() => fileInputRef.current?.click()} title={t('form.tooltips.attachFile')} className="ov-drop">
						<Icon name="file" size={22} className="shrink-0" />
						<span>
							<b>{t('form.attach')}</b> · {t('form.attachHelp')}
						</span>
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
					<PassphraseInput
						id="secret-passphrase"
						autoComplete="new-password"
						placeholder={t('form.passphrasePlaceholder')}
						showLabel={t('form.show')}
						hideLabel={t('form.hide')}
						invalid={!!errors.passphrase}
						actions={
							<button type="button" title={t('form.tooltips.randomPassphrase')} onClick={generateRandomPassphrase}>
								{t('form.generate')}
							</button>
						}
						{...register('passphrase')}
					/>
					{passphraseValue.length >= 3 && (
						<>
							<div className="ov-meter" data-level={passphraseStrength}>
								<i />
								<i />
								<i />
							</div>
							<div className="ov-meter-label">
								<span title={t('form.tooltips.passphraseStrength')}>{t('form.strength.label')}</span>
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
								<span className="ov-help">{t('form.expiresAt', { date: dayjs(field.value).format('DD.MM.YYYY HH:mm') })}</span>
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
				{isLoading ? t('form.creating') : t('form.createLink')}
			</Button>

			{isLoading && (
				<div className="sealing-veil" aria-live="polite">
					<div>
						<LogoSvg intact size={64} />
						<span>{t('form.sealing')}</span>
					</div>
				</div>
			)}
		</fieldset>
	);
};

export default EncryptedMessageForm;
