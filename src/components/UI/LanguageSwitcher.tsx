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
					className={cn(
						'text-xs cursor-pointer font-bold uppercase px-2 py-1 rounded transition-colors',
						current === lang ? 'text-brand' : 'text-page-text/40 hover:text-page-text',
					)}
				>
					{lang}
				</button>
			))}
		</div>
	);
};

export default LanguageSwitcher;
