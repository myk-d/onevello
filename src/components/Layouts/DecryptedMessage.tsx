import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import { Alert, Button, Icon } from '../UI/kit';

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
		<>
			<div className="flex flex-col gap-2 text-left">
				<h1 className="font-heading text-xl font-semibold leading-8 md:text-[32px] md:leading-10">
					{isOneTime ? t('decryptedMessage.title') : t('decryptedMessage.titleRegular')}
				</h1>
			</div>
			<div className="ov-card text-left">
				{isOneTime && <Alert variant="info">{t('decryptedMessage.oneTimeWarning')}</Alert>}

				<div className="secret-box" role="textbox" aria-readonly="true" aria-label={t('decryptedMessage.label')} tabIndex={0}>
					{message}
				</div>

				<div className="flex">
					{ui.isCopied ? (
						<Button variant="secondary" className="is-copied max-md:w-full">
							<Icon name="check" size={16} />
							{t('decryptedMessage.copied')}
						</Button>
					) : (
						<Button onClick={copyToClipboard} className="max-md:w-full">
							<Icon name="copy" size={16} />
							{t('decryptedMessage.copyToClipboard')}
						</Button>
					)}
				</div>

				{fileName && onDownloadFile && (
					<>
						<div className="ov-drop is-filled">
							<Icon name="file" size={22} className="shrink-0" />
							<span className="flex min-w-0 flex-1 flex-col gap-0.5">
								<span className="file">{fileName}</span>
								{isOneTime && <span className="ov-help">{t('decryptedMessage.oneTimeFileWarning')}</span>}
							</span>
						</div>
						<Button
							variant="secondary"
							onClick={handleDownload}
							isLoading={ui.isDownloading}
							disabled={ui.isDownloaded}
							className="max-md:w-full"
						>
							{isOneTime ? t('decryptedMessage.downloadOnce') : t('decryptedMessage.downloadFile')}
						</Button>
					</>
				)}

				<Button variant="ghost" onClick={() => navigate(UrlConfig.secret)} className="self-start">
					{t('decryptedMessage.createSecret')}
				</Button>
			</div>
		</>
	);
};

export default DecryptedMessage;
