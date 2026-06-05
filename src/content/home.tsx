import { FeatureItem } from '../components/UI/FeatureCard';

export const homeHero = {
	heading: (
		<>
			Share <span className="text-brand italic">once.</span>
			<br />
			Trust <span className="text-brand italic">always.</span>
		</>
	),
	subheading: (
		<>
			Keep your sensitive information out of chats, emails, and logs —
			<span className="text-brand font-bold"> securely and effortlessly.</span>
		</>
	),
};

export const homeTrust = {
	heading: 'Your data is none of our business.',
	body: 'OneVello uses industry-standard AES-GCM encryption. We provide the tools, but you hold the keys. Everything is decrypted locally on your device.',
	cta: 'Read the technical details',
};

export const homeCta = {
	heading: 'Ready to send a secure link?',
	button: 'Get Started Now',
};

export const homeFeatures: FeatureItem[] = [
	{
		title: 'End-to-End Security',
		description: 'Data is encrypted directly in your browser. We never see your unencrypted secrets.',
		icon: (
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04default 12.02 12.02 0 005.674 8.149L12 21l3.944-2.812a12.02 12.02 0 005.674-8.149z"
				/>
			</svg>
		),
	},
	{
		title: 'Self-Destructing Links',
		description: 'Set your message to disappear forever after it has been read or after a specific time.',
		icon: (
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
				/>
			</svg>
		),
	},
	{
		title: 'Total Anonymity',
		description: 'No accounts required. No personal data collected. Just pure privacy for everyone.',
		icon: (
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
				/>
			</svg>
		),
	},
];
