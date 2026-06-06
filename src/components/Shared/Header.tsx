import { ThemeSwitcher } from 'perkslab-ui';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { isSecretWasCreatedOnDeviceStorageKey } from '../../constants/constants';
import { UrlConfig } from '../../constants/UrlConfig';
import { useAuth } from '../../context/useAuth';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import LogoSvg from '../UI/SVG/LogoSvg';

const Header = () => {
	const { user, signIn, signOut } = useAuth();
	const { t } = useTranslation();

	return (
		<header className="flex items-center justify-between py-3 px-7 border-b border-brand transition-colors duration-300">
			<div className="flex items-center gap-3.5">
				<Link
					to={UrlConfig.home}
					className="flex items-center gap-3 transition-transform active:scale-95"
					onClick={() => {
						localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
					}}
				>
					<LogoSvg className="h-8 w-8 text-brand transition-colors duration-300" />

					<span className="font-bold text-2xl text-page-text transition-colors duration-300">OneVello</span>
				</Link>
			</div>

			<div className="flex items-center gap-3">
				{user ? (
					<>
						<Link to={UrlConfig.dashboard} className="text-sm font-medium text-page-text hover:text-brand transition-colors duration-200">
							{t('header.nav.dashboard')}
						</Link>
						<button
							onClick={signOut}
							className="text-sm cursor-pointer font-medium text-page-text hover:text-brand transition-colors duration-200"
						>
							{t('header.nav.signOut')}
						</button>
						{user.photoURL && (
							<img src={user.photoURL} alt={user.displayName ?? ''} className="h-8 w-8 rounded-full" referrerPolicy="no-referrer" />
						)}
					</>
				) : (
					<button
						onClick={signIn}
						className="text-sm cursor-pointer font-medium text-page-text hover:text-brand transition-colors duration-200"
					>
						{t('header.nav.signIn')}
					</button>
				)}
				<LanguageSwitcher />
				<ThemeSwitcher />
			</div>
		</header>
	);
};

export default Header;
