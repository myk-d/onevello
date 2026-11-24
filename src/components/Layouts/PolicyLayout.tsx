import { ReactNode } from 'react';

interface PolicyLayoutProps {
	title: string;
	children: ReactNode;
}

const PolicyLayout = ({ title, children }: PolicyLayoutProps) => {
	return (
		<section className="mx-auto w-full max-w-[680px] px-4 py-8 md:py-14">
			<h1 className="mb-8 font-heading text-3xl font-semibold leading-10 md:text-4xl">{title}</h1>
			<div className="space-y-8 leading-relaxed">{children}</div>
		</section>
	);
};

export default PolicyLayout;
