import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button } from '../components/UI/kit';
import FeatureCard from '../components/UI/FeatureCard';
import { UrlConfig } from '../constants/UrlConfig';
import { howItWorksSectionIcons, howItWorksSectionKeys } from '../content/howItWorks';

const HowItWorks = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleNavigateToSecret = useCallback(() => navigate(UrlConfig.secret), [navigate]);

	const sections = howItWorksSectionKeys.map((key) => ({
		key,
		icon: howItWorksSectionIcons[key],
		title: t(`howItWorks.sections.${key}.title`),
		description: t(`howItWorks.sections.${key}.description`),
		details: t(`howItWorks.sections.${key}.details`, { returnObjects: true }) as string[],
	}));

	return (
		<section className="mx-auto w-full max-w-[980px] px-4 py-8 md:py-14">
			<div className="mb-10 text-center md:mb-14">
				<h1 className="mb-4 font-heading text-3xl font-semibold leading-10 tracking-tight md:text-5xl md:leading-[56px]">
					<Trans
						i18nKey="howItWorks.hero.heading"
						components={{ brand: <span className="text-seal" /> }}
					/>
				</h1>
				<p className="mx-auto max-w-2xl text-lg text-muted">{t('howItWorks.hero.subheading')}</p>
			</div>

			<div className="mb-10 grid grid-cols-1 gap-4 md:mb-14 md:grid-cols-2 md:gap-6">
				{sections.map(({ key, ...rest }) => (
					<FeatureCard
						key={key}
						{...rest}
						className="md:last:odd:col-span-2"
					/>
				))}
			</div>

			<div className="ov-card is-empty items-center text-center">
				<h2 className="font-heading text-2xl font-semibold leading-8">{t('howItWorks.cta.heading')}</h2>
				<Button type="button" size="lg" onClick={handleNavigateToSecret}>
					{t('howItWorks.cta.button')}
				</Button>
			</div>
		</section>
	);
};

export default HowItWorks;
