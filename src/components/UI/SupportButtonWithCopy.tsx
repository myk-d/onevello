import { SupportButton } from 'perkslab-ui';
import { ToastService } from 'perkslab-ui';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface SupportButtonWithCopyProps {
	supportEmail: string;
}

// SupportButton (perkslab-ui) renders the support email as a plain `mailto:` link with no
// way to hook into its click. Listen for clicks on that link from a wrapping container instead
// of forking the component, and copy the address to the clipboard alongside the mailto action.
const SupportButtonWithCopy = ({ supportEmail }: SupportButtonWithCopyProps) => {
	const { t } = useTranslation();
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			const link = target.closest<HTMLAnchorElement>(`a[href="mailto:${supportEmail}"]`);
			if (!link) return;

			navigator.clipboard
				.writeText(supportEmail)
				.then(() => ToastService.success(t('support.emailCopied')))
				.catch(() => {});
		};

		container.addEventListener('click', handleClick);
		return () => container.removeEventListener('click', handleClick);
	}, [supportEmail, t]);

	return (
		<div ref={containerRef}>
			<SupportButton supportEmail={supportEmail} />
		</div>
	);
};

export default SupportButtonWithCopy;
