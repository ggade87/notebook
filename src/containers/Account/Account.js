import React, { Component } from "react";
import classes from "./Account.module.css";
class Account extends Component {
  state = {};
  render() {
    return (
      <div className={classes.Account}>
        <strong>Implement below fucntionality in this page</strong> <br></br>
        <br></br> <br></br>
        1.Update account information change password.
        <br></br>
        <br></br>
        2. Change Main menu and subMenu name
        <br></br>
        <br></br>
        3. Delete Main menu and Sub menu.
        <br></br>
        <br></br>
        4. Edit any content or delete content of any specific menu. <br></br>
        <br></br>
      </div>
    );
  }
}

export default Account;
