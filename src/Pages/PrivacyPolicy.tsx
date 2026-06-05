import PolicyLayout from '../components/Layouts/PolicyLayout';
import { privacyPolicySections } from '../content/privacyPolicy';

const PrivacyPolicy = () => (
	<PolicyLayout title="Privacy Policy">
		{privacyPolicySections.map((section) => (
			<section key={section.title}>
				<h2 className="text-xl font-bold text-brand uppercase mb-3">{section.title}</h2>
				{section.content}
			</section>
		))}
	</PolicyLayout>
);

export default PrivacyPolicy;
