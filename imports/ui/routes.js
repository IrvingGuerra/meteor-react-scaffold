import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import Dashboard from './views/Dashboard/Dashboard';
import Generator from './views/Generator/Generator';
import UserManager from './views/UserManager/UserManager';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: DashboardIcon,
		component: Dashboard,
		layout: '/admin'
	},
	{
		path: '/generator',
		name: 'Generador',
		icon: Person,
		component: Generator,
		layout: '/admin'
	},
	{
		path: '/user.manager',
		name: 'User Manager',
		icon: Person,
		component: UserManager,
		layout: '/admin'
	}
];

export default dashboardRoutes;
