import React, { useSyncExternalStore } from 'react';
import { getToasts, subscribe } from './toastStore';

/** Polite live region that renders the active toasts (`ov-toast`). Mount once near the root. */
export const ToastRegion: React.FC = () => {
	const list = useSyncExternalStore(subscribe, getToasts, getToasts);
	return (
		<div className="ov-toasts" role="status" aria-live="polite">
			{list.map((i) => (
				<div key={i.id} className="ov-toast" data-kind={i.kind}>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
						{i.kind === 'success' ? <path d="M5 13l4 4L19 7" /> : <path d="M12 8v5m0 3.5v.01M12 3l10 18H2z" />}
					</svg>
					<span>{i.message}</span>
				</div>
			))}
		</div>
	);
};
