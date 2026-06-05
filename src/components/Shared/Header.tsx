import { ThemeSwitcher } from 'perkslab-ui';
import { Link } from 'react-router';
import { isSecretWasCreatedOnDeviceStorageKey } from '../../constants/constants';
import LanguageSwitcher from '../UI/LanguageSwitcher';
import LogoSvg from '../UI/SVG/LogoSvg';

const Header = () => {
	return (
		<header className="flex items-center justify-between py-3 px-7 border-b border-brand transition-colors duration-300">
			<div className="flex items-center gap-3.5">
				<Link
					to="/"
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
				<LanguageSwitcher />
				<ThemeSwitcher />
			</div>
		</header>
	);
};

export default Header;
