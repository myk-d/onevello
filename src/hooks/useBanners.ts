import { useEffect, useState } from 'react';
import { dbBanners } from '../config/firebase.config';
import { BannerType } from '../models/Banner/banner';
import { NODE_ENV_DEV } from '../utils/NODE_ENV';

export const useBanners = () => {
	const [banners, setBanners] = useState<BannerType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		let cancelled = false;

		dbBanners
			.getAll()
			.then((allBanners) => {
				if (cancelled) return;
				setBanners(allBanners.filter((banner) => banner.isActive));
			})
			.catch((error) => {
				if (NODE_ENV_DEV) console.error('Failed to fetch banners:', error);
				if (!cancelled) setBanners([]);
			})
			.finally(() => {
				if (!cancelled) setLoading(false);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return { banners, loading };
};
