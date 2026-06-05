import { ReactNode } from 'react';

interface PolicyLayoutProps {
	title: string;
	children: ReactNode;
}

const PolicyLayout = ({ title, children }: PolicyLayoutProps) => {
	return (
		<section className="max-w-4xl mx-auto py-12 px-6 text-page-text transition-colors duration-300">
			<h1 className="text-4xl font-black uppercase tracking-tighter mb-8">{title}</h1>
			<div className="space-y-8 text-page-text/80 leading-relaxed">{children}</div>
		</section>
	);
};

export default PolicyLayout;
