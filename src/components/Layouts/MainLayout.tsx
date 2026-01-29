import { Outlet } from 'react-router';
import Header from '../Shared/Header';

const MainLayout = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default MainLayout;
