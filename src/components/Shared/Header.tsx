import { Link } from 'react-router';
import { isSecretWasCreatedOnDeviceStorageKey } from '../../constants/constants';
import logo from '/logo.svg';

const Header = () => {
	return (
		<header className="flex items-center py-3 px-7 border-b border-gray-950">
			<div className="flex items-center gap-3.5">
				<Link
					to="/"
					className="flex items-center gap-3"
					onClick={() => {
						localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
					}}
				>
					<img src={logo} className="h-8 w-8" alt="Logo" />

					<span className="font-bold text-2xl">OneVello</span>
				</Link>
			</div>
		</header>
	);
};

export default Header;
