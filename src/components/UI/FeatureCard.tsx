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
		<div className={cn('ov-card gap-3', className)}>
			<div className={cn('self-start rounded-control border border-border bg-surface-sunken p-2.5 text-primary', iconClassName)}>{icon}</div>
			<h3>{title}</h3>
			<p className="text-sm leading-6 text-muted">{description}</p>

			{details && (
				<ul className="mt-1 space-y-2">
					{details.map((detail) => (
						<li key={detail} className="flex items-start gap-2 text-sm text-muted">
							<span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-seal" />
							{detail}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FeatureCard;
