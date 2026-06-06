import { Button } from 'perkslab-ui';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import { cn } from '../../utils/cn';

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
		<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 ">
			<div className="flex-1 flex flex-col items-start">
				<label className="block text-sm font-bold mb-2 uppercase tracking-wider">{t('decryptedMessage.label')}</label>
				<textarea
					className={cn('w-full border rounded-xl p-4 resize-none')}
					rows={20}
					value={message}
					readOnly
					placeholder={t('decryptedMessage.label')}
				></textarea>
			</div>

			{fileName && onDownloadFile && (
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-3 border rounded-xl px-4 py-3">
						<svg className="h-5 w-5 text-brand shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<polyline points="14 2 14 8 20 8" />
						</svg>
						<span className="text-sm font-medium truncate flex-1">{fileName}</span>
					</div>
					{isOneTime && <p className="text-xs text-amber-600 font-medium px-1">{t('decryptedMessage.oneTimeFileWarning')}</p>}
				</div>
			)}

			{isOneTime && (
				<div className="bg-cyan-100 py-2 px-3 rounded-md italic text-cyan-800 border-l-[3px] border-cyan-800">
					<p className="text-left text-sm">{t('decryptedMessage.oneTimeWarning')}</p>
				</div>
			)}

			{isOneTime && (
				<div className="bg-rose-100 py-2 px-3 rounded-md italic text-rose-800 border-l-[3px] border-rose-800">
					<p className="text-left text-sm">{t('decryptedMessage.closeWindowNote')}</p>
				</div>
			)}

			{/* buttons */}
			<div className="flex justify-between gap-6 flex-wrap">
				{ui.isCopied ? (
					<Button type="button" variant="success" size="full" className="flex-1 gap-2">
						{t('decryptedMessage.copied')}
					</Button>
				) : (
					<Button type="button" variant="default" size="full" onClick={copyToClipboard} className="flex-1 gap-2">
						{t('decryptedMessage.copyToClipboard')}
						<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
							<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
							<g id="SVGRepo_iconCarrier">
								{' '}
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
									fill="#fff"
								></path>{' '}
								<path
									d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
									fill="#fff"
								></path>{' '}
							</g>
						</svg>
					</Button>
				)}

				{fileName && onDownloadFile && (
					<Button
						type="button"
						variant="outline"
						size="full"
						onClick={handleDownload}
						isLoading={ui.isDownloading}
						disabled={ui.isDownloaded}
						className="flex-1 gap-2"
					>
						{t('decryptedMessage.downloadFile')}
					</Button>
				)}

				<Button type="button" variant="outline" size="full" onClick={() => navigate(UrlConfig.secret)} className="flex-1 gap-2">
					{t('decryptedMessage.createSecret')}
				</Button>
			</div>
		</div>
	);
};

export default DecryptedMessage;
