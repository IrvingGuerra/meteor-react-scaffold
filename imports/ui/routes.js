import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';

import Dashboard from './views/Dashboard/Dashboard';
import Generator from './views/Generator/Generator';
import UserManager from './views/UserManager/UserManager';
import ListUsers from './views/UserManager/ListUsers';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: DashboardIcon,
		component: Dashboard,
		layout: ['admin', 'client', 'specialist', 'labworker']
	},
	{
		path: '/generator',
		name: 'Generador',
		icon: Person,
		component: Generator,
		layout: []
	},
	{
		path: '/users',
		name: 'User Manager',
		icon: Person,
		component: ListUsers,
		layout: ['admin']
	},
	{
		path: '/createUser',
		name: 'Crear usuario',
		icon: Person,
		component: UserManager,
		layout: ['admin']
	}
];

export default dashboardRoutes;
