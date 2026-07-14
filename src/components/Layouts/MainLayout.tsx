import { SupportButton } from 'perkslab-ui';
import { Outlet } from 'react-router';
import { useBanners } from '../../hooks/useBanners';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';
import AdBanner from '../UI/AdBanner';

const MainLayout = () => {
	const { banners } = useBanners();
	const [rightBanner, leftBanner] = banners;

	return (
		<div className="flex flex-col min-h-screen transition-colors duration-300">
			<Header />

			{leftBanner && (
				<aside className="hidden 2xl:block fixed left-6 top-20 bottom-6 w-64 z-10">
					<AdBanner banner={leftBanner} className="h-full" />
				</aside>
			)}

			{rightBanner && (
				<aside className="hidden 2xl:block fixed right-6 top-20 bottom-6 w-64 z-10">
					<AdBanner banner={rightBanner} className="h-full" />
				</aside>
			)}

			<main className="grow">
				<Outlet />
			</main>

			<Footer />

			<SupportButton supportEmail="support@myslennya.com" />
		</div>
	);
};

export default MainLayout;
