import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import { useAppTheme } from './kit';

export const THEME_OPTIONS = ['system', 'light', 'dark'] as const;
export type ThemeOption = (typeof THEME_OPTIONS)[number];

const LABEL_KEYS: Record<ThemeOption, string> = {
	system: 'header.theme.auto',
	light: 'header.theme.light',
	dark: 'header.theme.dark',
};

/** Auto (follows the system) / Light / Dark. The choice is persisted by ThemeProvider. */
const ThemeSwitcher = () => {
	const { theme, setTheme } = useAppTheme();
	const { t } = useTranslation();
	const current: ThemeOption = THEME_OPTIONS.find((o) => o === theme) ?? 'system';

	return (
		<div role="radiogroup" aria-label={t('header.theme.label')} className="inline-flex rounded-full border border-border bg-surface p-0.5 shrink-0">
			{THEME_OPTIONS.map((option) => (
				<button
					key={option}
					type="button"
					role="radio"
					aria-checked={current === option}
					onClick={() => setTheme(option)}
					className={cn(
						'cursor-pointer rounded-full min-h-8 px-3 py-1.5 text-xs font-semibold transition-colors duration-150',
						current === option ? 'bg-text text-bg' : 'text-muted hover:text-text',
					)}
				>
					{t(LABEL_KEYS[option])}
				</button>
			))}
		</div>
	);
};

export default ThemeSwitcher;
