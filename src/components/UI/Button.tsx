import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'danger' | 'link' | 'disabled' | 'success' | 'warning' | 'info';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'default', size = 'md', isLoading, children, ...props }, ref) => {
	const baseStyles =
		'cursor-pointer inline-flex items-center justify-center font-bold transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2';

	const variants: Record<ButtonVariant, string> = {
		default: 'bg-brand text-page-bg hover:bg-brand-hover shadow-sm rounded-xl',
		outline: 'bg-transparent border border-brand text-brand hover:bg-brand-bg rounded-xl',
		ghost: 'bg-transparent text-brand hover:bg-brand-bg rounded-xl',
		link: 'bg-transparent text-brand underline-offset-4 hover:underline p-0',

		danger: 'bg-red-600 text-white hover:bg-red-700 rounded-xl',
		success: 'bg-green-600 text-white hover:bg-green-700 rounded-xl',
		warning: 'bg-yellow-600 text-white hover:bg-yellow-700 rounded-xl',

		info: 'bg-brand text-page-bg hover:opacity-90 rounded-xl',
		disabled: 'bg-gray-400 text-white cursor-not-allowed',
	};

	const sizes: Record<ButtonSize, string> = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg',
		full: 'w-full py-3.5 text-base',
	};

	return (
		<button ref={ref} className={cn(baseStyles, variants[variant], sizes[size], className)} disabled={isLoading} {...props}>
			{isLoading ? (
				<span className="flex items-center gap-2">
					<svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					...
				</span>
			) : (
				children
			)}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
