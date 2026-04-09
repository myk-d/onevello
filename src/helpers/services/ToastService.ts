import { ToastType } from '../types/toast';

type AddToastFn = (message: string, type: ToastType) => void;

let addToastReference: AddToastFn = () => {
	console.warn('ToastService: Провайдер ще не ініціалізовано!');
};

export const __setToastRef = (fn: AddToastFn) => {
	addToastReference = fn;
};

export const ToastService = {
	success: (msg: string) => addToastReference(msg, 'success'),
	error: (msg: string) => addToastReference(msg, 'error'),
	info: (msg: string) => addToastReference(msg, 'info'),
	warning: (msg: string) => addToastReference(msg, 'warning'),
};
