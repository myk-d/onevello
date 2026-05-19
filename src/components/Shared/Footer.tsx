import { Link } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';
import GitHubSVG from '../UI/SVG/GitHubSVG';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-brand py-8 px-7 transition-colors duration-300">
			<div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
				{/* Copyright Section */}
				<div className="text-page-text/60 text-sm font-medium">
					© {currentYear} All rights reserved to{' '}
					<a
						href="https://myslennya.com"
						target="_blank"
						rel="noopener noreferrer"
						className="text-brand font-bold hover:underline underline-offset-4"
					>
						myslennya.com
					</a>
				</div>

				{/* Navigation Links */}
				<nav className="flex items-center gap-8">
					<Link
						to={UrlConfig.about}
						className="text-sm font-bold uppercase tracking-widest text-page-text hover:text-brand transition-colors"
					>
						How it works
					</Link>
					<Link
						to={UrlConfig.home}
						className="text-sm font-bold uppercase tracking-widest text-page-text hover:text-brand transition-colors"
					>
						Home
					</Link>
					<Link
						to={UrlConfig.privacyPolicy}
						className="text-sm font-bold uppercase tracking-widest text-page-text hover:text-brand transition-colors"
					>
						Privacy Policy
					</Link>
					<Link
						to={UrlConfig.termsOfUse}
						className="text-sm font-bold uppercase tracking-widest text-page-text hover:text-brand transition-colors"
					>
						Terms of Use
					</Link>

					<Link to={UrlConfig.repoURL} target="_blank" title="GitHub Repository">
						<GitHubSVG className="h-8 w-8" />
					</Link>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
