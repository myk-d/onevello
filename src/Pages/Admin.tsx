import { FirebaseError } from 'firebase/app';
import { where } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router';
import { Alert, Button, toast } from '../components/UI/kit';
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
	const [permissionDenied, setPermissionDenied] = useState(false);
	const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
	const [deletingAll, setDeletingAll] = useState(false);

	const loadExpired = useCallback(async () => {
		setMessages(null);
		setPermissionDenied(false);
		try {
			const docs = await dbMessages.query(where('expiration', '<', dayjs().toISOString()));
			setMessages(docs.sort((a, b) => dayjs(a.expiration).valueOf() - dayjs(b.expiration).valueOf()));
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
			if (error instanceof FirebaseError && error.code === 'permission-denied') {
				setPermissionDenied(true);
			} else {
				toast.error(t('admin.toasts.loadFailed'));
			}
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
			toast.error(t('admin.toasts.deleteFailed'));
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
			toast.success(t('admin.toasts.deleteAllSuccess'));
		} catch (error) {
			if (NODE_ENV_DEV) console.error(error);
			toast.error(t('admin.toasts.deleteFailed'));
			loadExpired();
		} finally {
			setDeletingAll(false);
		}
	};

	if (loading) return <SecretIDLoader />;

	if (!user || !isAdmin) return <Navigate to={UrlConfig.home} replace />;

	return (
		<section className="mx-auto flex w-full max-w-[980px] flex-col gap-5 px-4 py-8 md:py-14">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<div>
					<h1 className="font-heading text-2xl font-semibold leading-8">{t('admin.heading')}</h1>
					<p className="mt-1 max-w-2xl text-sm text-muted">{t('admin.description')}</p>
				</div>
				{messages !== null && messages.length > 0 && (
					<Button
						variant="danger"
						isLoading={deletingAll}
						disabled={deletingAll}
						onClick={deleteAll}
						title={t('admin.deleteAllHint')}
					>
						{t('admin.deleteAll')}
					</Button>
				)}
			</div>

			{permissionDenied ? (
				<Alert variant="warning" role="alert" title={t('admin.permissionDenied.title')}>
					{t('admin.permissionDenied.hint')}
				</Alert>
			) : messages === null ? (
				<SecretIDLoader />
			) : messages.length === 0 ? (
				<div className="ov-card is-empty items-center py-12 text-center text-muted">
					<p className="text-sm">{t('admin.empty')}</p>
				</div>
			) : (
				<div className="overflow-x-auto rounded-card border border-border bg-surface-raised">
					<table className="w-full min-w-[680px] text-sm">
						<thead>
							<tr className="border-b text-left">
								<th className="py-3 px-4 font-semibold text-xs text-muted" title={t('admin.col.idHint')}>
									{t('admin.col.id')}
								</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted" title={t('admin.col.fileHint')}>
									{t('admin.col.file')}
								</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted" title={t('admin.col.expiredHint')}>
									{t('admin.col.expired')}
								</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted"></th>
							</tr>
						</thead>
						<tbody>
							{messages.map((msg) => {
								const isDeleting = deletingIds.has(msg.id);
								return (
									<tr key={msg.id} className="border-b last:border-0 hover:bg-surface-sunken transition-colors">
										<td className="py-3 px-4 text-xs text-muted font-mono truncate max-w-[160px]" title={msg.id}>
											{msg.id}
										</td>
										<td className="py-3 px-4">
											{msg.fileUrl ? (
												<span className="truncate max-w-[140px] text-xs text-muted">
													{t('admin.hasAttachment')}
												</span>
											) : (
												<span className="text-xs text-muted" title={t('admin.col.noFileHint')}>
													—
												</span>
											)}
										</td>
										<td
											className="py-3 px-4 text-xs text-muted whitespace-nowrap"
											title={t('admin.col.expiredDaysAgo', { count: Math.max(0, dayjs().diff(dayjs(msg.expiration), 'day')) })}
										>
											{dayjs(msg.expiration).format('MMM D, YYYY HH:mm')}
										</td>
										<td className="py-3 px-4">
											<button
												onClick={() => deleteMessage(msg)}
												disabled={isDeleting || deletingAll}
												title={t('admin.deleteHint')}
												className="text-xs cursor-pointer text-danger hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
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
