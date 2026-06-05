import { Button } from 'perkslab-ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import FeatureCard from '../components/UI/FeatureCard';
import { howItWorksCta, howItWorksHero, howItWorksSections } from '../content/howItWorks';
import { UrlConfig } from '../constants/UrlConfig';

const HowItWorks = () => {
	const navigate = useNavigate();

	const handleNavigateToSecret = useCallback(() => {
		navigate(UrlConfig.secret);
	}, [navigate]);

	return (
		<section className="max-w-4xl mx-auto py-12 px-6 transition-colors duration-300">
			<div className="text-center mb-16">
				<h1 className="text-4xl md:text-5xl font-black text-page-text mb-4 uppercase tracking-tighter">
					{howItWorksHero.heading}
				</h1>
				<p className="text-lg text-page-text/70 max-w-2xl mx-auto font-medium">{howItWorksHero.subheading}</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
				{howItWorksSections.map((section) => (
					<FeatureCard
						key={section.title}
						{...section}
						className="rounded-2xl bg-brand-bg/30 group"
						iconClassName="inline-block group-hover:scale-110 transition-transform rounded-xl"
					/>
				))}
			</div>

			<div className="text-center p-10 border-2 border-dashed border-brand/20 rounded-3xl bg-brand-bg/10">
				<h2 className="text-2xl font-black text-page-text mb-6 uppercase">{howItWorksCta.heading}</h2>
				<Button type="button" size="lg" className="px-12 shadow-xl" onClick={handleNavigateToSecret}>
					{howItWorksCta.button}
				</Button>
			</div>
		</section>
	);
};

export default HowItWorks;
