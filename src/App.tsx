import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from './components/Layouts/MainLayout';
import { UrlConfig } from './constants/UrlConfig';

const Home = lazy(() => import('./Pages/Home'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./Pages/TermsOfUse'));
const HowItWorks = lazy(() => import('./Pages/HowItWorks'));
const Secret = lazy(() => import('./Pages/Secret'));
const SecretID = lazy(() => import('./Pages/SecretID'));

function App() {
	return (
		<Routes>
			<Route path={UrlConfig.home} element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path={UrlConfig.about} element={<HowItWorks />} />
				<Route path={UrlConfig.secret} element={<Secret />} />
				<Route path={UrlConfig.secretID} element={<SecretID />} />
				<Route path={UrlConfig.privacyPolicy} element={<PrivacyPolicy />} />
				<Route path={UrlConfig.termsOfUse} element={<TermsOfUse />} />
			</Route>

			<Route path="*" element={<Home />} />
		</Routes>
	);
}

export default App;
