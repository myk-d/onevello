import PolicyLayout from '../components/Layouts/PolicyLayout';
import { termsOfUseFooter, termsOfUseSections } from '../content/termsOfUse';

const TermsOfUse = () => (
	<PolicyLayout title="Terms of Use">
		{termsOfUseSections.map((section) => (
			<section key={section.title}>
				<h2 className="text-xl font-bold text-brand uppercase mb-3">{section.title}</h2>
				{section.content}
			</section>
		))}
		{termsOfUseFooter}
	</PolicyLayout>
);

export default TermsOfUse;
