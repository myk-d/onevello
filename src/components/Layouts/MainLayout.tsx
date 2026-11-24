import { Outlet, useLocation } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import { useBanners } from '../../hooks/useBanners';
import Footer from '../Shared/Footer';
import Header from '../Shared/Header';
import AdBanner from '../UI/AdBanner';
import SupportButtonWithCopy from '../UI/SupportButtonWithCopy';

const MainLayout = () => {
	const { banners } = useBanners();
	const [rightBanner, leftBanner] = banners;
	// The landing page brings its own header and footer.
	const isLanding = useLocation().pathname === UrlConfig.home;

	return (
		<div className="flex flex-col min-h-screen transition-colors duration-300">
			{!isLanding && <Header />}

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

			{!isLanding && <Footer />}

			<SupportButtonWithCopy supportEmail="support@myslennya.com" />
		</div>
	);
};

export default MainLayout;
