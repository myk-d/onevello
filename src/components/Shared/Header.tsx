import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { isSecretWasCreatedOnDeviceStorageKey } from '../../constants/constants';
import { UrlConfig } from '../../constants/UrlConfig';
import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';
import { Icon } from '../UI/kit';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import LogoSvg from '../UI/SVG/LogoSvg';
import ThemeSwitcher from '../UI/ThemeSwitcher';

const NAV_ITEM = 'flex min-h-11 cursor-pointer items-center text-sm text-muted hover:text-text transition-colors md:min-h-0';
export const SECURITY_URL = `${UrlConfig.repoURL}/blob/master/SECURITY.md`;

interface HeaderProps {
	/** `landing` is the marketing header (anchors, no app links); `app` is the product header. */
	variant?: 'app' | 'landing';
}

// Below md the links, language and theme collapse into a menu so the header never overflows the viewport.
const Header = ({ variant = 'app' }: HeaderProps) => {
	const { user, isAdmin, signIn, signOut } = useAuth();
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);
	const landing = variant === 'landing';
	const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

	return (
		<header className="relative border-b border-border">
			<div
				className={cn('flex items-center justify-between gap-4 py-3 md:py-4', landing ? 'lp-in' : 'px-4 md:px-12')}
			>
				<Link
					to={UrlConfig.home}
					className="flex min-w-0 items-center gap-2.5 text-text no-underline"
					onClick={() => {
						localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
						close();
					}}
				>
					<LogoSvg size={32} className="h-7 w-7 shrink-0 md:h-8 md:w-8" />
					<span className="font-heading text-xl font-semibold leading-none tracking-[-0.012em] md:text-2xl">OneVello</span>
				</Link>

				<button
					type="button"
					className="ov-btn ov-btn--secondary ov-btn--icon md:hidden"
					aria-expanded={open}
					aria-controls="site-menu"
					aria-label={open ? t('header.menuClose') : t('header.menu')}
					onClick={() => setOpen((v) => !v)}
				>
					<Icon name={open ? 'close' : 'menu'} size={20} />
				</button>

				<div
					id="site-menu"
					className={cn(
						'items-center gap-6',
						open
							? 'absolute inset-x-0 top-full z-40 flex flex-col items-stretch gap-1 border-b border-border bg-bg px-4 pb-4 pt-2 shadow-card'
							: 'hidden',
						'md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none',
					)}
				>
					<Link to={UrlConfig.about} className={NAV_ITEM} onClick={close}>
						{t('header.nav.howItWorks')}
					</Link>
					{landing && (
						<>
							<a href={SECURITY_URL} className={NAV_ITEM} onClick={close} {...external}>
								{t('header.nav.security')}
							</a>
							<a href="#faq" className={NAV_ITEM} onClick={close}>
								{t('header.nav.faq')}
							</a>
							<a href={UrlConfig.repoURL} className={NAV_ITEM} onClick={close} {...external}>
								{t('header.nav.github')}
							</a>
						</>
					)}
					{user ? (
						<>
							<Link to={UrlConfig.dashboard} className={NAV_ITEM} onClick={close}>
								{t('header.nav.dashboard')}
							</Link>
							{isAdmin && (
								<Link to={UrlConfig.admin} className={NAV_ITEM} onClick={close}>
									{t('header.nav.admin')}
								</Link>
							)}
							<button
								type="button"
								onClick={() => {
									close();
									signOut();
								}}
								className={cn(NAV_ITEM, 'text-left')}
							>
								{t('header.nav.signOut')}
							</button>
							{user.photoURL && (
								<img src={user.photoURL} alt={user.displayName ?? ''} className="hidden h-8 w-8 rounded-full md:block" referrerPolicy="no-referrer" />
							)}
						</>
					) : (
						<button
							type="button"
							onClick={() => {
								close();
								signIn();
							}}
							className={cn(NAV_ITEM, 'text-left')}
						>
							{t('header.nav.signIn')}
						</button>
					)}
					<div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 md:gap-4 md:border-0 md:pt-0">
						<LanguageSwitcher />
						<ThemeSwitcher />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
