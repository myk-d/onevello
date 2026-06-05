import { Button } from 'perkslab-ui';
import { useCallback, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import FeatureCard from '../components/UI/FeatureCard';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { UrlConfig } from '../constants/UrlConfig';
import { homeFeatureIcons, homeFeatureKeys } from '../content/home';

const Home = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleNavigate = useCallback((to: string) => () => navigate(to), [navigate]);

	useEffect(() => {
		if (localStorage.getItem(isSecretWasCreatedOnDeviceStorageKey) === 'true') {
			localStorage.removeItem(isSecretWasCreatedOnDeviceStorageKey);
			navigate(UrlConfig.secret);
		}
	}, [navigate]);

	const features = homeFeatureKeys.map((key) => ({
		key,
		icon: homeFeatureIcons[key],
		title: t(`home.features.${key}.title`),
		description: t(`home.features.${key}.description`),
	}));

	return (
		<div className="flex flex-col gap-24 py-12">
			{/* Hero Section */}
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 min-h-[60dvh]">
				<h1 className="text-5xl md:text-7xl font-black text-page-text uppercase tracking-tighter leading-none">
					<Trans
						i18nKey="home.hero.heading"
						components={{
							once: <span className="text-brand italic" />,
							always: <span className="text-brand italic" />,
							br: <br />,
						}}
					/>
				</h1>

				<p className="text-xl md:text-2xl max-w-3xl text-page-text/80 font-medium">
					<Trans
						i18nKey="home.hero.subheading"
						components={{ bold: <span className="text-brand font-bold" /> }}
					/>
				</p>

				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<Button type="button" onClick={handleNavigate(UrlConfig.secret)} variant="default" size="lg" className="gap-3 group">
						{t('home.hero.createSecret')}
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
						{t('home.hero.howItWorks')}
					</Button>
				</div>
			</section>

			{/* Features Section */}
			<section className="max-w-7xl mx-auto w-full px-7">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map(({ key, ...rest }) => (
						<FeatureCard key={key} {...rest} className="items-center text-center" iconClassName="self-center" />
					))}
				</div>
			</section>

			{/* Trust Section */}
			<section className="bg-brand text-page-bg py-20 px-7">
				<div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
					<h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{t('home.trust.heading')}</h2>
					<p className="text-lg opacity-80 max-w-2xl font-medium">{t('home.trust.body')}</p>
					<Link to={UrlConfig.about}>
						<span className="text-sm font-bold uppercase tracking-widest underline underline-offset-8 hover:opacity-70 transition-opacity">
							{t('home.trust.cta')}
						</span>
					</Link>
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="max-w-7xl mx-auto w-full px-7 text-center mb-12">
				<div className="border-2 border-dashed border-brand/20 rounded-[40px] py-16 px-6">
					<h2 className="text-3xl font-black text-page-text mb-6 uppercase">{t('home.cta.heading')}</h2>
					<Button type="button" onClick={handleNavigate(UrlConfig.secret)} variant="default" size="lg" className="px-12">
						{t('home.cta.button')}
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Home;
