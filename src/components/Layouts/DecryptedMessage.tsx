import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import { Button } from '../UI/kit';

interface DecryptedMessageProps {
	message: string;
	isOneTime?: boolean;
	fileName?: string;
	onDownloadFile?: () => Promise<void>;
}

const DecryptedMessage: React.FC<DecryptedMessageProps> = ({ message, isOneTime, fileName, onDownloadFile }) => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [ui, setUi] = useState({ isCopied: false, isDownloading: false, isDownloaded: false });

	const copyToClipboard = () => {
		navigator.clipboard.writeText(message);

		setUi((prev) => ({ ...prev, isCopied: true }));
		const timeout = setTimeout(() => {
			setUi((prev) => ({ ...prev, isCopied: false }));
		}, 2000);

		return () => clearTimeout(timeout);
	};

	const handleDownload = async () => {
		if (!onDownloadFile || ui.isDownloaded) return;
		setUi((prev) => ({ ...prev, isDownloading: true }));
		try {
			await onDownloadFile();
			setUi((prev) => ({ ...prev, isDownloaded: true }));
		} finally {
			setUi((prev) => ({ ...prev, isDownloading: false }));
		}
	};

	return (
		<div className="ov-card text-left">
			<div className="ov-field">
				<label htmlFor="revealed-secret" title={t('decryptedMessage.tooltips.label')}>
					{t('decryptedMessage.label')}
				</label>
				<textarea
					id="revealed-secret"
					className="ov-textarea font-mono"
					rows={12}
					value={message}
					readOnly
					placeholder={t('decryptedMessage.label')}
				></textarea>
			</div>

			{fileName && onDownloadFile && (
				<div className="flex flex-col gap-1.5">
					<div className="ov-drop is-filled">
						<svg className="h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
						</svg>
						<span className="file">{fileName}</span>
					</div>
					{isOneTime && <p className="ov-help text-warning">{t('decryptedMessage.oneTimeFileWarning')}</p>}
				</div>
			)}

			{isOneTime && (
				<div className="ov-alert ov-alert--info" role="status">
					<p className="text-left text-sm">{t('decryptedMessage.oneTimeWarning')}</p>
				</div>
			)}

			{/* Neutral reminder, not an error: it must not look like a failure. */}
			{isOneTime && (
				<div className="ov-alert" role="status">
					<p className="text-left text-sm">{t('decryptedMessage.closeWindowNote')}</p>
				</div>
			)}

			{/* buttons */}
			<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
				{ui.isCopied ? (
					<Button variant="success" className="flex-1">
						{t('decryptedMessage.copied')}
					</Button>
				) : (
					<Button onClick={copyToClipboard} title={t('decryptedMessage.tooltips.copyToClipboard')} className="flex-1">
						{t('decryptedMessage.copyToClipboard')}
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
							<rect x="9" y="9" width="11" height="12" rx="2" />
							<path d="M5 15V5a2 2 0 0 1 2-2h8" strokeLinecap="round" />
						</svg>
					</Button>
				)}

				{fileName && onDownloadFile && (
					<Button
						variant="secondary"
						onClick={handleDownload}
						isLoading={ui.isDownloading}
						disabled={ui.isDownloaded}
						title={isOneTime ? t('decryptedMessage.tooltips.downloadFileOneTime') : t('decryptedMessage.tooltips.downloadFile')}
						className="flex-1"
					>
						{t('decryptedMessage.downloadFile')}
					</Button>
				)}

				<Button variant="secondary" onClick={() => navigate(UrlConfig.secret)} title={t('decryptedMessage.tooltips.createSecret')} className="flex-1">
					{t('decryptedMessage.createSecret')}
				</Button>
			</div>
		</div>
	);
};

export default DecryptedMessage;
