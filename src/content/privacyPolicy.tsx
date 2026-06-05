import { ReactNode } from 'react';

export interface PolicySection {
	title: string;
	content: ReactNode;
}

export const privacyPolicySections: PolicySection[] = [
	{
		title: '1. Zero-Knowledge Commitment',
		content: (
			<p>
				Our core philosophy is that we shouldn't know anything about your secrets. All encryption and decryption happen locally in
				your browser.
			</p>
		),
	},
	{
		title: '2. Information We Collect',
		content: (
			<p>
				We do not collect personal information such as names, emails, or IP addresses. We only store encrypted "blobs" of data
				provided by you, which are unreadable to us.
			</p>
		),
	},
	{
		title: '3. Data Retention',
		content: (
			<>
				<p>Encrypted messages are stored temporarily. They are permanently deleted from our servers when:</p>
				<ul className="list-disc pl-5 mt-2 space-y-1">
					<li>The recipient views the message (if "One-time view" is enabled).</li>
					<li>The expiration time set by the sender is reached.</li>
				</ul>
			</>
		),
	},
	{
		title: '4. Cookies',
		content: (
			<p>We do not use tracking or advertising cookies. Minimal local storage may be used to save your theme preferences.</p>
		),
	},
	{
		title: '5. Contact Us',
		content: (
			<p>
				If you have questions about this policy, contact us at <span className="text-brand font-bold">support@myslennya.com</span>.
			</p>
		),
	},
];
