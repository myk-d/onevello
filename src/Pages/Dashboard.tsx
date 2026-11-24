import dayjs from 'dayjs';
import { where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { SecretIDLoader } from '../components/UI/SecretIDLoader';
import { Button } from '../components/UI/kit';
import { dbMessages } from '../config/firebase.config';
import { UrlConfig } from '../constants/UrlConfig';
import { useAuth } from '../context/useAuth';
import { MessageType } from '../models/Message/message';

const getStatus = (message: MessageType): 'opened' | 'expired' | 'active' => {
	if (dayjs(message.expiration).isBefore(dayjs())) return 'expired';
	if (message.opened) return 'opened';
	return 'active';
};

const Dashboard = () => {
	const { user, loading, signIn } = useAuth();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [messages, setMessages] = useState<MessageType[] | null>(null);

	useEffect(() => {
		if (!user) return;

		dbMessages
			.query(where('userId', '==', user.uid))
			.then((docs) => {
				setMessages(docs.sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()));
			});
	}, [user]);

	const copyLink = (id: string) => {
		const url = `${window.location.origin}/secret/${id}`;
		navigator.clipboard.writeText(url);
	};

	if (loading) return <SecretIDLoader />;

	if (!user) {
		return (
			<section className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-4 px-4 py-12 text-center">
				<h1 className="font-heading text-2xl font-semibold leading-8">{t('dashboard.signInRequired')}</h1>
				<p className="text-sm text-muted">{t('dashboard.signInNote')}</p>
				<Button onClick={signIn}>{t('header.nav.signIn')}</Button>
			</section>
		);
	}

	return (
		<section className="mx-auto flex w-full max-w-[980px] flex-col gap-5 px-4 py-8 md:py-14">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="font-heading text-2xl font-semibold leading-8">{t('dashboard.heading')}</h1>
				<Button variant="secondary" onClick={() => navigate(UrlConfig.secret)}>
					{t('dashboard.createNew')}
				</Button>
			</div>

			{messages === null ? (
				<SecretIDLoader />
			) : messages.length === 0 ? (
				<div className="ov-card is-empty items-center py-12 text-center text-muted">
					<p className="text-sm">{t('dashboard.empty')}</p>
				</div>
			) : (
				<div className="overflow-x-auto rounded-card border border-border bg-surface-raised">
					<table className="w-full min-w-[680px] text-sm">
						<thead>
							<tr className="border-b text-left">
								<th className="py-3 px-4 font-semibold text-xs text-muted" title={t('dashboard.col.typeHint')}>
									{t('dashboard.col.type')}
								</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted">{t('dashboard.col.file')}</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted" title={t('dashboard.col.expiresHint')}>
									{t('dashboard.col.expires')}
								</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted" title={t('dashboard.col.statusHint')}>
									{t('dashboard.col.status')}
								</th>
								<th className="py-3 px-4 font-semibold text-xs text-muted"></th>
							</tr>
						</thead>
						<tbody>
							{messages.map((msg) => {
								const status = getStatus(msg);
								return (
									<tr key={msg.id} className="border-b last:border-0 hover:bg-surface-sunken transition-colors">
										<td className="py-3 px-4">
											{msg.oneTime ? (
												<span
													className="ov-chip ov-chip--info"
													title={t('dashboard.oneTimeHint')}
												>
													{t('dashboard.oneTime')}
												</span>
											) : (
												<span
													className="ov-chip"
													title={t('dashboard.regularHint')}
												>
													{t('dashboard.regular')}
												</span>
											)}
										</td>
										<td className="py-3 px-4">
											{msg.fileUrl ? (
												<span className="flex items-center gap-1.5 text-xs text-muted">
													<svg
														className="h-3.5 w-3.5 shrink-0"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
														<polyline points="14 2 14 8 20 8" />
													</svg>
													<span className="truncate max-w-[140px]">{t('dashboard.hasAttachment')}</span>
												</span>
											) : (
												<span className="text-xs text-muted">—</span>
											)}
										</td>
										<td className="py-3 px-4 text-xs text-muted whitespace-nowrap">
											{dayjs(msg.expiration).format('MMM D, YYYY HH:mm')}
										</td>
										<td className="py-3 px-4">
											{status === 'opened' && (
												<span
													className="ov-chip ov-chip--success"
													title={t('dashboard.status.openedHint')}
												>
													{t('dashboard.status.opened')}
												</span>
											)}
											{status === 'expired' && (
												<span
													className="ov-chip"
													title={t('dashboard.status.expiredHint')}
												>
													{t('dashboard.status.expired')}
												</span>
											)}
											{status === 'active' && (
												<span
													className="ov-chip ov-chip--warning"
													title={t('dashboard.status.activeHint')}
												>
													{t('dashboard.status.active')}
												</span>
											)}
										</td>
										<td className="py-3 px-4">
											<button
												onClick={() => copyLink(msg.id)}
												title={t('dashboard.copyLinkHint')}
												className="text-xs cursor-pointer min-h-11 text-primary hover:underline"
											>
												{t('dashboard.copyLink')}
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

export default Dashboard;
