import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    <NavigationItem link="/Contact">Contact</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    ) : (
      <React.Fragment>
        <NavigationItem link="/Account">Account</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </React.Fragment>
    )}
  </ul>
);

export default navigationItems;
