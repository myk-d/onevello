import { useTranslation } from 'react-i18next';
import PolicyLayout from '../components/Layouts/PolicyLayout';

interface PolicySectionData {
	title: string;
	paragraph?: string;
	items?: string[];
	email?: string;
}

const PrivacyPolicy = () => {
	const { t } = useTranslation();
	const sections = t('privacyPolicy.sections', { returnObjects: true }) as PolicySectionData[];

	return (
		<PolicyLayout title={t('privacyPolicy.title')}>
			{sections.map((section) => (
				<section key={section.title}>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">{section.title}</h2>
					{section.paragraph && (
						<p>
							{section.paragraph}
							{section.email && <span className="text-brand font-bold ml-1">{section.email}</span>}
						</p>
					)}
					{section.items && (
						<ul className="list-disc pl-5 mt-2 space-y-1">
							{section.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					)}
				</section>
			))}
		</PolicyLayout>
	);
};

export default PrivacyPolicy;
