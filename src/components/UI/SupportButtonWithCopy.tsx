import { SupportButton, ToastService } from 'perkslab-ui';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SupportButtonWithCopyProps {
	supportEmail: string;
}

// SupportButton (perkslab-ui) renders the support email as a plain `mailto:` link inside a Portal.
// React synthetic events bubble through portals, so handling onClick on the wrapper captures clicks
// on the mailto link and copies the address to the clipboard alongside the mailto action.
const SupportButtonWithCopy = ({ supportEmail }: SupportButtonWithCopyProps) => {
	const { t } = useTranslation();

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		const link = target.closest<HTMLAnchorElement>(`a[href="mailto:${supportEmail}"]`);
		if (!link) return;

		navigator.clipboard
			.writeText(supportEmail)
			.then(() => ToastService.success(t('support.emailCopied')))
			.catch(() => {});
	};

	return (
		<div onClick={handleClick}>
			<SupportButton supportEmail={supportEmail} />
		</div>
	);
};

export default SupportButtonWithCopy;
