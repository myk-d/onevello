import { useNavigate } from 'react-router';
import Button from '../components/UI/Button';
import { UrlConfig } from '../constants/UrlConfig';

const Home = () => {
	const navigate = useNavigate();

	const HandleNavigateToSecret = () => {
		navigate(UrlConfig.secret);
	};
	return (
		<>
			<section className="m-auto max-w-7xl text-center flex flex-col items-center justify-center gap-9 h-[70dvh]">
				<h1 className="text-6xl">
					Share{' '}
					<strong>
						<i>once.</i>
					</strong>{' '}
					Trust{' '}
					<strong>
						<i>always.</i>
					</strong>
				</h1>

				<p className="text-3xl max-w-6xl">
					Keep your sensitive information out of chats, emails, and logs - <strong>securely and effortlessly.</strong>
				</p>

				<Button type="button" onClick={HandleNavigateToSecret} variant="default" className="gap-2">
					Create Secret
					<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20.7071 8.07106C21.0976 7.68054 21.0976 7.04737 20.7071 6.65685L14.3431 0.292885C13.9526 -0.0976396 13.3195 -0.0976396 12.9289 0.292885C12.5384 0.683409 12.5384 1.31657 12.9289 1.7071L18.5858 7.36395L12.9289 13.0208C12.5384 13.4113 12.5384 14.0445 12.9289 14.435C13.3195 14.8255 13.9526 14.8255 14.3431 14.435L20.7071 8.07106ZM0 7.36395V8.36395H20V7.36395V6.36395H0V7.36395Z"
							fill="white"
						/>
					</svg>
				</Button>
			</section>
		</>
	);
};

export default Home;
