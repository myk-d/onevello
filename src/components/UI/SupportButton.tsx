import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export const SupportButton = () => {
	const [isOpen, setIsOpen] = useState(false);
	const popoverRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="fixed bottom-15 right-6 z-[100] flex flex-col items-end gap-4" ref={popoverRef}>
			{/* Popover Window */}
			{isOpen && (
				<div
					className={cn(
						'w-72 p-6 rounded-2xl border border-brand bg-page-bg shadow-2xl transition-all',
						'animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300',
					)}
				>
					<h3 className="text-lg font-black text-page-text uppercase mb-3 tracking-tighter">Need Help?</h3>
					<p className="text-sm text-page-text/80 leading-relaxed mb-4">
						We are currently setting up our automated support system. Please contact us directly via email:
					</p>
					<a
						href="mailto:support@myslennya.com"
						className="block p-3 bg-brand-bg rounded-xl border border-brand/10 text-brand font-bold text-center hover:scale-[1.02] transition-transform"
					>
						support@myslennya.com
					</a>
					<p className="text-[10px] text-page-text/50 italic mt-4">* Please describe your issue in detail for a faster response.</p>
				</div>
			)}

			{/* Floating Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={cn(
					'w-14 h-14 rounded-full bg-brand text-page-bg shadow-xl flex items-center justify-center transition-all',
					'hover:scale-110 active:scale-95 cursor-pointer border-none outline-none',
					isOpen && 'rotate-90',
				)}
			>
				{isOpen ? (
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
						<path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				) : (
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
						<path
							d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</button>
		</div>
	);
};
