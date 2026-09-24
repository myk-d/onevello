import dayjs from 'dayjs';
import { Button, ToastService } from 'perkslab-ui';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { where } from 'firebase/firestore';
import { SecretIDLoader } from '../components/UI/SecretIDLoader';
import { dbMessages, deleteImageFromStorage } from '../config/firebase.config';
import { UrlConfig } from '../constants/UrlConfig';
import { useAuth } from '../context/useAuth';
import { MessageType } from '../models/Message/message';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';

const Admin = () => {
	const { user, loading, isAdmin } = useAuth();
	const { t } = useTranslation();

	const [messages, setMessages] = useState<MessageType[] | null>(null);
	const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
	const [deletingAll, setDeletingAll] = useState(false);

	const loadExpired = useCallback(async () => {
		setMessages(null);
		try {
			const docs = await dbMessages.query(where('expiration', '<', dayjs().toISOString()));
			setMessages(docs.sort((a, b) => dayjs(a.expiration).valueOf() - dayjs(b.expiration).valueOf()));
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
			ToastService.error(t('admin.toasts.loadFailed'));
			setMessages([]);
		}
	}, [t]);

	useEffect(() => {
		if (!isAdmin) return;
		loadExpired();
	}, [isAdmin, loadExpired]);

	const deleteMessage = async (message: MessageType) => {
		setDeletingIds((prev) => new Set(prev).add(message.id));
		try {
			await dbMessages.delete(message.id);
			if (message.fileUrl) await deleteImageFromStorage(message.fileUrl);
			setMessages((prev) => (prev ? prev.filter((m) => m.id !== message.id) : prev));
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
			ToastService.error(t('admin.toasts.deleteFailed'));
		} finally {
			setDeletingIds((prev) => {
				const next = new Set(prev);
				next.delete(message.id);
				return next;
			});
		}
	};

	const deleteAll = async () => {
		if (!messages || messages.length === 0) return;
		if (!window.confirm(t('admin.confirmDeleteAll', { count: messages.length }))) return;

		setDeletingAll(true);
		try {
			await Promise.all(
				messages.map(async (message) => {
					await dbMessages.delete(message.id);
					if (message.fileUrl) await deleteImageFromStorage(message.fileUrl);
				}),
			);
			setMessages([]);
			ToastService.success(t('admin.toasts.deleteAllSuccess'));
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
			ToastService.error(t('admin.toasts.deleteFailed'));
			loadExpired();
		} finally {
			setDeletingAll(false);
		}
	};

	if (loading) return <SecretIDLoader />;

	if (!user || !isAdmin) return <Navigate to={UrlConfig.home} replace />;

	return (
		<section className="m-auto max-w-7xl flex flex-col gap-6 mt-4 px-2">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="text-2xl font-bold">{t('admin.heading')}</h1>
				{messages !== null && messages.length > 0 && (
					<Button variant="danger" isLoading={deletingAll} disabled={deletingAll} onClick={deleteAll}>
						{t('admin.deleteAll')}
					</Button>
				)}
			</div>

			{messages === null ? (
				<SecretIDLoader />
			) : messages.length === 0 ? (
				<div className="border rounded-2xl py-12 flex flex-col items-center gap-3 text-gray-500">
					<p className="text-sm">{t('admin.empty')}</p>
				</div>
			) : (
				<div className="border rounded-2xl overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b text-left">
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('admin.col.id')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('admin.col.file')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('admin.col.expired')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs"></th>
							</tr>
						</thead>
						<tbody>
							{messages.map((msg) => {
								const isDeleting = deletingIds.has(msg.id);
								return (
									<tr key={msg.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
										<td className="py-3 px-4 text-xs text-gray-600 font-mono truncate max-w-[160px]">{msg.id}</td>
										<td className="py-3 px-4">
											{msg.fileName ? (
												<span className="truncate max-w-[140px] text-xs text-gray-600">{msg.fileName}</span>
											) : (
												<span className="text-xs text-gray-400">—</span>
											)}
										</td>
										<td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
											{dayjs(msg.expiration).format('MMM D, YYYY HH:mm')}
										</td>
										<td className="py-3 px-4">
											<button
												onClick={() => deleteMessage(msg)}
												disabled={isDeleting || deletingAll}
												className="text-xs cursor-pointer text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{isDeleting ? t('admin.deleting') : t('admin.delete')}
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
};

export default Admin;
