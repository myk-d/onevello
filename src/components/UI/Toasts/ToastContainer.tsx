import { Toast, ToastPosition } from '../../../helpers/types/toast';
import { cn } from '../../../utils/cn';
import { useToast } from './ToastContext';
import { ToastItem } from './ToastItem';

interface ContainerProps {
	toasts: Toast[];
	position: ToastPosition;
	timeout: number;
}

const positionClasses: Record<ToastPosition, string> = {
	'top-right': 'top-5 right-5',
	'top-left': 'top-5 left-5',
	'bottom-right': 'bottom-5 right-5',
	'bottom-left': 'bottom-5 left-5',
};

export const ToastContainer: React.FC<ContainerProps> = ({ toasts, position, timeout }) => {
	const { removeToast } = useToast();

	return (
		<div className={cn('fixed z-[9999] flex flex-col gap-3', positionClasses[position])}>
			{toasts.map((toast) => (
				<ToastItem key={toast.id} toast={toast} onClose={removeToast} timeout={timeout} />
			))}
		</div>
	);
};
