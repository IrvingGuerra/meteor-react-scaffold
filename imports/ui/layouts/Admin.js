import React, { createRef, useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../components/Navbars/Navbar.js";
import Footer from "../components/Footer/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import routes from "../routes.js";
import styles from "../components/constants/styles/layouts/adminStyle";

const switchRoutes = (
	<Switch>
		{routes.map((prop, key) => {
			if (prop.layout === "/admin") {
				return (
					<Route
						path={prop.layout + prop.path}
						component={prop.component}
						key={key}
					/>
				);
			}
			return null;
		})}
		<Redirect from="/admin" to="/admin/dashboard" />
	</Switch>
);
const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
	const classes = useStyles();
	const mainPanel = createRef();
	const [color, setColor] = React.useState("blue");
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const getRoute = () => {
		return window.location.pathname !== "/admin/maps";
	};
	const resizeFunction = () => {
		if (window.innerWidth >= 960) {
			setMobileOpen(false);
		}
	};
	useEffect(() => {
		let ps;
		ps = new PerfectScrollbar(mainPanel.current, {
			suppressScrollX: true,
			suppressScrollY: false
		});
		document.body.style.overflow = "hidden";
		window.addEventListener("resize", resizeFunction);
		return function cleanup() {
			ps.destroy();
			window.removeEventListener("resize", resizeFunction);
		};
	}, [mainPanel]);
	return (
		<div className={classes.wrapper}>
			<Sidebar
				routes={routes}
				logoText={"ANALIZA"}
				handleDrawerToggle={handleDrawerToggle}
				open={mobileOpen}
				color={color}
				{...rest}
			/>
			<div className={classes.mainPanel} ref={mainPanel}>
				<Navbar
					routes={routes}
					handleDrawerToggle={handleDrawerToggle}
					{...rest}
				/>
				{getRoute() ? (
					<div className={classes.content}>
						<div className={classes.container}>{switchRoutes}</div>
					</div>
				) : (
					<div className={classes.map}>{switchRoutes}</div>
				)}
				{getRoute() ? <Footer /> : null}
			</div>
		</div>
	);
}
