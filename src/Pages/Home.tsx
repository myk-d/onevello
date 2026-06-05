import { Button } from 'perkslab-ui';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import FeatureCard from '../components/UI/FeatureCard';
import { homeCta, homeFeatures, homeHero, homeTrust } from '../content/home';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { UrlConfig } from '../constants/UrlConfig';

const Home = () => {
	const navigate = useNavigate();

	const handleNavigate = useCallback((to: string) => () => navigate(to), [navigate]);

	useEffect(() => {
		if (localStorage.getItem(isSecretWasCreatedOnDeviceStorageKey) === 'true') {
			localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
			navigate(UrlConfig.secret);
		}
	}, [navigate]);

	return (
		<div className="flex flex-col gap-24 py-12">
			{/* Hero Section */}
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 min-h-[60dvh]">
				<h1 className="text-5xl md:text-7xl font-black text-page-text uppercase tracking-tighter leading-none">
					{homeHero.heading}
				</h1>

				<p className="text-xl md:text-2xl max-w-3xl text-page-text/80 font-medium">{homeHero.subheading}</p>

				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<Button type="button" onClick={handleNavigate(UrlConfig.secret)} variant="default" size="lg" className="gap-3 group">
						Create Secret
						<svg
							className="w-5 h-5 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							strokeWidth="2.5"
						>
							<path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Button>

					<Button type="button" variant="outline" size="lg" onClick={handleNavigate(UrlConfig.about)}>
						How it works
					</Button>
				</div>
			</section>

			{/* Features Section */}
			<section className="max-w-7xl mx-auto w-full px-7">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{homeFeatures.map((feature) => (
						<FeatureCard key={feature.title} {...feature} className="items-center text-center" iconClassName="self-center" />
					))}
				</div>
			</section>

			{/* Trust Section */}
			<section className="bg-brand text-page-bg py-20 px-7">
				<div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
					<h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{homeTrust.heading}</h2>
					<p className="text-lg opacity-80 max-w-2xl font-medium">{homeTrust.body}</p>
					<Link to={UrlConfig.about}>
						<span className="text-sm font-bold uppercase tracking-widest underline underline-offset-8 hover:opacity-70 transition-opacity">
							{homeTrust.cta}
						</span>
					</Link>
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="max-w-7xl mx-auto w-full px-7 text-center mb-12">
				<div className="border-2 border-dashed border-brand/20 rounded-[40px] py-16 px-6">
					<h2 className="text-3xl font-black text-page-text mb-6 uppercase">{homeCta.heading}</h2>
					<Button type="button" onClick={handleNavigate(UrlConfig.secret)} variant="default" size="lg" className="px-12">
						{homeCta.button}
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Home;
