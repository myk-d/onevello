import { Button } from 'perkslab-ui';
import { useNavigate } from 'react-router';
import { UrlConfig } from '../../constants/UrlConfig';

const ExpiredLink = () => {
	const navigate = useNavigate();

	const navigateToCreateSecret = () => {
		navigate(UrlConfig.secret);
	};

	const navigateToHome = () => {
		navigate(UrlConfig.home);
	};

	return (
		<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 mt-4">
			<div className="border w-full rounded-2xl py-5 px-7 flex flex-col gap-4">
				<h1 className="text-3xl mb-6">This secret has been viewed or expired.</h1>

				<div className="flex justify-between gap-6 flex-wrap">
					<Button type="button" variant="outline" size="full" onClick={navigateToHome} className="flex-1 gap-2">
						Home
					</Button>

					<Button type="button" variant="default" size="full" onClick={navigateToCreateSecret} className="flex-1 gap-2">
						Create Secret
					</Button>
				</div>
			</div>
		</section>
	);
};

export default ExpiredLink;
