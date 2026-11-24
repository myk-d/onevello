import React from 'react';
import { cn } from '../../../utils/cn';
import { Icon, IconName } from './Icon';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

const ICONS: Record<AlertVariant, IconName> = { info: 'info', success: 'check', warning: 'alert', danger: 'x' };

interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
	variant?: AlertVariant;
	/** Bold lead-in, followed by the body. */
	title?: React.ReactNode;
}

/** Brand alert (`ov-alert`): icon, optional bold title, body. Danger defaults to role=alert, others to status. */
export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, className, children, role, ...rest }) => (
	<div className={cn('ov-alert', `ov-alert--${variant}`, className)} role={role ?? (variant === 'danger' ? 'alert' : 'status')} {...rest}>
		<Icon name={ICONS[variant]} />
		<span>
			{title && <b>{title}</b>} {children}
		</span>
	</div>
);
