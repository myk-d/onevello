import React, { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

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
				<Icon name={open ? 'close' : 'chat'} size={22} />
			</button>
		</div>
	);
};
