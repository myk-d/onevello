import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, ...props }, ref) => {
	return (
		<label className="flex items-center gap-3 cursor-pointer group">
			<div className="relative flex items-center justify-center">
				<input
					type="checkbox"
					ref={ref}
					className={cn(
						'peer appearance-none',
						'w-5 h-5 border border-black rounded-lg bg-white',
						'checked:bg-black transition-all duration-200',
						'group-hover:bg-gray-50 peer-checked:group-hover:bg-black',
						className,
					)}
					{...props}
				/>
				<svg
					className="absolute w-4 h-4 text-white uppercase pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					strokeWidth="3.5"
				>
					<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			{label && <span className="text-sm font-bold uppercase tracking-wider text-gray-800">{label}</span>}
		</label>
	);
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
