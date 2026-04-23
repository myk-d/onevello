import { Outlet } from 'react-router';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';

const MainLayout = () => {
	return (
		<div className="flex flex-col min-h-screen transition-colors duration-300">
			<Header />

			<main className="grow">
				<Outlet />
			</main>

			<Footer />
		</div>
	);
};

export default MainLayout;
