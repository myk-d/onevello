import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { MessageType } from '../../models/Message/message';
import LogoSvg from '../UI/SVG/LogoSvg';
import { Alert, Button, Icon } from '../UI/kit';

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
		<section className="mx-auto flex w-full max-w-[680px] flex-col gap-5 px-4 py-8 md:py-14">
			<div className="ov-card items-center text-center">
				<LogoSvg intact size={96} />
				<h1 className="text-2xl font-semibold leading-8">{t('secretId.gate.title')}</h1>
				<p className="text-muted">{t('secretId.gate.description')}</p>

				<div className="flex flex-wrap justify-center gap-2">
					<span className="ov-chip">{t('secretId.gate.oneTime')}</span>
					<span className="ov-chip mono">{t('secretId.gate.expires', { date: dayjs(message.expiration).format('DD.MM HH:mm') })}</span>
					{message.fileUrl && (
						<span className="ov-chip">
							<Icon name="file" size={14} />
							{t('secretId.gate.fileAttached')}
						</span>
					)}
				</div>

				<Alert variant="warning" className="w-full text-left">
					{t('secretId.gate.warning')}
				</Alert>

				{failed && (
					<Alert variant="danger" className="w-full text-left">
						{t('secretId.gate.error')}
					</Alert>
				)}

				<Button type="button" block disabled={opening} onClick={onOpen}>
					{opening ? t('secretId.gate.opening') : t('secretId.gate.button')}
				</Button>
			</div>
		</section>
	);
};

export default SealedGate;
