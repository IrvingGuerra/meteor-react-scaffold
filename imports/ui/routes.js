import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DescriptionIcon from '@material-ui/icons/Description';
import Person from '@material-ui/icons/Person';
import PetsIcon from '@material-ui/icons/Pets';

import Dashboard from './views/Dashboard/Dashboard';
import CreateTemplate from './views/Templates/CreateTemplate';
import CreateUser from './views/UserManager/CreateUser';
import ListUsers from './views/UserManager/ListUsers';
import ListTemplates from './views/Templates/ListTemplates';
import MyOrders from './views/MyOrders/MyOrders';
import RequestOrder from './views/MyOrders/RequestOrder';
import ListOrders from './views/Orders/ListOrders';
import OrderDetails from './views/Orders/OrderDetails';
import ListReports from './views/Reports/ListReports';
import Pets from './views/Pets/Pets';
import CreateSpecie from './views/Pets/Create/CreateSpecie';
import CreateBreed from './views/Pets/Create/CreateBreed';
import CreateGender from './views/Pets/Create/CreateGender';

const dashboardRoutes = [
	{
		path: '/dashboard',
		name: 'Dashboard',
		icon: DashboardIcon,
		component: Dashboard,
		layout: ['admin', 'client', 'specialist', 'labworker']
	},
	{
		path: '/reports',
		name: 'Reportes',
		icon: AssessmentIcon,
		component: ListReports,
		layout: ['admin']
	},
	{
		path: '/myOrderList',
		name: 'Mis ordenes',
		icon: AssignmentIcon,
		component: MyOrders,
		layout: ['admin']
	},
	{
		path: '/requestOrder',
		name: 'Solicitar orden',
		component: RequestOrder,
		layout: ['admin']
	},
	{
		path: '/orderList',
		name: 'Ordenes',
		icon: FindInPageIcon,
		component: ListOrders,
		layout: ['admin']
	},
	{
		path: '/orderDetails',
		name: 'Detalles de la orden',
		component: OrderDetails,
		layout: ['admin']
	},
	{
		path: '/templateList',
		name: 'Plantillas',
		icon: DescriptionIcon,
		component: ListTemplates,
		layout: ['admin']
	},
	{
		path: '/createTemplate',
		name: 'Crear plantilla',
		component: CreateTemplate,
		layout: ['admin']
	},
	{
		path: '/editTemplate',
		name: 'Editar plantilla',
		component: CreateTemplate,
		layout: ['admin']
	},
	{
		path: '/userList',
		name: 'Usuarios',
		icon: Person,
		component: ListUsers,
		layout: ['admin']
	},
	{
		path: '/createUser',
		name: 'Crear usuario',
		component: CreateUser,
		layout: ['admin']
	},
	{
		path: '/editUser',
		name: 'Editar usuario',
		component: CreateUser,
		layout: ['admin']
	},
	{
		path: '/pets',
		name: 'Mascotas',
		icon: PetsIcon,
		component: Pets,
		layout: ['admin']
	},
	{
		path: '/createSpecie',
		name: 'Crear especie',
		component: CreateSpecie,
		layout: ['admin']
	},
	{
		path: '/editSpecie',
		name: 'Editar especie',
		component: CreateSpecie,
		layout: ['admin']
	},
	{
		path: '/createBreed',
		name: 'Crear raza',
		component: CreateBreed,
		layout: ['admin']
	},
	{
		path: '/editBreed',
		name: 'Editar raza',
		component: CreateBreed,
		layout: ['admin']
	},
	{
		path: '/createGender',
		name: 'Crear genero',
		component: CreateGender,
		layout: ['admin']
	},
	{
		path: '/editGender',
		name: 'Editar genero',
		component: CreateGender,
		layout: ['admin']
	},
];

export default dashboardRoutes;
