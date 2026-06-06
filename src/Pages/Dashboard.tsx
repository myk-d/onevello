import dayjs from 'dayjs';
import { where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { SecretIDLoader } from '../components/UI/SecretIDLoader';
import { dbMessages } from '../config/firebase.config';
import { UrlConfig } from '../constants/UrlConfig';
import { useAuth } from '../context/AuthContext';
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
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-6 mt-12">
				<h1 className="text-2xl font-bold">{t('dashboard.signInRequired')}</h1>
				<p className="text-sm text-gray-500">{t('dashboard.signInNote')}</p>
				<button
					onClick={signIn}
					className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand text-brand font-medium hover:bg-brand hover:text-white transition-colors duration-200"
				>
					{t('header.nav.signIn')}
				</button>
			</section>
		);
	}

	return (
		<section className="m-auto max-w-7xl flex flex-col gap-6 mt-4 px-2">
			<div className="flex items-center justify-between flex-wrap gap-3">
				<h1 className="text-2xl font-bold">{t('dashboard.heading')}</h1>
				<button
					onClick={() => navigate(UrlConfig.secret)}
					className="text-sm font-medium px-4 py-2 rounded-xl border border-brand text-brand hover:bg-brand hover:text-white transition-colors duration-200"
				>
					{t('dashboard.createNew')}
				</button>
			</div>

			{messages === null ? (
				<SecretIDLoader />
			) : messages.length === 0 ? (
				<div className="border rounded-2xl py-12 flex flex-col items-center gap-3 text-gray-500">
					<p className="text-sm">{t('dashboard.empty')}</p>
				</div>
			) : (
				<div className="border rounded-2xl overflow-hidden">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b text-left">
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('dashboard.col.type')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('dashboard.col.file')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('dashboard.col.expires')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">{t('dashboard.col.status')}</th>
								<th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs"></th>
							</tr>
						</thead>
						<tbody>
							{messages.map((msg) => {
								const status = getStatus(msg);
								return (
									<tr key={msg.id} className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
										<td className="py-3 px-4">
											{msg.oneTime ? (
												<span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
													{t('dashboard.oneTime')}
												</span>
											) : (
												<span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
													{t('dashboard.regular')}
												</span>
											)}
										</td>
										<td className="py-3 px-4">
											{msg.fileName ? (
												<span className="flex items-center gap-1.5 text-xs text-gray-600">
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
													<span className="truncate max-w-[140px]">{msg.fileName}</span>
												</span>
											) : (
												<span className="text-xs text-gray-400">—</span>
											)}
										</td>
										<td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
											{dayjs(msg.expiration).format('MMM D, YYYY HH:mm')}
										</td>
										<td className="py-3 px-4">
											{status === 'opened' && (
												<span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
													{t('dashboard.status.opened')}
												</span>
											)}
											{status === 'expired' && (
												<span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 font-medium">
													{t('dashboard.status.expired')}
												</span>
											)}
											{status === 'active' && (
												<span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
													{t('dashboard.status.active')}
												</span>
											)}
										</td>
										<td className="py-3 px-4">
											<button onClick={() => copyLink(msg.id)} className="text-xs cursor-pointer text-brand hover:underline">
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
