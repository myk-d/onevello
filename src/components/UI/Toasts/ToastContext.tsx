import React, { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';
import { __setToastRef } from '../../../helpers/services/ToastService';
import { Toast, ToastType } from '../../../helpers/types/toast';
import { ToastContainer } from './ToastContainer';

interface ToastContextData {
	addToast: (message: string, type: ToastType) => void;
	removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((message: string, type: ToastType) => {
		const id = Math.random().toString(36).substring(2, 9);
		setToasts((prev) => [...prev, { id, message, type }]);
	}, []);

	useLayoutEffect(() => {
		__setToastRef(addToast);
	}, [addToast]);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<ToastContainer toasts={toasts} position="top-right" timeout={2000} />
		</ToastContext.Provider>
	);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);
