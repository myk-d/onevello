const en = {
	header: {
		nav: {
			howItWorks: 'How it works',
			security: 'Security',
			home: 'Home',
			privacyPolicy: 'Privacy Policy',
			termsOfUse: 'Terms of Use',
			signIn: 'Sign in',
			signOut: 'Sign out',
			dashboard: 'My secrets',
			admin: 'Admin',
			faq: 'FAQ',
			github: 'GitHub',
		},
		theme: {
			label: 'Theme',
			auto: 'Auto',
			light: 'Light',
			dark: 'Dark',
		},
		menu: 'Menu',
		menuClose: 'Close menu',
	},
	footer: {
		openSource: 'Open source',
		security: 'Security',
		privacy: 'Privacy',
		terms: 'Terms',
		tagline: 'Share once. Trust always.',
	},
	landing: {
		hero: {
			heading: 'Share <em>once.</em><br/>Trust always.',
			lead: 'Send a password, a key or a small file as a sealed link. The link opens nothing without the passphrase, and the passphrase travels another way.',
			createSecret: 'Create a secret link',
			howItWorks: 'How it works',
			facts: ['Encrypted in your browser', 'No account to send or open', 'Open source'],
			visual: {
				label: 'Link ready',
				link: '…/secret/k7q2 9xmd 4wfa',
				chips: ['Opens once', 'Expires in 24h'],
				note: 'Send the passphrase another way.',
			},
		},
		how: {
			title: 'How it works',
			lead: 'Three steps, and the order matters.',
			steps: [
				{
					title: 'Write and seal',
					desc: 'Type the secret or attach a file up to 5 MB, choose a passphrase, an expiry and whether it opens once. It is encrypted in your browser: AES-256-GCM with a key derived from the passphrase (PBKDF2-SHA256, 600 000 rounds).',
				},
				{
					title: 'Send the link, then the passphrase',
					desc: 'The link goes by chat or email. The passphrase goes another way: a call, SMS or a different messenger. Neither one opens the secret alone.',
				},
				{
					title: 'The first opening breaks the seal',
					desc: 'A one-time secret is deleted from our server when the recipient breaks the seal and opens it. Other secrets open until they expire. After 5 wrong passphrases the secret is deleted.',
				},
			],
		},
		protection: {
			title: 'What is protected, and what isn’t',
			lead: 'Every claim here is true in the code. The second list matters as much as the first.',
			yesTitle: 'Protected',
			yes: [
				'The text and the file contents are encrypted before they leave your browser. We store only ciphertext.',
				'The passphrase is not in the link, and we never store it.',
				'A one-time secret is deleted from the server when the recipient breaks the seal and opens it.',
				'An expired link stops working.',
				'5 wrong passphrases delete the secret.',
			],
			noTitle: 'Not protected',
			no: [
				'A weak or leaked passphrase. Anyone with the link can try passphrases offline, so use a long one.',
				'Whoever breaks the seal first. If the link was forwarded, someone else may open the secret before you.',
				'After it is opened, the secret is in the recipient’s hands. We delete it from the server, but can’t stop them copying the text or taking a screenshot.',
				'Malware or a bad browser extension on either device.',
			],
		},
		features: {
			title: 'What you get',
			items: [
				{ value: '10 000', label: 'characters of text per secret' },
				{ value: '5 MB', label: 'one file, encrypted the same way' },
				{ value: '1h · 24h · 7d · 30d', label: 'or any date you pick' },
				{ value: '1 or ∞', label: 'opens once, or until it expires' },
				{ value: '0', label: 'accounts needed to send or open' },
				{ value: 'uk · en', label: 'light and dark' },
			],
			note: 'Optional: sign in with Google to see your sent secrets as Waiting, Opened or Expired. The content stays encrypted either way.',
		},
		faq: {
			title: 'Questions',
			items: [
				{
					q: 'Can OneVello read my secret?',
					a: 'No. We store only ciphertext, and without the passphrase it can’t be decrypted. What else is stored next to it is listed in the Privacy Policy.',
				},
				{
					q: 'Why isn’t the passphrase in the link?',
					a: 'So that a leaked or forwarded link alone opens nothing. The cost is one extra step: the recipient types the passphrase.',
				},
				{
					q: 'How long should the passphrase be?',
					a: 'Longer is stronger: anyone who gets the link can try passphrases offline. Use 12+ characters or four random words. The generator gives a quick suggestion.',
				},
				{
					q: 'I lost the passphrase. Can you recover the secret?',
					a: 'No. Nobody can, including us. Create a new secret.',
				},
				{
					q: 'What happens when a link expires?',
					a: 'It stops working at once. The stored ciphertext is deleted the next time someone opens the link, or in a regular cleanup.',
				},
				{
					q: 'Do I need an account?',
					a: 'No, neither to send nor to open. Signing in with Google only adds a list of the secrets you sent.',
				},
			],
		},
		oss: {
			title: 'Open source, open about security',
			lead: 'The whole app, including the encryption, is on GitHub. If you find a weakness, write to us privately first.',
			source: 'Source code',
			policy: 'Security policy',
			report: 'Report a vulnerability',
		},
		final: {
			title: 'Something to send right now?',
			button: 'Create a secret link',
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
					'Encrypted Bundles: The secret content is stored as encrypted blobs that look like random characters even to our administrators. Dates and the one-time flag are stored next to it in plain text; a file name and type are encrypted with your passphrase. See the Privacy Policy for the full list.',
					'Encrypted channel: Data is transmitted over an encrypted connection to prevent interception.',
				],
			},
			controlledAccess: {
				title: '3. Controlled Access',
				description: 'You decide exactly how and when your information can be accessed.',
				details: [
					'One-time link: A one-time secret is deleted when the recipient clicks "Break the seal and open". Merely loading the link does not delete it.',
					'Expiration date: After this date the link stops working. An expired secret is deleted the next time someone opens its link.',
					'Personal Dashboard: Sign in with Google to track the status of your sent secrets — see which have been opened, which are still waiting, and when they expire.',
				],
			},
			localDecryption: {
				title: '4. Local Decryption',
				description: 'To read the secret or download the file, the recipient must have the link and the correct passphrase.',
				details: [
					'Recipient-Side: The decryption process happens entirely in the recipient browser.',
					'Deletion: A one-time secret is deleted when the recipient breaks the seal. A file of a one-time secret is deleted after its first download. An expired secret is deleted when someone opens its link, or during an admin cleanup.',
				],
			},
			codeTrust: {
				title: '5. Trusting the Code',
				description: 'The encryption runs in code that your browser downloads from this site.',
				details: [
					'Loaded on every visit: Your browser loads the encrypting and decrypting code from the site each time you open it, so you rely on the site serving the code it should.',
					'Open source: The code is public at github.com/myk-d/onevello, so anyone can read it and check how your secret is encrypted.',
					'The limit: From inside the browser you cannot verify that the code served to you is identical to the code in the repository.',
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
				title: '2. Stored Next to Your Secret',
				paragraph:
					'The encrypted text or file content is stored unreadable to us. Next to it, in plain text, we store:',
				items: [
					'The creation date and the expiration date.',
					'Whether the secret is one-time.',
					'For a file: only that one is attached. Its name and type are encrypted with your passphrase, and the file sits in cloud storage under a random name. Files attached before this change were stored with the name and type in plain text.',
					'A counter of failed attempts to open a regular (not one-time) secret.',
					'If you were signed in when creating it: your account ID and whether the secret has been opened.',
				],
			},
			{
				title: '3. Google Sign-In',
				paragraph:
					'If you choose to sign in with Google, we receive your Google account ID, display name, and profile picture from Google\'s authentication service. This information is used to associate your created secrets with your account so you can review them in your personal dashboard.',
			},
			{
				title: '4. Hosting and Logs',
				paragraph:
					'OneVello runs on Firebase infrastructure. Our hosting providers may process or log technical data, such as IP addresses, when they serve the site and handle requests. We cannot verify or control what they keep.',
			},
			{
				title: '5. Data Retention',
				paragraph: 'Encrypted secrets and file attachments are stored temporarily. They are deleted from our servers when:',
				items: [
					'A one-time secret: the recipient clicks "Break the seal and open".',
					'A file attached to a one-time secret: after its first download.',
					'An expired secret: the next time someone opens its link, or when an admin cleanup runs. It is not deleted at the exact moment it expires.',
				],
			},
			{
				title: '6. Cookies & Local Storage',
				paragraph:
					'We do not use tracking or advertising cookies. Local storage is used to save your theme preferences and, if you sign in with Google, to maintain your authentication session between visits.',
			},
			{
				title: '7. Contact Us',
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
		title: 'New secret',
		lead: 'The text and file are encrypted in this browser. You send the link and the passphrase separately.',
		show: 'Show',
		hide: 'Hide',
		generate: 'Generate',
		secretText: 'Secret text',
		secretTextPlaceholder: 'some secret text here',
		passphrase: 'Passphrase',
		passphrasePlaceholder: 'Enter passphrase',
		expirationDate: 'Expiration date',
		oneTimeAccess: 'Delete after the first opening',
		oneTimeHelp: 'Opening the link deletes the secret, even before it expires.',
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
		gate: {
			title: 'You were sent a secret',
			description: 'It is sealed. Nothing has been opened or deleted yet.',
			oneTime: 'One-time',
			expires: 'Expires {{date}}',
			warning: 'It can be opened once. Opening breaks the seal and deletes it from the server, so have somewhere ready to save it.',
			button: 'Break the seal and open',
			opening: 'Opening…',
			fileAttached: 'File attached',
			error: 'Could not break the seal. The secret is still sealed and intact. Check the connection and try again.',
		},
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
		title: 'Link ready',
		description: 'Copy the link and send it. The passphrase goes another way.',
		linkLabel: 'Secret link',
		toast: 'Link copied. Now send the passphrase another way.',
		reminderTitle: 'Send the passphrase separately.',
		reminder: 'It is not in the link. Use a different chat, a call or SMS.',
		chips: {
			oneTime: 'One-time',
			regular: 'Not one-time',
			expires: 'Expires {{date}}',
		},
		next: {
			title: 'What happens next',
			step1: 'Send the link',
			step1Desc: 'Any chat or email. The link alone opens nothing.',
			step2: 'Send the passphrase another way',
			step2Desc: 'A call, SMS or a different messenger. Never in the same message.',
			step3OneTime: 'The first opening breaks the seal',
			step3OneTimeDesc: 'The secret is deleted when the recipient clicks "Break the seal and open". If nobody opens it, the link stops working on {{date}}.',
			step3: 'The link works until it expires',
			step3Desc: 'It can be opened more than once. After {{date}} it stops working and is deleted the next time anyone opens it.',
		},
		tooltips: {
			copyToClipboard: 'Copy the secret link to your clipboard.',
			createAnother: 'Discard this link and create another secret.',
		},
	},
	secretGone: {
		gone: {
			title: 'The seal is broken',
			description:
				'This secret was already opened and deleted, or the link is wrong. If it was not you who opened it, tell the sender: someone else may have opened the link. Otherwise check the link against the one you were sent.',
		},
		expired: {
			title: 'This link has expired',
			description: 'The secret was not opened in time and is deleted. Ask the sender for a new link.',
		},
		locked: {
			title: 'Too many attempts',
			description:
				'After 5 wrong passphrases the secret was deleted. Ask the sender to create a new one and send the passphrase again.',
		},
		error: {
			title: 'Couldn’t load the secret',
			description: 'Check your connection and try again. Nothing was opened or deleted.',
		},
		retry: 'Try again',
		createOwn: 'Create your own secret',
		home: 'Home',
	},
	toasts: {
		failedToCreate: 'Failed to create secret. Please try again.',
		fileUploadFailed: 'Failed to upload file. Please try again.',
		passphraseCopied: 'Passphrase copied.',
		incorrectPassphrase: 'Wrong passphrase. Try again.',
	},
	support: {
		label: 'Support',
		title: 'Need help?',
		description: 'Write to us by email:',
		note: 'Describe the problem in detail for a faster answer. Never send a secret or a passphrase.',
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
		hasAttachment: 'Has attachment',
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
		hasAttachment: 'Has attachment',
		col: {
			id: 'ID',
			idHint: 'The secret’s document ID in the database.',
			file: 'File',
			fileHint: 'Whether the secret has an attached file. Its name is encrypted, so it is not shown.',
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
