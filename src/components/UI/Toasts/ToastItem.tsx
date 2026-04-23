import React, { useEffect } from 'react';
import { Toast, ToastType } from '../../../helpers/types/toast';
import { cn } from '../../../utils/cn';

interface ToastItemProps {
	toast: Toast;
	onClose: (id: string) => void;
	timeout: number;
}

const styles: Record<ToastType, string> = {
	success: 'border-green-500 bg-green-50 text-green-800',
	error: 'border-red-500 bg-red-50 text-red-800',
	warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
	info: 'border-brand bg-brand-bg text-brand',
};

export const ToastItem: React.FC<ToastItemProps> = ({ toast, onClose, timeout }) => {
	useEffect(() => {
		const timer = setTimeout(() => onClose(toast.id), timeout);
		return () => clearTimeout(timer);
	}, [toast.id, onClose, timeout]);

	return (
		<div
			className={cn(
				'flex items-center justify-between min-w-[300px] p-4 border-2 rounded-xl shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-right-4',
				styles[toast.type],
			)}
		>
			<span className="font-medium">{toast.message}</span>
			<button onClick={() => onClose(toast.id)} className="ml-4 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none">
				<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
					<path d="M13.5 4.5l-9 9m0-9l9 9" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>
		</div>
	);
};
