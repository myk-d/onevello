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

	// Bottom padding keeps the floating support button (48px + 16px offset + gap) off the footer text and controls.
	return (
		<div className="flex min-h-screen flex-col pb-[calc(80px+env(safe-area-inset-bottom,0px))] transition-colors duration-300">
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
