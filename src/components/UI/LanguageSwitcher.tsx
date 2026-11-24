import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';

const LANGUAGES = ['en', 'uk'] as const;

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const current = LANGUAGES.find((l) => i18n.language.startsWith(l)) ?? 'en';

	return (
		<div className="flex items-center gap-0.5">
			{LANGUAGES.map((lang) => (
				<button
					key={lang}
					type="button"
					onClick={() => i18n.changeLanguage(lang)}
					aria-pressed={current === lang}
					className={cn(
						'min-h-11 min-w-11 cursor-pointer rounded-control px-2 text-xs font-semibold uppercase transition-colors md:min-h-8 md:min-w-8',
						current === lang ? 'text-primary' : 'text-muted hover:text-text',
					)}
				>
					{lang}
				</button>
			))}
		</div>
	);
};

export default LanguageSwitcher;
