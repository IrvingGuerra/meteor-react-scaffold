import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import routes from '../routes.js';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbars/Navbar';
import Sidebar, { drawerWidth } from '../components/Sidebar/Sidebar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { logout } from '../../redux/actions';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh'
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginLeft: drawerWidth
	},
	main: {
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	}
}));

const SwitchRoutes = ({ profile, props }) => {
	return (
		<Switch>
			{ routes.map((prop, key) => {
				if (prop.layout.includes(profile)) {
					return (
						<Route
							path={ '/' + profile + prop.path }
							render={ () => (<prop.component { ...props } />) }
							key={ key }
						/>
					);
				}
				return null;
			}) }
			<Redirect from={ '/' + profile } to={ '/' + profile + '/myOrderList' }/>
		</Switch>
	);
};
export default function System(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	function hasPermissions(profile) {
		return window.location.href.indexOf(profile) !== -1;
	}

	useEffect(() => {
		if (!user.profile) {
			props.history.push('/');
		}
		if(!Meteor.userId()){
			dispatch(logout());
			localStorage.removeItem('state');
			props.history.push('/');
		}
		if (!hasPermissions(user.profile.profile)) {
			props.history.push('/' + user.profile.profile);
		}
	}, []);

	const [open, setOpen] = React.useState(true);

	const handleDrawerToggle = () => {
		setOpen(!open);
	};

	return (
		<div className={ classes.root }>
			<Sidebar
				routes={ routes }
				open={ open }
				handleDrawerToggle={ handleDrawerToggle }
				profile={ user.profile.profile }
			/>
			<main
				className={ open ? classes.contentShift : classes.content }
			>
				<Navbar
					routes={ routes }
					history={ props.history }
					handleDrawerToggle={ handleDrawerToggle }
					open={ open }
					profile={ user.profile.profile }
				/>
				<CssBaseline/>
				<Container component="main" className={ classes.main }>
					<SwitchRoutes profile={ user.profile.profile } props={ props }/>
				</Container>
			</main>
		</div>
	);
}
