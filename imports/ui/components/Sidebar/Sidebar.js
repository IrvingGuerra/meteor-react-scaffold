import React from "react";
import classNames from "classnames";
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.js";

import styles from "../constants/styles/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
    const classes = useStyles();
    function activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }
    const {color, logoText, routes} = props;
    const links = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                let listItemClasses;
                listItemClasses = classNames({
                    [" " + classes[color]]: activeRoute(prop.layout + prop.path)
                });
                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path)
                });
                return (
                    <NavLink
                        to={prop.layout + prop.path}
                        className={classes.item}
                        activeClassName="active"
                        key={key}
                    >
                        <ListItem button className={classes.itemLink + listItemClasses}>
                            {typeof prop.icon === "string" ? (
                                <Icon
                                    className={classNames(classes.itemIcon, whiteFontClasses)}
                                >
                                    {prop.icon}
                                </Icon>
                            ) : (
                                <prop.icon
                                    className={classNames(classes.itemIcon, whiteFontClasses)}
                                />
                            )}
                            <ListItemText
                                primary={prop.name}
                                className={classNames(classes.itemText, whiteFontClasses)}
                                disableTypography={true}
                            />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );
    const brand = (
        <div className={classes.logo}>
            <a
                href="#"
                className={classes.logoLink}
                target="_blank"
            >
                <div className={classes.logoImage}>
                    <img src="/img/reactlogo.png" alt="logo" className={classes.img}/>
                </div>
                {logoText}
            </a>
        </div>
    );
    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        <AdminNavbarLinks/>
                        {links}
                    </div>
                    <div
                        className={classes.background}
                        style={{backgroundImage: "url(/img/sidebar-1.jpg)"}}
                    />
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classNames(classes.drawerPaper)
                    }}
                >
                    {brand}
                    <div className={classes.sidebarWrapper}>{links}</div>
                    <div
                        className={classes.background}
                        style={{backgroundImage: "url(/img/sidebar-1.jpg)"}}
                    />
                </Drawer>
            </Hidden>
        </div>
    );
}