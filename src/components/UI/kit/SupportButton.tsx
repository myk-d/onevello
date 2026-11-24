import React, { useEffect, useRef, useState } from 'react';

interface SupportButtonProps {
	supportEmail: string;
	title: string;
	description: string;
	note?: string;
	label: string;
	/** Called when the email link is clicked (e.g. to copy the address). */
	onEmailClick?: () => void;
}

/** Floating support button with a small popover (`ov-support`). Closes on Escape and outside click. */
export const SupportButton: React.FC<SupportButtonProps> = ({ supportEmail, title, description, note, label, onEmailClick }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
		const onDown = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
		};
		document.addEventListener('keydown', onKey);
		document.addEventListener('mousedown', onDown);
		return () => {
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('mousedown', onDown);
		};
	}, [open]);

	return (
		<div className="ov-support" ref={ref}>
			{open && (
				<div className="pop" role="dialog" aria-label={title}>
					<h3>{title}</h3>
					<p>{description}</p>
					<a href={`mailto:${supportEmail}`} onClick={onEmailClick}>
						{supportEmail}
					</a>
					{note && <p className="ov-help">{note}</p>}
				</div>
			)}
			<button type="button" className="fab" aria-label={label} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
				<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
					{open ? (
						<path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
					) : (
						<path
							d="M21 12c0 4.4-4 8-9 8a9.9 9.9 0 0 1-4.3-.95L3 20l1.4-3.7C3.5 15 3 13.6 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					)}
				</svg>
			</button>
		</div>
	);
};
