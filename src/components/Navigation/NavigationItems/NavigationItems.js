import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Home
    </NavigationItem>
    <NavigationItem link="/Home">Home</NavigationItem>
    {!props.isAuthenticated ? (
      <NavigationItem link="/auth">Authentication</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
