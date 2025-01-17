import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions';

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: 'none',
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	}
}));

export default function Navbar(props) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		localStorage.removeItem('state');
		props.history.push('/');
	};

	function getTitle() {
		let name;
		props.routes.map(prop => {
			if(prop.layout.includes(props.profile)) {
				if (window.location.href.indexOf('/'+props.profile + prop.path) !== -1) {
					name = prop.name;
				}
			}
			return null;
		});
		return name;
	}

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);
	return(
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={ props.open ? classes.hide : classes.menuButton }
						color="inherit"
						aria-label="open drawer"
						onClick={props.handleDrawerToggle}
					>
						<MenuIcon/>
					</IconButton>
					<Typography className={ classes.title } variant="h6" noWrap>
						{getTitle()}
					</Typography>
					<div className={ classes.grow }/>
					<div className={ classes.sectionDesktop }>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={ menuId }
							aria-haspopup="true"
							onClick={ handleProfileMenuOpen }
							color="inherit"
						>
							<AccountCircle/>
						</IconButton>
					</div>
					<div className={ classes.sectionMobile }>
						<IconButton
							aria-label="show more"
							aria-controls={ mobileMenuId }
							aria-haspopup="true"
							onClick={ handleMobileMenuOpen }
							color="inherit"
						>
							<MoreIcon/>
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</>
	);
}