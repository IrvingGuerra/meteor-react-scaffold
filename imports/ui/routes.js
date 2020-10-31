import DashboardIcon from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import DescriptionIcon from '@material-ui/icons/Description';


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
		icon: DescriptionIcon,
		component: ListReports,
		layout: ['admin']
	},
	{
		path: '/myOrderList',
		name: 'Mis ordenes',
		icon: DescriptionIcon,
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
		icon: DescriptionIcon,
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
	}
];

export default dashboardRoutes;
