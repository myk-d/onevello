import { Link } from 'react-router';
import { UrlConfig } from '../constants/UrlConfig';

const TermsOfUse = () => {
	return (
		<section className="max-w-4xl mx-auto py-12 px-6 text-page-text transition-colors duration-300">
			<h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Terms of Use</h1>

			<div className="space-y-8 text-page-text/80 leading-relaxed">
				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">1. Acceptance of Terms</h2>
					<p>
						By accessing and using OneVello, you agree to be bound by these Terms of Use. If you do not agree, please do not use the
						service.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">2. Description of Service</h2>
					<p>
						OneVello provides a platform for sending encrypted, self-destructing messages. We do not store unencrypted data and do not
						have access to your decryption passphrases.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">3. User Responsibilities</h2>
					<ul className="list-disc pl-5 space-y-2">
						<li>You are solely responsible for the content you send.</li>
						<li>You are responsible for remembering your passphrase; without it, data cannot be recovered.</li>
						<li>You agree not to use the service for any illegal activities or to transmit harmful content.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">4. Disclaimer of Warranty</h2>
					<p>
						The service is provided "as is" without any warranties. While we strive for maximum security, we cannot guarantee 100%
						protection against all types of cyber threats.
					</p>
				</section>

				<section className="p-6 bg-brand-bg rounded-2xl border border-brand/20">
					<p className="text-sm italic font-medium">
						For a better understanding of how we handle your data, please read our
						<Link to={UrlConfig.privacyPolicy} className="text-brand font-bold ml-1 hover:underline">
							Privacy Policy
						</Link>
						.
					</p>
				</section>
			</div>
		</section>
	);
};

export default TermsOfUse;
