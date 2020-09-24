import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import routes from '../routes.js';
import { useSelector } from 'react-redux';
import AdminNavbar from '../components/Navbars/AdminNavbar';
import Sidebar, { drawerWidth } from '../components/Sidebar/Sidebar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Copyright } from '../views/Auth/login';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		})
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: drawerWidth,
	},
	main: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
	},
}));

const switchRoutes = (
	<Switch>
		{ routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return (
					<Route
						path={ prop.layout + prop.path }
						component={ prop.component }
						key={ key }
					/>
				);
			}
			return null;
		}) }
		<Redirect from="/admin" to="/admin/dashboard"/>
	</Switch>
);

export default function Admin(props) {
	const classes = useStyles();

	const user = useSelector(state => state.user);

	useEffect(() => {
		if (!user.profile) {
			props.history.push('/');
		}
	}, []);

	const getRoute = () => {
		return window.location.pathname !== '/admin/maps';
	};

	const [open, setOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	return (
		<div className={classes.root}>
			<Sidebar
				routes={routes}
				open={open}
				handleDrawerToggle={handleDrawerToggle}
			/>
			{ getRoute() ? (
				<main
					className={open ? classes.contentShift : classes.content}
				>
					<AdminNavbar
						routes={routes}
						history={ props.history }
						handleDrawerToggle={handleDrawerToggle}
						open={open}
					/>
					<CssBaseline />
					<Container component="main" className={classes.main} maxWidth="sm">{ switchRoutes }</Container>
					<footer className={classes.footer}>
						<Container maxWidth="sm">
							<Typography variant="body1">My sticky footer can be found here.</Typography>
							<Copyright />
						</Container>
					</footer>
				</main>
			) : (
				<div></div>
			) }
		</div>
	);
}
