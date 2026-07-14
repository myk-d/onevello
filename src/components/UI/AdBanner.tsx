import { useTranslation } from 'react-i18next';
import { BannerLocale, BannerType } from '../../models/Banner/banner';
import { cn } from '../../utils/cn';

interface AdBannerProps {
	banner: BannerType;
	className?: string;
}

const AdBanner = ({ banner, className }: AdBannerProps) => {
	const { i18n, t } = useTranslation();

	console.log(banner);

	const locale: BannerLocale = i18n.language.startsWith('uk') ? 'uk' : 'en';

	return (
		<a
			href={banner.link}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				'group flex flex-col items-center justify-center text-center gap-4 rounded-2xl border p-5 overflow-hidden relative bg-cover bg-left transition-transform hover:scale-[1.01]',
				className,
			)}
			style={{ backgroundImage: `url(${banner.imageUrl[locale]})` }}
		>
			<div className="relative flex flex-col items-center gap-4 bg-page-bg/90 backdrop-blur-sm rounded-xl px-4 py-5 transition-colors duration-300">
				<p className="text-page-text font-bold text-lg leading-snug">{banner.text[locale]}</p>

				<span className="px-4 py-2 rounded-xl bg-brand text-white text-sm font-bold uppercase tracking-wider group-hover:opacity-90 transition-opacity">
					{t('banner.cta', { appName: banner.appName })}
				</span>
			</div>
		</a>
	);
};

export default AdBanner;
