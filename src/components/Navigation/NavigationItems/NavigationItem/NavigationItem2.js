import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.module.css";
const navigationItem2 = (props) => (
  <div className={classes.NavigationItem}>
    <div
      activeClassName={classes.active}
    >
      {props.children}
    </div>
  </div>
);

export default navigationItem2;
