import { Button } from 'perkslab-ui';
import { useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { isSecretWasCreatedOnDeviceStorageKey } from '../constants/constants';
import { UrlConfig } from '../constants/UrlConfig';

const Home = () => {
	const navigate = useNavigate();

	const HandleNavigateToSecret = useCallback(() => {
		navigate(UrlConfig.secret);
	}, [navigate]);

	useEffect(() => {
		if (localStorage.getItem(isSecretWasCreatedOnDeviceStorageKey) === 'true') {
			HandleNavigateToSecret();
		}
	}, [HandleNavigateToSecret]);

	const features = [
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

	return (
		<div className="flex flex-col gap-24 py-12">
			{/* Hero Section */}
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 min-h-[60dvh]">
				<h1 className="text-5xl md:text-7xl font-black text-page-text uppercase tracking-tighter leading-none">
					Share <span className="text-brand italic">once.</span>
					<br />
					Trust <span className="text-brand italic">always.</span>
				</h1>

				<p className="text-xl md:text-2xl max-w-3xl text-page-text/80 font-medium">
					Keep your sensitive information out of chats, emails, and logs —
					<span className="text-brand font-bold"> securely and effortlessly.</span>
				</p>

				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<Button type="button" onClick={HandleNavigateToSecret} variant="default" size="lg" className="gap-3 group">
						Create Secret
						<svg
							className="w-5 h-5 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							strokeWidth="2.5"
						>
							<path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</Button>

					<Link to={UrlConfig.about}>
						<Button variant="outline" size="lg">
							How it works
						</Button>
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className="max-w-7xl mx-auto w-full px-7">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature, idx) => (
						<div
							key={idx}
							className="p-8 rounded-3xl border border-brand/10 bg-brand-bg/20 flex flex-col items-center text-center transition-all hover:border-brand/30"
						>
							<div className="text-brand mb-5 p-3 bg-brand/10 rounded-2xl">{feature.icon}</div>
							<h3 className="text-xl font-bold text-page-text mb-3 uppercase tracking-tight">{feature.title}</h3>
							<p className="text-page-text/60 text-sm leading-relaxed">{feature.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* Trust Section */}
			<section className="bg-brand text-page-bg py-20 px-7">
				<div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
					<h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Your data is none of our business.</h2>
					<p className="text-lg opacity-80 max-w-2xl font-medium">
						OneVello uses industry-standard AES-GCM encryption. We provide the tools, but you hold the keys. Everything is decrypted
						locally on your device.
					</p>
					<Link to={UrlConfig.about}>
						<span className="text-sm font-bold uppercase tracking-widest underline underline-offset-8 hover:opacity-70 transition-opacity">
							Read the technical details
						</span>
					</Link>
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="max-w-7xl mx-auto w-full px-7 text-center mb-12">
				<div className="border-2 border-dashed border-brand/20 rounded-[40px] py-16 px-6">
					<h2 className="text-3xl font-black text-page-text mb-6 uppercase">Ready to send a secure link?</h2>
					<Button onClick={HandleNavigateToSecret} variant="default" size="lg" className="px-12">
						Get Started Now
					</Button>
				</div>
			</section>
		</div>
	);
};

export default Home;
