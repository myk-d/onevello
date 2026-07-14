const en = {
	header: {
		nav: {
			howItWorks: 'How it works',
			home: 'Home',
			privacyPolicy: 'Privacy Policy',
			termsOfUse: 'Terms of Use',
			signIn: 'Sign in',
			signOut: 'Sign out',
			dashboard: 'My secrets',
		},
	},
	home: {
		hero: {
			heading: 'Share <once>once.</once><br/>Trust <always>always.</always>',
			subheading:
				'Keep your sensitive messages and files out of chats, emails, and logs — <bold>securely and effortlessly.</bold>',
			createSecret: 'Create Secret',
			howItWorks: 'How it works',
		},
		features: {
			endToEnd: {
				title: 'End-to-End Security',
				description: 'Your text and files are encrypted directly in your browser. We never see your unencrypted content.',
			},
			selfDestructing: {
				title: 'Self-Destructing Links',
				description: 'Set your message or file to disappear forever after it has been read or after a specific time.',
			},
			totalAnonymity: {
				title: 'Your Privacy, Your Choice',
				description:
					'No account required to send or receive secrets. Optionally sign in with Google to track your sent secrets in a personal dashboard — your message content stays encrypted either way.',
			},
		},
		trust: {
			heading: 'Your data is none of our business.',
			body: 'OneVello uses industry-standard AES-GCM encryption for both messages and file attachments. We provide the tools, but you hold the keys. Everything is decrypted locally on your device.',
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
				'Your security is built into our code. We use mathematical encryption to ensure your messages and files stay secret.',
		},
		sections: {
			zeroKnowledge: {
				title: '1. Privacy by Design: Zero-Knowledge',
				description: 'When you enter a message or attach a file in OneVello, it never leaves your browser in a readable format.',
				details: [
					'Client-Side Encryption: Your text and files are encrypted locally using the AES-GCM algorithm.',
					'The Passphrase: Your secret key is used to lock data on your device and is never sent to our servers.',
					'Optional Accounts: Signing in with Google only links your account ID to your secret — your message content stays encrypted and unreadable to us regardless.',
				],
			},
			secureStorage: {
				title: '2. Secure Storage & Transmission',
				description: 'Once encrypted, text is stored in our secure database and file attachments in encrypted cloud storage — both completely inaccessible without your passphrase.',
				details: [
					'Encrypted Bundles: We only store encrypted blobs that look like random characters even to our administrators.',
					'Secure Channel: Data is transmitted over an encrypted connection to prevent interception.',
				],
			},
			controlledAccess: {
				title: '3. Controlled Access',
				description: 'You decide exactly how and when your information can be accessed.',
				details: [
					'One-Time View: Messages and files can self-destruct immediately after the first time they are opened.',
					'Expiration Date: Links become invalid after a precise date, marking data for permanent deletion.',
					'Personal Dashboard: Sign in with Google to track the status of your sent secrets — see which have been opened, which are still waiting, and when they expire.',
				],
			},
			localDecryption: {
				title: '4. Local Decryption',
				description: 'To read the message or download the file, the recipient must have the unique link and the correct passphrase.',
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
					'When you use OneVello anonymously, we store only encrypted blobs of your message content — completely unreadable to us. If you choose to sign in with Google, we receive your Google account ID, display name, and profile picture from Google\'s authentication service. This information is used solely to associate your created secrets with your account so you can review them in your personal dashboard. We do not collect IP addresses or any other tracking data.',
			},
			{
				title: '3. Data Retention',
				paragraph: 'Encrypted messages and file attachments are stored temporarily. They are permanently deleted from our servers when:',
				items: [
					'The recipient views the message (if "One-time view" is enabled).',
					'The expiration time set by the sender is reached.',
				],
			},
			{
				title: '4. Cookies & Local Storage',
				paragraph:
					'We do not use tracking or advertising cookies. Local storage is used to save your theme preferences and, if you sign in with Google, to maintain your authentication session between visits.',
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
					'OneVello provides a platform for sending encrypted, self-destructing messages and file attachments. You may use the service anonymously or sign in with Google to access a personal dashboard where you can review the status of secrets you have created. We do not store unencrypted data and do not have access to your decryption passphrases.',
			},
			{
				title: '3. User Responsibilities',
				items: [
					'You are solely responsible for the content you send.',
					'You are responsible for remembering your passphrase; without it, data cannot be recovered.',
					'If you sign in with Google, you are responsible for the security of your Google account.',
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
		attachFile: 'Attach file (max 5 MB)',
		removeFile: 'Remove',
		fileTooLarge: 'File too large. Maximum 5 MB.',
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
		downloadFile: 'Download Attachment',
		oneTimeFileWarning: 'This file can only be downloaded once. Save it before closing this window.',
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
		fileUploadFailed: 'Failed to upload file. Please try again.',
		passphraseCopied: 'Passphrase copied to clipboard!',
		incorrectPassphrase: 'Incorrect passphrase. Please try again.',
	},
	dashboard: {
		heading: 'My Secrets',
		createNew: 'Create New Secret',
		empty: 'No secrets yet. Create one to see it here.',
		signInRequired: 'Sign in to view your secrets',
		signInNote: 'Your message history is tied to your Google account.',
		oneTime: 'One-time',
		regular: 'Regular',
		copyLink: 'Copy link',
		col: {
			type: 'Type',
			file: 'File',
			expires: 'Expires',
			status: 'Status',
		},
		status: {
			opened: 'Opened',
			active: 'Waiting',
			expired: 'Expired',
		},
	},
	banner: {
		cta: 'Try {{appName}}',
	},
} as const;

export default en;
export type Translations = typeof en;
