import { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface FeatureItem {
	title: string;
	description: string;
	icon: ReactNode;
	details?: string[];
}

interface FeatureCardProps extends FeatureItem {
	className?: string;
	iconClassName?: string;
}

const FeatureCard = ({ title, description, icon, details, className, iconClassName }: FeatureCardProps) => {
	return (
		<div
			className={cn(
				'p-8 rounded-3xl border border-brand/10 bg-brand-bg/20 flex flex-col transition-all hover:border-brand/30',
				className,
			)}
		>
			<div className={cn('text-brand mb-5 p-3 bg-brand/10 rounded-2xl self-start', iconClassName)}>{icon}</div>
			<h3 className="text-xl font-bold text-page-text mb-3 uppercase tracking-tight">{title}</h3>
			<p className="text-page-text/60 text-sm leading-relaxed">{description}</p>

			{details && (
				<ul className="mt-4 space-y-2">
					{details.map((detail) => (
						<li key={detail} className="flex items-start gap-2 text-xs text-page-text/60 italic">
							<span className="text-brand font-bold">•</span>
							{detail}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FeatureCard;
