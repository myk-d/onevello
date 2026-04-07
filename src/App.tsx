import { lazy } from 'react';
import { Route, Routes } from 'react-router';
import MainLayout from './components/Layouts/MainLayout';
import { UrlConfig } from './constants/UrlConfig';
import Secret from './Pages/Secret';
import SecretID from './Pages/SecretID';

const Home = lazy(() => import('./Pages/Home'));

function App() {
	return (
		<Routes>
			<Route path={UrlConfig.home} element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path={UrlConfig.secret} element={<Secret />} />
				<Route path={UrlConfig.secretID} element={<SecretID />} />
			</Route>

			<Route path="*" element={<Home />} />
		</Routes>
	);
}

export default App;
