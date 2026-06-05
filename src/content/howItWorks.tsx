import { FeatureItem } from '../components/UI/FeatureCard';

export const howItWorksHero = {
	heading: (
		<>
			How <span className="text-brand">OneVello</span> Works
		</>
	),
	subheading: 'Your security is built into our code. We use mathematical encryption to ensure your secrets stay secret.',
};

export const howItWorksCta = {
	heading: 'Ready to share securely?',
	button: 'Create Your First Secret',
};

export const howItWorksSections: FeatureItem[] = [
	{
		title: '1. Privacy by Design: Zero-Knowledge',
		description: 'When you enter a message in OneVello, it never leaves your browser in a readable format.',
		details: [
			'Client-Side Encryption: Your text is encrypted locally using the AES-GCM algorithm.',
			'The Passphrase: Your secret key is used to lock data on your device and is never sent to our servers.',
		],
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
	{
		title: '2. Secure Storage & Transmission',
		description: 'Once encrypted, the "ciphered" package is sent to our secure database.',
		details: [
			'Encrypted Bundles: We only store encrypted blobs that look like random characters even to our administrators.',
			'Secure Channel: Data is transmitted over an encrypted connection to prevent interception.',
		],
		icon: (
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
				/>
			</svg>
		),
	},
	{
		title: '3. Controlled Access',
		description: 'You decide exactly how and when your information can be accessed.',
		details: [
			'One-Time View: Messages can self-destruct immediately after the first time they are opened.',
			'Expiration Date: Links become invalid after a precise date, marking data for permanent deletion.',
		],
		icon: (
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
	},
	{
		title: '4. Local Decryption',
		description: 'To read the message, the recipient must have the unique link and the correct passphrase.',
		details: [
			'Recipient-Side: The decryption process happens entirely in the recipient browser.',
			'No Trace: Once a message is viewed or expires, it is permanently removed with no logs left behind.',
		],
		icon: (
			<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
				/>
			</svg>
		),
	},
];
