import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';

import Dashboard from './views/Dashboard/Dashboard';
import CreateTemplate from './views/Templates/CreateTemplate';
import CreateUser from './views/UserManager/CreateUser';
import ListUsers from './views/UserManager/ListUsers';
import ListTemplates from './views/Templates/ListTemplates';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: DashboardIcon,
		component: Dashboard,
		layout: ['admin', 'client', 'specialist', 'labworker']
	},
	{
		path: '/templates',
		name: 'Plantillas',
		icon: DescriptionIcon,
		component: ListTemplates,
		layout: ['admin']
	},
	{
		path: '/templatesCreate',
		name: 'Crear plantilla',
		component: CreateTemplate,
		layout: ['admin']
	},
	{
		path: '/templatesEdit',
		name: 'Editar plantilla',
		component: CreateTemplate,
		layout: ['admin']
	},
	{
		path: '/users',
		name: 'Usuarios',
		icon: Person,
		component: ListUsers,
		layout: ['admin']
	},
	{
		path: '/usersCreate',
		name: 'Crear usuario',
		component: CreateUser,
		layout: ['admin']
	}
];

export default dashboardRoutes;
