import React, { useSyncExternalStore } from 'react';
import { Icon } from './Icon';
import { getToasts, subscribe } from './toastStore';

/** Polite live region that renders the active toasts (`ov-toast`). Mount once near the root. */
export const ToastRegion: React.FC = () => {
	const list = useSyncExternalStore(subscribe, getToasts, getToasts);
	return (
		<div className="ov-toasts" role="status" aria-live="polite">
			{list.map((i) => (
				<div key={i.id} className="ov-toast" data-kind={i.kind}>
					<Icon name={i.kind === 'success' ? 'check' : 'alert'} size={16} />
					<span>{i.message}</span>
				</div>
			))}
		</div>
	);
};
