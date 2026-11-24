import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { isSecretWasCreatedOnDeviceStorageKey } from '../../constants/constants';
import { UrlConfig } from '../../constants/UrlConfig';
import { useAuth } from '../../context/useAuth';
import { cn } from '../../utils/cn';
import LogoSvg from '../UI/SVG/LogoSvg';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import ThemeSwitcher from '../UI/ThemeSwitcher';

const NAV_ITEM = 'flex min-h-11 cursor-pointer items-center text-sm font-medium text-muted hover:text-text transition-colors md:min-h-0';

// Below md the links, language and theme collapse into a menu so the header never overflows the viewport.
const Header = () => {
	const { user, isAdmin, signIn, signOut } = useAuth();
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const close = () => setOpen(false);

	return (
		<header className="relative border-b border-border">
			<div className="flex items-center justify-between gap-4 px-4 py-3 md:px-12 md:py-4">
				<Link
					to={UrlConfig.home}
					className="flex min-w-0 items-center gap-2.5 text-text no-underline"
					onClick={() => {
						localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
						close();
					}}
				>
					<LogoSvg size={32} className="h-8 w-8 shrink-0" />
					<span className="font-heading text-xl font-semibold tracking-[-0.012em] md:text-2xl">OneVello</span>
				</Link>

				<button
					type="button"
					className="ov-btn ov-btn--secondary ov-btn--icon md:hidden"
					aria-expanded={open}
					aria-controls="site-menu"
					aria-label={open ? t('header.menuClose') : t('header.menu')}
					onClick={() => setOpen((v) => !v)}
				>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
						{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
					</svg>
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
