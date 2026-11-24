import React from 'react';
import { cn } from '../../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: 'md' | 'lg';
	/** Full width. */
	block?: boolean;
	/** Shows a spinner, sets aria-busy and blocks clicks. */
	isLoading?: boolean;
}

/** Brand button (`ov-btn`). Native <button>, 44px minimum touch target. */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'primary', size = 'md', block, isLoading, className, children, disabled, type = 'button', ...rest }, ref) => (
		<button
			ref={ref}
			type={type}
			disabled={disabled || isLoading}
			aria-busy={isLoading || undefined}
			className={cn('ov-btn', `ov-btn--${variant}`, size === 'lg' && 'ov-btn--lg', block && 'ov-btn--block', className)}
			{...rest}
		>
			{isLoading && <span className="ov-spinner" aria-hidden="true" />}
			{children}
		</button>
	),
);
Button.displayName = 'Button';
