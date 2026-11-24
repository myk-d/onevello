import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import GitHubSVG from '../UI/SVG/GitHubSVG';

const NAV_LINKS = [
	{ key: 'header.nav.howItWorks', to: UrlConfig.about },
	{ key: 'header.nav.home', to: UrlConfig.home },
	{ key: 'header.nav.privacyPolicy', to: UrlConfig.privacyPolicy },
	{ key: 'header.nav.termsOfUse', to: UrlConfig.termsOfUse },
] as const;

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const { t } = useTranslation();

	return (
		<footer className="mt-auto border-t border-border px-4 py-6 md:px-12">
			<div className="mx-auto flex max-w-[1120px] flex-col items-center justify-between gap-4 md:flex-row">
				<div className="text-xs text-muted">
					© {currentYear}{' '}
					<a
						href="https://myslennya.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary hover:underline underline-offset-4"
					>
						myslennya.com
					</a>
				</div>

				<nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
					{NAV_LINKS.map(({ key, to }) => (
						<Link
							key={key}
							to={to}
							className="inline-flex min-h-11 items-center text-xs text-muted transition-colors hover:text-text"
						>
							{t(key)}
						</Link>
					))}

					<a
						href={`${UrlConfig.repoURL}/blob/master/SECURITY.md`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center text-xs text-muted transition-colors hover:text-text"
					>
						{t('header.nav.security')}
					</a>

					<Link to={UrlConfig.repoURL} target="_blank" title="GitHub Repository" aria-label="GitHub" className="inline-flex min-h-11 min-w-11 items-center justify-center text-text">
						<GitHubSVG className="h-6 w-6" />
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
