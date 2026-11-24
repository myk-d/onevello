import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import PolicyLayout from '../components/Layouts/PolicyLayout';
import { UrlConfig } from '../constants/UrlConfig';

interface TermsSectionData {
	title: string;
	paragraph?: string;
	items?: string[];
}

const TermsOfUse = () => {
	const { t } = useTranslation();
	const sections = t('termsOfUse.sections', { returnObjects: true }) as TermsSectionData[];

	return (
		<PolicyLayout title={t('termsOfUse.title')}>
			{sections.map((section) => (
				<section key={section.title}>
					<h2 className="mb-3 font-heading text-xl font-semibold">{section.title}</h2>
					{section.paragraph && <p>{section.paragraph}</p>}
					{section.items && (
						<ul className="list-disc pl-5 space-y-2">
							{section.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					)}
				</section>
			))}

			<section className="ov-card">
				<p className="text-sm">
					{t('termsOfUse.footer')}
					<Link to={UrlConfig.privacyPolicy} className="ml-1 font-semibold text-primary hover:underline">
						{t('termsOfUse.footerLink')}
					</Link>
					.
				</p>
			</section>
		</PolicyLayout>
	);
};

export default TermsOfUse;
