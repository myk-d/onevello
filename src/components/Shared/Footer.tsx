import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import { cn } from '../../utils/cn';
import LogoSvg from '../UI/SVG/LogoSvg';
import { SECURITY_URL } from './Header';

const SUPPORT_EMAIL = 'support@myslennya.com';
const LINK = 'inline-flex min-h-11 items-center text-muted transition-colors hover:text-text md:min-h-0';
const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

interface FooterProps {
	variant?: 'app' | 'landing';
}

const Footer = ({ variant = 'app' }: FooterProps) => {
	const year = new Date().getFullYear();
	const { t } = useTranslation();

	if (variant === 'landing') {
		return (
			<footer className="lp-foot">
				<div className="lp-in">
					<span className="flex items-center gap-2">
						<LogoSvg size={20} />
						<b className="font-heading text-text">OneVello</b> · {t('footer.tagline')}
					</span>
					<nav>
						<Link to={UrlConfig.about} className={LINK}>
							{t('header.nav.howItWorks')}
						</Link>
						<Link to={UrlConfig.privacyPolicy} className={LINK}>
							{t('footer.privacy')}
						</Link>
						<Link to={UrlConfig.termsOfUse} className={LINK}>
							{t('footer.terms')}
						</Link>
						<a href={SECURITY_URL} className={LINK} {...external}>
							{t('footer.security')}
						</a>
						<a href={UrlConfig.repoURL} className={LINK} {...external}>
							{t('header.nav.github')}
						</a>
					</nav>
					<span>
						© {year} OneVello · {SUPPORT_EMAIL}
					</span>
				</div>
			</footer>
		);
	}

	return (
		<footer className="mt-auto border-t border-border px-4 py-5 text-xs text-muted md:px-12">
			<div className="mx-auto flex max-w-[1120px] flex-col gap-3">
				<div className={cn('flex flex-col gap-2 md:flex-row md:items-center md:justify-between')}>
					<nav className="flex flex-wrap items-center gap-x-2">
						<a href={UrlConfig.repoURL} className={LINK} {...external}>
							{t('footer.openSource')}
						</a>
						<span aria-hidden="true">·</span>
						<a href={SECURITY_URL} className={LINK} {...external}>
							{t('footer.security')}
						</a>
						<span aria-hidden="true">·</span>
						<Link to={UrlConfig.privacyPolicy} className={LINK}>
							{t('footer.privacy')}
						</Link>
						<span aria-hidden="true">·</span>
						<Link to={UrlConfig.termsOfUse} className={LINK}>
							{t('footer.terms')}
						</Link>
					</nav>
					<span>{t('footer.tagline')}</span>
				</div>
				<div>
					© {year}{' '}
					<a href="https://myslennya.com" {...external} className="text-primary hover:underline underline-offset-4">
						myslennya.com
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
