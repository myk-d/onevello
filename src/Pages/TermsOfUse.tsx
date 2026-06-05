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
					<h2 className="text-xl font-bold text-brand uppercase mb-3">{section.title}</h2>
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

			<section className="p-6 bg-brand-bg rounded-2xl border border-brand/20">
				<p className="text-sm italic font-medium">
					{t('termsOfUse.footer')}
					<Link to={UrlConfig.privacyPolicy} className="text-brand font-bold ml-1 hover:underline">
						{t('termsOfUse.footerLink')}
					</Link>
					.
				</p>
			</section>
		</PolicyLayout>
	);
};

export default TermsOfUse;
