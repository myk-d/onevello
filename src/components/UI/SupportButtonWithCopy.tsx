import { useTranslation } from 'react-i18next';
import { SupportButton, toast } from './kit';

interface SupportButtonWithCopyProps {
	supportEmail: string;
}

// Clicking the mailto link also copies the address, so it is not lost when no mail client is set up.
const SupportButtonWithCopy = ({ supportEmail }: SupportButtonWithCopyProps) => {
	const { t } = useTranslation();

	const handleEmailClick = () => {
		navigator.clipboard
			.writeText(supportEmail)
			.then(() => toast.success(t('support.emailCopied')))
			.catch(() => {});
	};

	return (
		<SupportButton
			supportEmail={supportEmail}
			label={t('support.label')}
			title={t('support.title')}
			description={t('support.description')}
			note={t('support.note')}
			onEmailClick={handleEmailClick}
		/>
	);
};

export default SupportButtonWithCopy;
