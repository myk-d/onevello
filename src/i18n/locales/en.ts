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
			admin: 'Admin',
		},
		theme: {
			label: 'Theme',
			auto: 'Auto',
			light: 'Light',
			dark: 'Dark',
		},
	},
	home: {
		hero: {
			heading: 'Share <once>once.</once><br/>Trust <always>always.</always>',
			subheading:
				'Keep passwords and files out of chats and email. <bold>Encrypted in your browser, opened once.</bold>',
			createSecret: 'Create a secret',
			howItWorks: 'How it works',
		},
		features: {
			endToEnd: {
				title: 'Encrypted in your browser',
				description: 'Your text and files are encrypted in your browser before they are sent. The passphrase is not part of the link.',
			},
			selfDestructing: {
				title: 'Opened once',
				description: 'Opening a one-time link deletes the secret. Every secret also has an expiration date, checked when the link is opened.',
			},
			totalAnonymity: {
				title: 'Account optional',
				description:
					'No account required to send or open a secret. Optionally sign in with Google to see your sent secrets in a personal dashboard — the content stays encrypted either way.',
			},
		},
		trust: {
			heading: 'Encrypted before it leaves your browser.',
			body: 'OneVello uses AES-GCM encryption for text and file attachments. Decryption happens in the recipient’s browser, with the passphrase you share separately. If the passphrase is lost, the secret cannot be recovered.',
			cta: 'Read the technical details',
		},
		cta: {
			heading: 'Ready to send a secret?',
			button: 'Create a secret',
		},
	},
	howItWorks: {
		hero: {
			heading: 'How <brand>OneVello</brand> Works',
			subheading:
				'Your secret is encrypted in your browser and opened with a passphrase you share separately from the link.',
		},
		sections: {
			zeroKnowledge: {
				title: '1. Privacy by Design: Zero-Knowledge',
				description: 'When you enter a secret or attach a file in OneVello, it never leaves your browser in a readable format.',
				details: [
					'Client-Side Encryption: Your text and files are encrypted locally using the AES-GCM algorithm.',
					'The Passphrase: The passphrase locks your data on your device and is never sent to our servers. Send it to the recipient separately from the link.',
					'Optional Accounts: Signing in with Google only links your account ID to your secret — your secret stays encrypted and unreadable to us regardless.',
				],
			},
			secureStorage: {
				title: '2. Storage and transmission',
				description: 'Once encrypted, text is stored in our database and file attachments in cloud storage — both unreadable without your passphrase.',
				details: [
					'Encrypted Bundles: We only store encrypted blobs that look like random characters even to our administrators.',
					'Encrypted channel: Data is transmitted over an encrypted connection to prevent interception.',
				],
			},
			controlledAccess: {
				title: '3. Controlled Access',
				description: 'You decide exactly how and when your information can be accessed.',
				details: [
					'One-time link: A one-time secret is deleted when its link is opened for the first time.',
					'Expiration date: After this date the link stops working. An expired secret is deleted the next time someone opens its link.',
					'Personal Dashboard: Sign in with Google to track the status of your sent secrets — see which have been opened, which are still waiting, and when they expire.',
				],
			},
			localDecryption: {
				title: '4. Local Decryption',
				description: 'To read the secret or download the file, the recipient must have the link and the correct passphrase.',
				details: [
					'Recipient-Side: The decryption process happens entirely in the recipient browser.',
					'Deletion: A one-time secret is deleted when it is opened. An expired secret is deleted when someone opens its link, or during an admin cleanup.',
				],
			},
		},
		cta: {
			heading: 'Ready to send a secret?',
			button: 'Create your first secret',
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
					'When you use OneVello anonymously, we store only encrypted blobs of your secret content — completely unreadable to us. If you choose to sign in with Google, we receive your Google account ID, display name, and profile picture from Google\'s authentication service. This information is used solely to associate your created secrets with your account so you can review them in your personal dashboard. Our hosting providers may process technical data, such as IP addresses, to serve the site.',
			},
			{
				title: '3. Data Retention',
				paragraph: 'Encrypted secrets and file attachments are stored temporarily. They are deleted from our servers when:',
				items: [
					'The recipient opens the link (if "One-time link" is enabled).',
					'The link is opened after the expiration time set by the sender, or an admin cleanup removes the expired secret.',
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
					'OneVello provides a platform for sending encrypted secrets and file attachments that can be opened once. You may use the service anonymously or sign in with Google to access a personal dashboard where you can review the status of secrets you have created. We do not store unencrypted data and do not have access to your decryption passphrases.',
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
					'The service is provided "as is" without any warranties. While we work to protect your data, we cannot guarantee 100% protection against all types of cyber threats.',
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
		expirationDate: 'Expiration date',
		oneTimeAccess: 'One-time link *',
		oneTimeNote: '* Opening the link deletes the secret. The link works once.',
		createLink: 'Seal and create link',
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
		tooltips: {
			secretText: 'Encrypted in your browser before it is sent — we never see the plain text.',
			charCount: 'Maximum secret length.',
			attachFile: 'The file is encrypted the same way as your text. Maximum size 5 MB.',
			removeFile: 'Remove the attached file.',
			passphrase: 'Needed by the recipient to decrypt the secret. We never store it — if it is lost, the secret cannot be recovered.',
			randomPassphrase: 'Generate a random passphrase.',
			passphraseStrength: 'Longer passphrases with mixed case, numbers, and symbols are harder to guess.',
			expirationDate: 'After this moment, the link stops working and is permanently deleted the next time anyone opens it.',
			oneTimeAccess: 'Opening the link once deletes the secret, even before it expires.',
		},
	},
	secretId: {
		preview: 'Open',
		oneTimeWarning: 'This secret can be opened once. Opening this page has already destroyed it, so copy what you need before you close it.',
		regularWarning: 'This secret can be opened until it expires.',
		attemptsRemaining: 'Attempts left: {{count}}. After that the secret is deleted.',
		tooltips: {
			passphrase: 'This was shared with you separately from the link — it is not part of the URL.',
			preview: 'Wrong passphrases count against a limit of {{max}} attempts, after which the secret is deleted.',
		},
	},
	decryptedMessage: {
		label: 'Secret text',
		oneTimeWarning: 'This secret can be opened once. Opening this page has already destroyed it, so copy what you need before you close it.',
		closeWindowNote: 'You can close this window when done.',
		copyToClipboard: 'Copy to clipboard',
		copied: 'Copied',
		createSecret: 'Create a secret',
		downloadFile: 'Download attachment',
		oneTimeFileWarning: 'This file can only be downloaded once. Save it before closing this window.',
		tooltips: {
			label: 'The decrypted secret text. It only exists in your browser — it was never sent to us unencrypted.',
			copyToClipboard: 'Copy the decrypted text to your clipboard.',
			downloadFile: 'Download the decrypted attachment.',
			downloadFileOneTime: 'Downloading now deletes the file permanently — you can only do this once.',
			createSecret: 'Start creating a new encrypted secret.',
		},
	},
	encryptedLink: {
		copyToClipboard: 'Copy link',
		copied: 'Copied',
		createAnother: 'Create another secret',
		tooltips: {
			openLink: 'Open the secret link in a new tab.',
			copyToClipboard: 'Copy the secret link to your clipboard.',
			createAnother: 'Discard this link and create another secret.',
		},
	},
	expiredLink: {
		message: 'This secret is gone: it was opened or it expired.',
		home: 'Home',
		createSecret: 'Create a secret',
	},
	toasts: {
		failedToCreate: 'Failed to create secret. Please try again.',
		fileUploadFailed: 'Failed to upload file. Please try again.',
		passphraseCopied: 'Passphrase copied.',
		incorrectPassphrase: 'Wrong passphrase. Try again.',
	},
	support: {
		emailCopied: 'Support email copied to clipboard.',
	},
	dashboard: {
		heading: 'My secrets',
		createNew: 'Create a new secret',
		empty: 'No secrets yet. Create one to see it here.',
		signInRequired: 'Sign in to view your secrets',
		signInNote: 'Your list of secrets is tied to your Google account.',
		oneTime: 'One-time',
		oneTimeHint: 'Deleted when opened once, even before it expires.',
		regular: 'Regular',
		regularHint: 'Can be opened multiple times until it expires.',
		copyLink: 'Copy link',
		copyLinkHint: 'Copy this secret’s link to your clipboard.',
		col: {
			type: 'Type',
			typeHint: 'Whether the secret is deleted after one opening or stays until it expires.',
			file: 'File',
			expires: 'Expires',
			expiresHint: 'After this date, the secret can no longer be opened.',
			status: 'Status',
			statusHint: 'Whether the secret is still waiting, has been opened, or has expired.',
		},
		status: {
			opened: 'Opened',
			openedHint: 'The recipient has already opened this secret.',
			active: 'Waiting',
			activeHint: 'Not opened yet and not expired.',
			expired: 'Expired',
			expiredHint: 'Past its expiration date. It will be deleted the next time someone opens the link, or by an admin cleanup.',
		},
	},
	admin: {
		heading: 'Expired secrets',
		description:
			'Secrets that have passed their expiration date are only removed automatically when someone opens their link. This lists every expired secret still stored in the database — including anonymous ones with no owner — so you can permanently delete them and free up storage.',
		empty: 'No expired secrets to clean up.',
		delete: 'Delete',
		deleteHint: 'Permanently deletes this secret and its attached file (if any). This cannot be undone.',
		deleting: 'Deleting…',
		deleteAll: 'Delete all',
		deleteAllHint: 'Permanently deletes every expired secret listed below, and their files. This cannot be undone.',
		confirmDeleteAll: 'Delete {{count}} expired secret(s)? This cannot be undone.',
		col: {
			id: 'ID',
			idHint: 'The secret’s document ID in the database.',
			file: 'File',
			fileHint: 'The attached file name, if the secret included one.',
			noFileHint: 'This secret has no attached file.',
			expired: 'Expired',
			expiredHint: 'The date and time the secret stopped being accessible.',
			expiredDaysAgo: '{{count}} day(s) ago',
		},
		permissionDenied: {
			title: "You don't have permission to view this data.",
			hint: 'Your account is signed in, but the database security rules only allow specific admin accounts to list expired secrets. Make sure you are signed in with an approved admin account.',
		},
		toasts: {
			loadFailed: 'Failed to load expired secrets.',
			deleteFailed: 'Failed to delete secret. Please try again.',
			deleteAllSuccess: 'Expired secrets deleted.',
		},
	},
	banner: {
		cta: 'Try {{appName}}',
	},
} as const;

export default en;
export type Translations = typeof en;
