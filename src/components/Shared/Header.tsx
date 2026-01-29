import logo from '/logo.svg';

const Header = () => {
	return (
		<header className="flex items-center py-5 px-7 border-b border-gray-950">
			<div className="flex items-center gap-3.5">
				<a href="#" target="_blank">
					<img src={logo} className="" alt="Logo" />
				</a>

				<span className="font-bold text-3xl">OneVello</span>
			</div>
		</header>
	);
};

export default Header;
