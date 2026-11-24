export type ToastKind = 'success' | 'error';
export interface ToastItem {
	id: number;
	kind: ToastKind;
	message: string;
}

const TOAST_MS = 4000;
let items: ToastItem[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const push = (kind: ToastKind, message: string) => {
	const id = nextId++;
	items = [...items, { id, kind, message }];
	emit();
	setTimeout(() => {
		items = items.filter((i) => i.id !== id);
		emit();
	}, TOAST_MS);
};

/** Imperative toasts, same call shape as before: toast.success(msg) / toast.error(msg). Needs <ToastRegion /> mounted once. */
export const toast = {
	success: (message: string) => push('success', message),
	error: (message: string) => push('error', message),
};

/** Test helper. */
export const clearToasts = () => {
	items = [];
	emit();
};

export const subscribe = (l: () => void) => {
	listeners.add(l);
	return () => listeners.delete(l);
};

export const getToasts = () => items;
