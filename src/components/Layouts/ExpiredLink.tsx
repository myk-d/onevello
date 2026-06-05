import { Button } from 'perkslab-ui';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';

const ExpiredLink = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
			<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4">
				<h1 className="text-3xl mb-6">{t('expiredLink.message')}</h1>

				<div className="flex justify-between gap-6 flex-wrap">
					<Button type="button" variant="outline" size="full" onClick={() => navigate(UrlConfig.home)} className="flex-1 gap-2">
						{t('expiredLink.home')}
					</Button>

					<Button type="button" variant="default" size="full" onClick={() => navigate(UrlConfig.secret)} className="flex-1 gap-2">
						{t('expiredLink.createSecret')}
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ExpiredLink;
