const en = {
	header: {
		nav: {
			howItWorks: 'How it works',
			home: 'Home',
			privacyPolicy: 'Privacy Policy',
			termsOfUse: 'Terms of Use',
		},
	},
	home: {
		hero: {
			heading: 'Share <once>once.</once><br/>Trust <always>always.</always>',
			subheading:
				'Keep your sensitive information out of chats, emails, and logs — <bold>securely and effortlessly.</bold>',
			createSecret: 'Create Secret',
			howItWorks: 'How it works',
		},
		features: {
			endToEnd: {
				title: 'End-to-End Security',
				description: 'Data is encrypted directly in your browser. We never see your unencrypted secrets.',
			},
			selfDestructing: {
				title: 'Self-Destructing Links',
				description: 'Set your message to disappear forever after it has been read or after a specific time.',
			},
			totalAnonymity: {
				title: 'Total Anonymity',
				description: 'No accounts required. No personal data collected. Just pure privacy for everyone.',
			},
		},
		trust: {
			heading: 'Your data is none of our business.',
			body: 'OneVello uses industry-standard AES-GCM encryption. We provide the tools, but you hold the keys. Everything is decrypted locally on your device.',
			cta: 'Read the technical details',
		},
		cta: {
			heading: 'Ready to send a secure link?',
			button: 'Get Started Now',
		},
	},
	howItWorks: {
		hero: {
			heading: 'How <brand>OneVello</brand> Works',
			subheading:
				'Your security is built into our code. We use mathematical encryption to ensure your secrets stay secret.',
		},
		sections: {
			zeroKnowledge: {
				title: '1. Privacy by Design: Zero-Knowledge',
				description: 'When you enter a message in OneVello, it never leaves your browser in a readable format.',
				details: [
					'Client-Side Encryption: Your text is encrypted locally using the AES-GCM algorithm.',
					'The Passphrase: Your secret key is used to lock data on your device and is never sent to our servers.',
				],
			},
			secureStorage: {
				title: '2. Secure Storage & Transmission',
				description: 'Once encrypted, the "ciphered" package is sent to our secure database.',
				details: [
					'Encrypted Bundles: We only store encrypted blobs that look like random characters even to our administrators.',
					'Secure Channel: Data is transmitted over an encrypted connection to prevent interception.',
				],
			},
			controlledAccess: {
				title: '3. Controlled Access',
				description: 'You decide exactly how and when your information can be accessed.',
				details: [
					'One-Time View: Messages can self-destruct immediately after the first time they are opened.',
					'Expiration Date: Links become invalid after a precise date, marking data for permanent deletion.',
				],
			},
			localDecryption: {
				title: '4. Local Decryption',
				description: 'To read the message, the recipient must have the unique link and the correct passphrase.',
				details: [
					'Recipient-Side: The decryption process happens entirely in the recipient browser.',
					'No Trace: Once a message is viewed or expires, it is permanently removed with no logs left behind.',
				],
			},
		},
		cta: {
			heading: 'Ready to share securely?',
			button: 'Create Your First Secret',
		},
	},
	privacyPolicy: {
		title: 'Privacy Policy',
		sections: [
			{
				title: '1. Zero-Knowledge Commitment',
				paragraph:
					"Our core philosophy is that we shouldn't know anything about your secrets. All encryption and decryption happen locally in your browser.",
			},
			{
				title: '2. Information We Collect',
				paragraph:
					'We do not collect personal information such as names, emails, or IP addresses. We only store encrypted "blobs" of data provided by you, which are unreadable to us.',
			},
			{
				title: '3. Data Retention',
				paragraph: 'Encrypted messages are stored temporarily. They are permanently deleted from our servers when:',
				items: [
					'The recipient views the message (if "One-time view" is enabled).',
					'The expiration time set by the sender is reached.',
				],
			},
			{
				title: '4. Cookies',
				paragraph:
					'We do not use tracking or advertising cookies. Minimal local storage may be used to save your theme preferences.',
			},
			{
				title: '5. Contact Us',
				paragraph: 'If you have questions about this policy, contact us at',
				email: 'support@myslennya.com',
			},
		],
	},
	termsOfUse: {
		title: 'Terms of Use',
		sections: [
			{
				title: '1. Acceptance of Terms',
				paragraph:
					'By accessing and using OneVello, you agree to be bound by these Terms of Use. If you do not agree, please do not use the service.',
			},
			{
				title: '2. Description of Service',
				paragraph:
					'OneVello provides a platform for sending encrypted, self-destructing messages. We do not store unencrypted data and do not have access to your decryption passphrases.',
			},
			{
				title: '3. User Responsibilities',
				items: [
					'You are solely responsible for the content you send.',
					'You are responsible for remembering your passphrase; without it, data cannot be recovered.',
					'You agree not to use the service for any illegal activities or to transmit harmful content.',
				],
			},
			{
				title: '4. Disclaimer of Warranty',
				paragraph:
					'The service is provided "as is" without any warranties. While we strive for maximum security, we cannot guarantee 100% protection against all types of cyber threats.',
			},
		],
		footer: 'For a better understanding of how we handle your data, please read our',
		footerLink: 'Privacy Policy',
	},
	form: {
		secretText: 'Secret text',
		secretTextPlaceholder: 'some secret text here',
		passphrase: 'Passphrase',
		passphrasePlaceholder: 'Enter passphrase',
		expirationDate: 'Expiration Date',
		oneTimeAccess: 'One time link access *',
		oneTimeNote: '* Your message will self-destruct after being viewed. The link can only be accessed once.',
		createLink: 'Create link',
		strength: {
			weak: 'Weak',
			fair: 'Fair',
			strong: 'Strong',
		},
		presets: {
			h1: '1h',
			d1: '24h',
			d7: '7d',
			d30: '30d',
		},
	},
	secretId: {
		preview: 'Preview',
		oneTimeWarning: 'This message is one-time access and will self-destruct after being viewed.',
		regularWarning: 'This message can be viewed until it expires.',
		attemptsRemaining: '{{count}} attempts remaining before this secret is permanently deleted.',
	},
	decryptedMessage: {
		label: 'Secret text',
		oneTimeWarning: 'This message is one-time access and will self-destruct after being viewed.',
		closeWindowNote: 'You can close this window when done.',
		copyToClipboard: 'Copy to clipboard',
		copied: 'Copied',
		createSecret: 'Create Secret',
	},
	encryptedLink: {
		copyToClipboard: 'Copy to clipboard',
		copied: 'Copied',
		createAnother: 'Create Another Secret',
	},
	expiredLink: {
		message: 'This secret has been viewed or expired.',
		home: 'Home',
		createSecret: 'Create Secret',
	},
	toasts: {
		failedToCreate: 'Failed to create secret. Please try again.',
		passphraseCopied: 'Passphrase copied to clipboard!',
		incorrectPassphrase: 'Incorrect passphrase. Please try again.',
	},
} as const;

export default en;
export type Translations = typeof en;
