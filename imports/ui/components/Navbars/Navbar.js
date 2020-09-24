import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Button from "../CustomButtons/Button.js";

import styles from "../constants/styles/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();
  function makeBrand() {
    let name;
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = prop.name;
      }
      return null;
    });
    return name;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks history={props.history} />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}