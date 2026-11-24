import dayjs from 'dayjs';
import { Button } from 'perkslab-ui';
import { useTranslation } from 'react-i18next';
import { MessageType } from '../../models/Message/message';
import LogoSvg from '../UI/SVG/LogoSvg';

interface SealedGateProps {
	message: Pick<MessageType, 'expiration' | 'fileUrl'>;
	opening: boolean;
	failed: boolean;
	onOpen: () => void;
}

// Metadata only: nothing here decrypts or fetches the file. The one-time secret is deleted by `onOpen`.
const SealedGate = ({ message, opening, failed, onOpen }: SealedGateProps) => {
	const { t } = useTranslation();

	return (
		<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
			<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4 items-center">
				<LogoSvg intact size={96} />
				<h1 className="text-2xl">{t('secretId.gate.title')}</h1>
				<p className="text-muted">{t('secretId.gate.description')}</p>

				<div className="flex flex-wrap justify-center gap-2">
					<span className="ov-chip">{t('secretId.gate.oneTime')}</span>
					<span className="ov-chip mono">{t('secretId.gate.expires', { date: dayjs(message.expiration).format('DD.MM HH:mm') })}</span>
					{message.fileUrl && <span className="ov-chip">{t('secretId.gate.fileAttached')}</span>}
				</div>

				<div className="ov-alert ov-alert--warning w-full" role="status">
					<p className="text-left text-sm">{t('secretId.gate.warning')}</p>
				</div>

				{failed && (
					<div className="ov-alert ov-alert--danger w-full" role="alert">
						<p className="text-left text-sm">{t('secretId.gate.error')}</p>
					</div>
				)}

				<Button type="button" variant="default" size="full" disabled={opening} onClick={onOpen}>
					{opening ? t('secretId.gate.opening') : t('secretId.gate.button')}
				</Button>
			</div>
		</section>
	);
};

export default SealedGate;
