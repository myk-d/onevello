import { ReactNode } from 'react';
import { Link } from 'react-router';
import { UrlConfig } from '../constants/UrlConfig';
import { PolicySection } from './privacyPolicy';

export const termsOfUseSections: PolicySection[] = [
	{
		title: '1. Acceptance of Terms',
		content: (
			<p>
				By accessing and using OneVello, you agree to be bound by these Terms of Use. If you do not agree, please do not use the
				service.
			</p>
		),
	},
	{
		title: '2. Description of Service',
		content: (
			<p>
				OneVello provides a platform for sending encrypted, self-destructing messages. We do not store unencrypted data and do not
				have access to your decryption passphrases.
			</p>
		),
	},
	{
		title: '3. User Responsibilities',
		content: (
			<ul className="list-disc pl-5 space-y-2">
				<li>You are solely responsible for the content you send.</li>
				<li>You are responsible for remembering your passphrase; without it, data cannot be recovered.</li>
				<li>You agree not to use the service for any illegal activities or to transmit harmful content.</li>
			</ul>
		),
	},
	{
		title: '4. Disclaimer of Warranty',
		content: (
			<p>
				The service is provided "as is" without any warranties. While we strive for maximum security, we cannot guarantee 100%
				protection against all types of cyber threats.
			</p>
		),
	},
];

export const termsOfUseFooter: ReactNode = (
	<section className="p-6 bg-brand-bg rounded-2xl border border-brand/20">
		<p className="text-sm italic font-medium">
			For a better understanding of how we handle your data, please read our
			<Link to={UrlConfig.privacyPolicy} className="text-brand font-bold ml-1 hover:underline">
				Privacy Policy
			</Link>
			.
		</p>
	</section>
);
