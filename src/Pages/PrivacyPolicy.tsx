const PrivacyPolicy = () => {
	return (
		<section className="max-w-4xl mx-auto py-12 px-6 text-page-text transition-colors duration-300">
			<h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Privacy Policy</h1>

			<div className="space-y-8 text-page-text/80 leading-relaxed">
				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">1. Zero-Knowledge Commitment</h2>
					<p>
						Our core philosophy is that we shouldn't know anything about your secrets. All encryption and decryption happen locally in
						your browser.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">2. Information We Collect</h2>
					<p>
						We do not collect personal information such as names, emails, or IP addresses. We only store encrypted "blobs" of data
						provided by you, which are unreadable to us.
					</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">3. Data Retention</h2>
					<p>Encrypted messages are stored temporarily. They are permanently deleted from our servers when:</p>
					<ul className="list-disc pl-5 mt-2 space-y-1">
						<li>The recipient views the message (if "One-time view" is enabled).</li>
						<li>The expiration time set by the sender is reached.</li>
					</ul>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">4. Cookies</h2>
					<p>We do not use tracking or advertising cookies. Minimal local storage may be used to save your theme preferences.</p>
				</section>

				<section>
					<h2 className="text-xl font-bold text-brand uppercase mb-3">5. Contact Us</h2>
					<p>
						If you have questions about this policy, contact us at <span className="text-brand font-bold">support@myslennya.com</span>.
					</p>
				</section>
			</div>
		</section>
	);
};

export default PrivacyPolicy;
